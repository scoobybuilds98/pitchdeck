/* ============================================
   BUSINESS PROJECTIONS PLATFORM - CALCULATOR
   Financial Calculation Engine
   ============================================ */

const Calculator = {
    /**
     * Calculate transport equipment revenue
     * @param {Object} fleet - Fleet data by type and year
     * @param {Object} revenueSplit - Revenue split percentages
     * @param {string} scenario - Scenario name
     * @returns {Object} Revenue calculations
     */
    calculateTransportRevenue(fleet, revenueSplit, scenario = 'moderate') {
        const results = {
            byYear: {},
            byType: {},
            total: 0
        };

        CONFIG.years.forEach(year => {
            const yearFleet = fleet[year] || {};
            let yearRevenue = 0;
            const yearBreakdown = {};

            Object.keys(CONFIG.transport.types).forEach(type => {
                const units = yearFleet[type] || 0;
                const equipment = CONFIG.transport.types[type];
                const utilization = equipment.utilization[scenario];

                // Calculate revenue for each stream
                const monthlyRental = equipment.rentalRate * units * utilization * (revenueSplit.rental / 100);
                const annualRental = monthlyRental * 12;

                // Lease revenue (annualized)
                const leaseRevenue = equipment.purchasePrice * units * 0.02 * (revenueSplit.lease / 100); // 2% of purchase price per month
                const annualLease = leaseRevenue * 12;

                // Sale revenue (assume 10% of fleet sold per year)
                const saleRevenue = equipment.purchasePrice * units * 0.10 * (revenueSplit.sale / 100);

                const totalRevenue = annualRental + annualLease + saleRevenue;

                yearBreakdown[type] = {
                    units,
                    utilization,
                    rental: annualRental,
                    lease: annualLease,
                    sale: saleRevenue,
                    total: totalRevenue
                };

                yearRevenue += totalRevenue;

                // Aggregate by type
                if (!results.byType[type]) {
                    results.byType[type] = 0;
                }
                results.byType[type] += totalRevenue;
            });

            results.byYear[year] = {
                total: yearRevenue,
                breakdown: yearBreakdown
            };

            results.total += yearRevenue;
        });

        return results;
    },

    /**
     * Calculate construction equipment revenue
     * @param {Object} fleet - Fleet data by brand, type, and year
     * @param {Object} revenueSplit - Revenue split percentages
     * @param {string} scenario - Scenario name
     * @returns {Object} Revenue calculations
     */
    calculateConstructionRevenue(fleet, revenueSplit, scenario = 'moderate') {
        const results = {
            byYear: {},
            byBrand: {},
            byType: {},
            total: 0
        };

        CONFIG.years.forEach(year => {
            const yearFleet = fleet[year] || {};
            let yearRevenue = 0;
            const yearBreakdown = {};

            // Process each brand
            ['sdlg', 'chl', 'xcmg'].forEach(brand => {
                const brandFleet = yearFleet[brand] || {};
                const brandConfig = CONFIG.construction[brand];
                yearBreakdown[brand] = {};

                if (!results.byBrand[brand]) {
                    results.byBrand[brand] = 0;
                }

                Object.keys(brandConfig).forEach(type => {
                    const units = brandFleet[type] || 0;
                    const equipment = brandConfig[type];
                    const utilization = equipment.utilization[scenario];

                    // Calculate revenue streams
                    const monthlyRental = equipment.rentalRate * units * utilization * (revenueSplit.rental / 100);
                    const annualRental = monthlyRental * 12;

                    // Lease revenue (2% of purchase price per month)
                    const leaseRevenue = equipment.purchasePrice * units * 0.02 * (revenueSplit.lease / 100);
                    const annualLease = leaseRevenue * 12;

                    // Sale revenue (assume 8% of construction fleet sold per year)
                    const saleRevenue = equipment.purchasePrice * units * 0.08 * (revenueSplit.sale / 100);

                    const totalRevenue = annualRental + annualLease + saleRevenue;

                    yearBreakdown[brand][type] = {
                        units,
                        utilization,
                        rental: annualRental,
                        lease: annualLease,
                        sale: saleRevenue,
                        total: totalRevenue
                    };

                    yearRevenue += totalRevenue;
                    results.byBrand[brand] += totalRevenue;

                    // Aggregate by equipment type
                    const typeKey = `${brand}_${type}`;
                    if (!results.byType[typeKey]) {
                        results.byType[typeKey] = 0;
                    }
                    results.byType[typeKey] += totalRevenue;
                });
            });

            results.byYear[year] = {
                total: yearRevenue,
                breakdown: yearBreakdown
            };

            results.total += yearRevenue;
        });

        return results;
    },

    /**
     * Calculate operating expenses
     * @param {number} revenue - Total revenue
     * @param {string} division - Division name (transport or construction)
     * @param {Object} customCosts - Custom cost overrides
     * @returns {Object} Operating expense breakdown
     */
    calculateOperatingExpenses(revenue, division = 'transport', customCosts = {}) {
        const costs = { ...CONFIG[division].costs, ...customCosts };

        return {
            maintenance: revenue * costs.maintenance,
            insurance: revenue * costs.insurance,
            storage: revenue * costs.storage,
            administrative: revenue * costs.administrative,
            total: revenue * (costs.maintenance + costs.insurance + costs.storage + costs.administrative)
        };
    },

    /**
     * Calculate EBITDA
     * @param {number} revenue - Total revenue
     * @param {number} operatingExpenses - Total operating expenses
     * @returns {Object} EBITDA calculations
     */
    calculateEBITDA(revenue, operatingExpenses) {
        const ebitda = revenue - operatingExpenses;
        const margin = revenue > 0 ? (ebitda / revenue) : 0;

        return {
            value: ebitda,
            margin: margin,
            marginPercent: margin * 100
        };
    },

    /**
     * Calculate depreciation
     * @param {Object} fleet - Fleet data
     * @param {string} division - Division name
     * @returns {Object} Depreciation by year
     */
    calculateDepreciation(fleet, division = 'transport') {
        const results = {
            byYear: {},
            total: 0
        };

        CONFIG.years.forEach(year => {
            let yearDepreciation = 0;

            if (division === 'transport') {
                const yearFleet = fleet[year] || {};
                Object.keys(CONFIG.transport.types).forEach(type => {
                    const units = yearFleet[type] || 0;
                    const equipment = CONFIG.transport.types[type];
                    const annualDepreciation = equipment.purchasePrice * units * equipment.depreciationRate;
                    yearDepreciation += annualDepreciation;
                });
            } else if (division === 'construction') {
                const yearFleet = fleet[year] || {};
                ['sdlg', 'chl', 'xcmg'].forEach(brand => {
                    const brandFleet = yearFleet[brand] || {};
                    const brandConfig = CONFIG.construction[brand];
                    Object.keys(brandConfig).forEach(type => {
                        const units = brandFleet[type] || 0;
                        const equipment = brandConfig[type];
                        const annualDepreciation = equipment.purchasePrice * units * equipment.depreciationRate;
                        yearDepreciation += annualDepreciation;
                    });
                });
            }

            results.byYear[year] = yearDepreciation;
            results.total += yearDepreciation;
        });

        return results;
    },

    /**
     * Calculate capital requirements
     * @param {Object} fleet - Fleet data
     * @param {string} division - Division name
     * @returns {Object} Capital requirements by year
     */
    calculateCapitalRequirements(fleet, division = 'transport') {
        const results = {
            byYear: {},
            total: 0
        };

        CONFIG.years.forEach((year, index) => {
            let yearCapital = 0;
            const yearFleet = fleet[year] || {};
            const prevYearFleet = index > 0 ? fleet[CONFIG.years[index - 1]] || {} : {};

            if (division === 'transport') {
                Object.keys(CONFIG.transport.types).forEach(type => {
                    const currentUnits = yearFleet[type] || 0;
                    const prevUnits = prevYearFleet[type] || 0;
                    const newUnits = Math.max(0, currentUnits - prevUnits);
                    const equipment = CONFIG.transport.types[type];
                    yearCapital += newUnits * equipment.purchasePrice;
                });
            } else if (division === 'construction') {
                ['sdlg', 'chl', 'xcmg'].forEach(brand => {
                    const currentBrandFleet = yearFleet[brand] || {};
                    const prevBrandFleet = prevYearFleet[brand] || {};
                    const brandConfig = CONFIG.construction[brand];

                    Object.keys(brandConfig).forEach(type => {
                        const currentUnits = currentBrandFleet[type] || 0;
                        const prevUnits = prevBrandFleet[type] || 0;
                        const newUnits = Math.max(0, currentUnits - prevUnits);
                        const equipment = brandConfig[type];
                        yearCapital += newUnits * equipment.purchasePrice;
                    });
                });
            }

            results.byYear[year] = yearCapital;
            results.total += yearCapital;
        });

        return results;
    },

    /**
     * Calculate free cash flow
     * @param {Object} params - Calculation parameters
     * @returns {Object} Free cash flow by year
     */
    calculateFreeCashFlow(params) {
        const { ebitda, depreciation, taxRate, capitalExpenditures, workingCapitalChange } = params;
        const results = {
            byYear: {},
            total: 0
        };

        CONFIG.years.forEach(year => {
            const yearEBITDA = ebitda.byYear[year] || 0;
            const yearDepreciation = depreciation.byYear[year] || 0;
            const yearEBIT = yearEBITDA - yearDepreciation;
            const taxes = yearEBIT * (taxRate || CONFIG.financial.taxRate);
            const nopat = yearEBIT - taxes; // Net operating profit after tax

            const yearCapEx = capitalExpenditures.byYear[year] || 0;
            const yearWCChange = workingCapitalChange ? (workingCapitalChange.byYear[year] || 0) : 0;

            const fcf = nopat + yearDepreciation - yearCapEx - yearWCChange;

            results.byYear[year] = {
                ebitda: yearEBITDA,
                depreciation: yearDepreciation,
                ebit: yearEBIT,
                taxes: taxes,
                nopat: nopat,
                capex: yearCapEx,
                workingCapitalChange: yearWCChange,
                fcf: fcf
            };

            results.total += fcf;
        });

        return results;
    },

    /**
     * Calculate valuation metrics
     * @param {Object} projections - Complete financial projections
     * @returns {Object} Valuation metrics
     */
    calculateValuation(projections) {
        const years = CONFIG.years;
        const finalYearEBITDA = projections.ebitda.byYear[years[years.length - 1]]?.value || 0;

        // Calculate terminal value using multiple approach
        const ebitdaMultiple = 8; // Industry standard multiple
        const terminalValue = finalYearEBITDA * ebitdaMultiple;

        // Calculate NPV of cash flows
        const cashFlows = years.map(year => projections.fcf.byYear[year]?.fcf || 0);
        cashFlows.push(terminalValue); // Add terminal value

        const npv = Utils.calculateNPV(cashFlows, CONFIG.financial.discountRate);

        // Calculate IRR
        const irr = Utils.calculateIRR([
            -(projections.capitalRequirements.byYear[years[0]] || 0), // Initial investment
            ...cashFlows
        ]);

        return {
            terminalValue,
            npv,
            irr,
            ebitdaMultiple
        };
    },

    /**
     * Calculate combined projections for Mainland + Northland
     * @param {Object} transportFleet - Transport fleet data
     * @param {Object} constructionFleet - Construction fleet data
     * @param {Object} transportSplit - Transport revenue split
     * @param {Object} constructionSplit - Construction revenue split
     * @param {string} scenario - Scenario name
     * @returns {Object} Combined projections
     */
    calculateCombinedProjections(transportFleet, constructionFleet, transportSplit, constructionSplit, scenario = 'moderate') {
        // Calculate transport division
        const transportRevenue = this.calculateTransportRevenue(transportFleet, transportSplit, scenario);
        const transportDepreciation = this.calculateDepreciation(transportFleet, 'transport');
        const transportCapital = this.calculateCapitalRequirements(transportFleet, 'transport');

        // Calculate construction division
        const constructionRevenue = this.calculateConstructionRevenue(constructionFleet, constructionSplit, scenario);
        const constructionDepreciation = this.calculateDepreciation(constructionFleet, 'construction');
        const constructionCapital = this.calculateCapitalRequirements(constructionFleet, 'construction');

        // Combine results by year
        const combined = {
            revenue: { byYear: {}, total: 0 },
            opex: { byYear: {}, total: 0 },
            ebitda: { byYear: {} },
            depreciation: { byYear: {}, total: 0 },
            capitalRequirements: { byYear: {}, total: 0 },
            fcf: { byYear: {}, total: 0 }
        };

        CONFIG.years.forEach(year => {
            // Revenue
            const transportYearRevenue = transportRevenue.byYear[year]?.total || 0;
            const constructionYearRevenue = constructionRevenue.byYear[year]?.total || 0;
            combined.revenue.byYear[year] = {
                transport: transportYearRevenue,
                construction: constructionYearRevenue,
                total: transportYearRevenue + constructionYearRevenue
            };
            combined.revenue.total += transportYearRevenue + constructionYearRevenue;

            // Operating Expenses
            const transportOpex = this.calculateOperatingExpenses(transportYearRevenue, 'transport');
            const constructionOpex = this.calculateOperatingExpenses(constructionYearRevenue, 'construction');
            combined.opex.byYear[year] = {
                transport: transportOpex.total,
                construction: constructionOpex.total,
                total: transportOpex.total + constructionOpex.total,
                breakdown: {
                    transport: transportOpex,
                    construction: constructionOpex
                }
            };
            combined.opex.total += transportOpex.total + constructionOpex.total;

            // EBITDA
            const totalRevenue = combined.revenue.byYear[year].total;
            const totalOpex = combined.opex.byYear[year].total;
            combined.ebitda.byYear[year] = this.calculateEBITDA(totalRevenue, totalOpex);

            // Depreciation
            const yearDepreciation = (transportDepreciation.byYear[year] || 0) + (constructionDepreciation.byYear[year] || 0);
            combined.depreciation.byYear[year] = yearDepreciation;
            combined.depreciation.total += yearDepreciation;

            // Capital Requirements
            const yearCapital = (transportCapital.byYear[year] || 0) + (constructionCapital.byYear[year] || 0);
            combined.capitalRequirements.byYear[year] = yearCapital;
            combined.capitalRequirements.total += yearCapital;
        });

        // Calculate FCF
        combined.fcf = this.calculateFreeCashFlow({
            ebitda: combined.ebitda,
            depreciation: combined.depreciation,
            taxRate: CONFIG.financial.taxRate,
            capitalExpenditures: combined.capitalRequirements
        });

        // Calculate valuation
        combined.valuation = this.calculateValuation(combined);

        // Store division details
        combined.divisions = {
            transport: {
                revenue: transportRevenue,
                depreciation: transportDepreciation,
                capital: transportCapital
            },
            construction: {
                revenue: constructionRevenue,
                depreciation: constructionDepreciation,
                capital: constructionCapital
            }
        };

        return combined;
    },

    /**
     * Calculate finance business projections
     * @param {Object} portfolio - Portfolio data
     * @param {string} scenario - Scenario name
     * @returns {Object} Finance projections
     */
    calculateFinanceProjections(portfolio, scenario = 'moderate') {
        const results = {
            byYear: {},
            total: { revenue: 0, profit: 0 }
        };

        CONFIG.years.forEach(year => {
            const yearPortfolio = portfolio[year] || {};
            let yearRevenue = 0;
            let yearCosts = 0;

            Object.keys(CONFIG.finance.products).forEach(product => {
                const loanCount = yearPortfolio[product] || 0;
                const productConfig = CONFIG.finance.products[product];
                const avgLoanSize = 200000; // Average loan size

                // Calculate interest revenue
                const totalPrincipal = loanCount * avgLoanSize;
                const annualInterest = totalPrincipal * productConfig.defaultRate;
                yearRevenue += annualInterest;

                // Calculate costs
                yearCosts += totalPrincipal * CONFIG.finance.costs.fundingCost;
                yearCosts += totalPrincipal * CONFIG.finance.costs.lossProvision;
            });

            // Add administrative and compliance costs
            const adminCosts = yearRevenue * (CONFIG.finance.costs.administrative + CONFIG.finance.costs.compliance);
            yearCosts += adminCosts;

            const yearProfit = yearRevenue - yearCosts;

            results.byYear[year] = {
                revenue: yearRevenue,
                costs: yearCosts,
                profit: yearProfit,
                margin: yearRevenue > 0 ? yearProfit / yearRevenue : 0
            };

            results.total.revenue += yearRevenue;
            results.total.profit += yearProfit;
        });

        return results;
    }
};

// Make Calculator globally available
window.Calculator = Calculator;
