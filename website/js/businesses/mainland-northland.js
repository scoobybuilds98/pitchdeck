/* ============================================
   MAINLAND TRUCK & TRAILER + NORTHLAND EQUIPMENT
   Institutional Investment Platform
   Enterprise-Grade Financial Projections & Analysis
   ============================================ */

const MainlandNorthland = {
    // Application State
    state: {
        transportFleet: Utils.deepClone(CONFIG.transport.defaultFleet),
        constructionFleet: Utils.deepClone(CONFIG.construction.defaultFleet),
        transportSplit: Utils.deepClone(CONFIG.transport.defaultRevenueSplit),
        constructionSplit: Utils.deepClone(CONFIG.construction.defaultRevenueSplit),
        scenario: 'moderate',
        projections: null,
        isCalculating: false
    },

    /**
     * Main render function - Creates comprehensive institutional dashboard
     * @param {HTMLElement} container - Container element
     */
    render(container) {
        // Calculate initial projections
        this.calculateProjections();

        // Build comprehensive institutional dashboard
        const dashboardHTML = this.buildExecutiveDashboard();
        container.innerHTML = dashboardHTML;

        // Initialize all interactive components
        this.initializeComponents();

        // Render initial charts
        this.updateAllCharts();
    },

    /**
     * Build Executive Dashboard with comprehensive analysis
     * @returns {string} Complete HTML for institutional dashboard
     */
    buildExecutiveDashboard() {
        return `
            <div class="container">
                <!-- Executive Summary -->
                ${this.buildExecutiveSummary()}

                <!-- Market Analysis & Opportunity -->
                ${this.buildMarketAnalysis()}

                <!-- Strategic Business Model -->
                ${this.buildBusinessModel()}

                <!-- Scenario Configuration -->
                ${this.buildScenarioSelector()}

                <!-- Key Performance Indicators -->
                ${this.buildKPIDashboard()}

                <!-- Financial Projections & Charts -->
                ${this.buildFinancialProjections()}

                <!-- Division Deep-Dive Analysis -->
                ${this.buildDivisionAnalysis()}

                <!-- Interactive Fleet Planning -->
                ${this.buildFleetPlanning()}

                <!-- Risk Assessment -->
                ${this.buildRiskAssessment()}

                <!-- Data Export & Actions -->
                ${this.buildExportSection()}
            </div>
        `;
    },

    /**
     * Executive Summary Section
     */
    buildExecutiveSummary() {
        const proj = this.state.projections;
        const totalRevenue6Y = proj ? proj.revenue.total : 0;
        const avgEBITDA = proj ? Utils.average(CONFIG.years.map(y => proj.ebitda.byYear[y].marginPercent)) : 0;

        return `
            <section class="executive-summary" style="margin: var(--space-16) 0 var(--space-12);">
                <div class="card-accent" style="padding: var(--space-8); border-radius: var(--radius-xl);">
                    <h1 style="font-size: var(--text-5xl); font-weight: var(--weight-bold); color: var(--color-white); margin-bottom: var(--space-4); letter-spacing: -0.03em;">
                        Mainland Truck & Trailer + Northland Equipment
                    </h1>
                    <p class="lead-text" style="color: rgba(255, 255, 255, 0.9); font-size: var(--text-lg); line-height: 1.8; margin-bottom: var(--space-6);">
                        Integrated Equipment Rental & Dealership Platform
                    </p>

                    <div class="grid grid-4" style="gap: var(--space-6); margin-top: var(--space-8);">
                        <div>
                            <div style="font-size: var(--text-xs); color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">6-Year Revenue</div>
                            <div style="font-size: var(--text-4xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-gold);">
                                ${Utils.formatCurrency(totalRevenue6Y, true)}
                            </div>
                        </div>
                        <div>
                            <div style="font-size: var(--text-xs); color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">Avg EBITDA Margin</div>
                            <div style="font-size: var(--text-4xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-gold);">
                                ${avgEBITDA.toFixed(1)}%
                            </div>
                        </div>
                        <div>
                            <div style="font-size: var(--text-xs); color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">Market TAM</div>
                            <div style="font-size: var(--text-4xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-gold);">
                                $6.3B
                            </div>
                        </div>
                        <div>
                            <div style="font-size: var(--text-xs); color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">IRR</div>
                            <div style="font-size: var(--text-4xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-gold);">
                                ${proj ? Utils.formatPercent(proj.valuation.irr, 1) : '0%'}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Market Analysis Section with TAM, growth drivers, competitive landscape
     */
    buildMarketAnalysis() {
        return `
            <section class="market-analysis" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-3); color: var(--color-gray-900);">
                    Market Analysis & Strategic Opportunity
                </h2>
                <p class="lead-text" style="margin-bottom: var(--space-8); max-width: 900px;">
                    We operate in a $6.3 billion combined Canadian market for transport and construction equipment rental,
                    characterized by strong fundamentals, fragmented competition, and secular tailwinds from infrastructure investment.
                </p>

                <div class="grid grid-2" style="gap: var(--space-6);">
                    <!-- Transport Equipment Market -->
                    <div class="card card-transport">
                        <div class="card-header">
                            <div>
                                <h3 class="card-title">Transport Equipment Market</h3>
                                <p class="card-subtitle">$2.8B Canadian Market</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="line-height: 1.7; color: var(--color-gray-700); margin-bottom: var(--space-4);">
                                The Canadian transport equipment rental market represents a $2.8 billion opportunity, driven by the fundamental
                                economics of asset-light operations in logistics. With e-commerce growth averaging 15% annually and cross-border
                                freight volumes expanding, fleet operators increasingly prefer rental over ownership to maintain operational flexibility
                                and preserve capital for core business activities.
                            </p>
                            <div class="grid grid-2" style="gap: var(--space-4); margin-top: var(--space-5);">
                                <div>
                                    <div style="font-size: var(--text-xs); color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">Market Size</div>
                                    <div style="font-size: var(--text-2xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-transport);">
                                        $2.8B CAD
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: var(--text-xs); color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">CAGR 2024-2030</div>
                                    <div style="font-size: var(--text-2xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-success);">
                                        3.5%
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: var(--space-5); padding: var(--space-4); background: rgba(3, 105, 161, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--color-transport);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-transport); margin-bottom: var(--space-2);">
                                    Key Growth Drivers
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); color: var(--color-gray-700); font-size: var(--text-sm); line-height: 1.7;">
                                    <li>E-commerce logistics demand (+15% YoY)</li>
                                    <li>Cross-border freight volume expansion</li>
                                    <li>Fleet operator shift to asset-light models</li>
                                    <li>Regulatory compliance driving fleet upgrades</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Construction Equipment Market -->
                    <div class="card card-construction">
                        <div class="card-header">
                            <div>
                                <h3 class="card-title">Construction Equipment Market</h3>
                                <p class="card-subtitle">$3.5B Canadian Market</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="line-height: 1.7; color: var(--color-gray-700); margin-bottom: var(--space-4);">
                                Canada's construction equipment market totals $3.5 billion (converted from ~$2.6B USD), benefiting from
                                unprecedented infrastructure spending commitments. Federal and provincial governments have allocated over
                                $180 billion for infrastructure through 2033, creating sustained demand for excavators, loaders, dozers,
                                and specialized equipment. Our official dealership status with SDLG, CHL, and XCMG provides exclusive access
                                to cost-competitive equipment with strong margin profiles.
                            </p>
                            <div class="grid grid-2" style="gap: var(--space-4); margin-top: var(--space-5);">
                                <div>
                                    <div style="font-size: var(--text-xs); color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">Market Size</div>
                                    <div style="font-size: var(--text-2xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-construction);">
                                        $3.5B CAD
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: var(--text-xs); color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">CAGR 2024-2030</div>
                                    <div style="font-size: var(--text-2xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-success);">
                                        4.2%
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: var(--space-5); padding: var(--space-4); background: rgba(217, 119, 6, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--color-construction);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-construction); margin-bottom: var(--space-2);">
                                    Competitive Advantages
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); color: var(--color-gray-700); font-size: var(--text-sm); line-height: 1.7;">
                                    <li>Official SDLG, CHL, XCMG dealer (exclusive territories)</li>
                                    <li>Infrastructure super-cycle ($180B+ committed)</li>
                                    <li>30-40% cost advantage vs. premium brands</li>
                                    <li>Tri-revenue model (rental + lease + sales)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Strategic Business Model Section
     */
    buildBusinessModel() {
        return `
            <section class="business-model" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-3); color: var(--color-gray-900);">
                    Strategic Business Model
                </h2>
                <p class="lead-text" style="margin-bottom: var(--space-8); max-width: 900px;">
                    Our integrated dual-division platform creates multiple value creation levers through equipment ownership,
                    rental income, lease financing, and strategic asset disposition across complementary market segments.
                </p>

                <div class="grid grid-2" style="gap: var(--space-6);">
                    <!-- Revenue Model -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Diversified Revenue Streams</h3>
                        </div>
                        <div class="card-body">
                            <p style="line-height: 1.7; color: var(--color-gray-700); margin-bottom: var(--space-5);">
                                Unlike single-revenue-stream competitors, we capture value at multiple points in the equipment lifecycle.
                                Our tri-revenue model generates recurring rental income (70% of revenue), structured lease payments (20%),
                                and strategic asset sales (10%), optimizing for both cash flow stability and capital efficiency.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md); margin-top: var(--space-4);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); margin-bottom: var(--space-3);">Revenue Mix Strategy</h4>
                                <div style="margin-bottom: var(--space-3);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-1);">
                                        <span style="font-size: var(--text-sm); color: var(--color-gray-700);">Equipment Rental</span>
                                        <span style="font-size: var(--text-sm); font-family: var(--font-mono); font-weight: var(--weight-semibold);">70%</span>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar" style="width: 70%;"></div>
                                    </div>
                                </div>
                                <div style="margin-bottom: var(--space-3);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-1);">
                                        <span style="font-size: var(--text-sm); color: var(--color-gray-700);">Lease Financing</span>
                                        <span style="font-size: var(--text-sm); font-family: var(--font-mono); font-weight: var(--weight-semibold);">20%</span>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar" style="width: 20%;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-1);">
                                        <span style="font-size: var(--text-sm); color: var(--color-gray-700);">Asset Sales</span>
                                        <span style="font-size: var(--text-sm); font-family: var(--font-mono); font-weight: var(--weight-semibold);">10%</span>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar" style="width: 10%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Competitive Positioning -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Competitive Moat</h3>
                        </div>
                        <div class="card-body">
                            <p style="line-height: 1.7; color: var(--color-gray-700); margin-bottom: var(--space-5);">
                                We operate in a fragmented $6.3B market dominated by 350+ regional players, none with more than 5% market share.
                                Our scale advantages in procurement, maintenance, and customer relationships create defensible unit economics
                                that smaller competitors cannot replicate.
                            </p>
                            <div style="margin-top: var(--space-4);">
                                <div style="padding: var(--space-3); background: rgba(13, 122, 95, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--color-success); margin-bottom: var(--space-3);">
                                    <div style="font-weight: var(--weight-semibold); color: var(--color-success); font-size: var(--text-sm); margin-bottom: var(--space-1);">Scale Procurement</div>
                                    <div style="font-size: var(--text-sm); color: var(--color-gray-700);">15-20% cost advantage through volume discounts</div>
                                </div>
                                <div style="padding: var(--space-3); background: rgba(13, 122, 95, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--color-success); margin-bottom: var(--space-3);">
                                    <div style="font-weight: var(--weight-semibold); color: var(--color-success); font-size: var(--text-sm); margin-bottom: var(--space-1);">Exclusive Dealer Status</div>
                                    <div style="font-size: var(--text-sm); color: var(--color-gray-700);">SDLG, CHL, XCMG official partnerships</div>
                                </div>
                                <div style="padding: var(--space-3); background: rgba(13, 122, 95, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--color-success);">
                                    <div style="font-weight: var(--weight-semibold); color: var(--color-success); font-size: var(--text-sm); margin-bottom: var(--space-1);">Integrated Service Network</div>
                                    <div style="font-size: var(--text-sm); color: var(--color-gray-700);">Full-service maintenance reduces customer churn</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Scenario Selector Component
     */
    buildScenarioSelector() {
        return `
            <section id="scenario-selector" class="scenario-section" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-3); color: var(--color-gray-900);">
                    Projection Scenarios
                </h2>
                <p class="lead-text" style="margin-bottom: var(--space-6); max-width: 900px;">
                    Select your growth scenario to model different market conditions and capital deployment strategies.
                    All projections update in real-time as you adjust assumptions.
                </p>
                <div id="scenario-controls"></div>
            </section>
        `;
    },

    /**
     * KPI Dashboard with key metrics
     */
    buildKPIDashboard() {
        const proj = this.state.projections;
        if (!proj) return '';

        const totalRevenue = proj.revenue.total;
        const avgMargin = Utils.average(CONFIG.years.map(y => proj.ebitda.byYear[y].marginPercent));
        const totalCapital = proj.capitalRequirements.total;
        const npv = proj.valuation.npv;
        const irr = proj.valuation.irr;
        const totalFCF = proj.fcf.total;

        return `
            <section class="kpi-dashboard" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-6); color: var(--color-gray-900);">
                    Key Performance Indicators
                </h2>

                <div class="grid grid-3" style="gap: var(--space-6); margin-bottom: var(--space-8);">
                    <div class="card card-elevated">
                        <div class="metric">
                            <div class="metric-label">Total Revenue (2025-2030)</div>
                            <div class="metric-value" id="total-revenue">${Utils.formatCurrency(totalRevenue, true)}</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.6;">
                                Combined revenue across transport and construction divisions over 6-year projection period.
                            </p>
                        </div>
                    </div>

                    <div class="card card-elevated">
                        <div class="metric">
                            <div class="metric-label">Average EBITDA Margin</div>
                            <div class="metric-value" id="avg-ebitda-margin">${avgMargin.toFixed(1)}%</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.6;">
                                Operating margin demonstrates strong unit economics and pricing power.
                            </p>
                        </div>
                    </div>

                    <div class="card card-elevated">
                        <div class="metric">
                            <div class="metric-label">Total Capital Required</div>
                            <div class="metric-value" id="total-capital">${Utils.formatCurrency(totalCapital, true)}</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.6;">
                                Fleet expansion investment across both business divisions.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="grid grid-3" style="gap: var(--space-6);">
                    <div class="card card-success">
                        <div class="metric">
                            <div class="metric-label">Net Present Value</div>
                            <div class="metric-value" id="npv-value">${Utils.formatCurrency(npv, true)}</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.6;">
                                Discounted at 12% WACC, reflecting strong value creation potential.
                            </p>
                        </div>
                    </div>

                    <div class="card card-success">
                        <div class="metric">
                            <div class="metric-label">Internal Rate of Return</div>
                            <div class="metric-value" id="irr-value">${Utils.formatPercent(irr, 1)}</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.6;">
                                Exceeds target hurdle rate, demonstrating attractive risk-adjusted returns.
                            </p>
                        </div>
                    </div>

                    <div class="card card-success">
                        <div class="metric">
                            <div class="metric-label">Cumulative Free Cash Flow</div>
                            <div class="metric-value" id="total-fcf">${Utils.formatCurrency(totalFCF, true)}</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.6;">
                                After capital expenditures, funding sustainable growth and returns.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Financial Projections with Charts
     */
    buildFinancialProjections() {
        return `
            <section class="financial-projections" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-3); color: var(--color-gray-900);">
                    Financial Projections & Analytics
                </h2>
                <p class="lead-text" style="margin-bottom: var(--space-8); max-width: 900px;">
                    Comprehensive 6-year financial model incorporating fleet growth, utilization dynamics, revenue mix optimization,
                    and margin expansion through operational leverage.
                </p>

                <div class="charts-grid">
                    <!-- Revenue Projection -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Combined Revenue Projection</h3>
                                <p class="chart-subtitle">Transport + Construction Equipment (2025-2030)</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            Revenue growth driven by fleet expansion, improved utilization rates, and pricing power in tight supply markets.
                            Conservative scenario assumes 85-90% utilization; aggressive scenario models 95-100% with premium pricing.
                        </p>
                        <div class="chart-wrapper">
                            <canvas id="revenue-chart"></canvas>
                        </div>
                    </div>

                    <!-- Division Comparison -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Revenue by Division</h3>
                                <p class="chart-subtitle">Transport vs Construction Equipment</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            Dual-division strategy provides natural diversification across economic cycles. Transport equipment (steady logistics demand)
                            balances construction equipment (cyclical infrastructure spend), creating portfolio resilience.
                        </p>
                        <div class="chart-wrapper">
                            <canvas id="division-chart"></canvas>
                        </div>
                    </div>

                    <!-- EBITDA Analysis -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">EBITDA & Margin Analysis</h3>
                                <p class="chart-subtitle">Profitability Trajectory</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            Margin expansion from 32% to 38% driven by operating leverage, procurement scale, and value-added services.
                            Maintenance, insurance, and administrative costs decline as percentage of revenue with scale.
                        </p>
                        <div class="chart-wrapper">
                            <canvas id="ebitda-chart"></canvas>
                        </div>
                    </div>

                    <!-- Free Cash Flow -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Free Cash Flow Generation</h3>
                                <p class="chart-subtitle">Cash Available for Distribution</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            Strong cash generation after maintenance capex and fleet expansion. Peak investment years (2025-2026) transition
                            to harvest mode (2028-2030) as fleet matures and generates stable rental income.
                        </p>
                        <div class="chart-wrapper">
                            <canvas id="fcf-chart"></canvas>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Division Deep-Dive Analysis
     */
    buildDivisionAnalysis() {
        return `
            <section class="division-analysis" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-3); color: var(--color-gray-900);">
                    Division Deep-Dive Analysis
                </h2>
                <p class="lead-text" style="margin-bottom: var(--space-8); max-width: 900px;">
                    Detailed equipment-level analysis showing fleet composition, utilization dynamics, and revenue contribution by asset class.
                </p>

                <div class="charts-grid">
                    <!-- Transport Fleet Composition -->
                    <div class="chart-card chart-transport">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Transport Fleet Composition</h3>
                                <p class="chart-subtitle">2025 Starting Fleet Mix</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            Dry vans represent 52% of transport fleet, reflecting strong demand in general freight. Reefer trailers (17%)
                            command premium rates but require higher maintenance. Portfolio optimized for return-adjusted utilization.
                        </p>
                        <div class="chart-wrapper chart-md">
                            <canvas id="transport-fleet-chart"></canvas>
                        </div>
                    </div>

                    <!-- Construction Fleet Composition -->
                    <div class="chart-card chart-construction">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Construction Fleet Composition</h3>
                                <p class="chart-subtitle">2025 Starting Fleet by Brand</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            Multi-brand strategy across SDLG (excavators, loaders, dozers), CHL (loaders, backhoes), and XCMG (cranes, road equipment)
                            provides comprehensive coverage of construction segments while maintaining competitive procurement costs.
                        </p>
                        <div class="chart-wrapper chart-md">
                            <canvas id="construction-fleet-chart"></canvas>
                        </div>
                    </div>

                    <!-- Brand Revenue Analysis -->
                    <div class="chart-card chart-construction">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Construction Revenue by Brand</h3>
                                <p class="chart-subtitle">SDLG, CHL, XCMG Performance</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            XCMG cranes generate highest per-unit revenue ($30k/month rental) but lower utilization (75-85%).
                            SDLG excavators and loaders provide balance with consistent 80-90% utilization at $8-15k/month rates.
                        </p>
                        <div class="chart-wrapper">
                            <canvas id="brand-revenue-chart"></canvas>
                        </div>
                    </div>

                    <!-- Capital Requirements -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Annual Capital Requirements</h3>
                                <p class="chart-subtitle">Fleet Expansion Investment</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            Peak capital deployment in 2026-2027 ($85-95M) funds fleet expansion to optimal scale. Subsequent years
                            require only replacement capex, improving cash conversion and enabling distributions.
                        </p>
                        <div class="chart-wrapper">
                            <canvas id="capital-chart"></canvas>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Interactive Fleet Planning Section
     */
    buildFleetPlanning() {
        return `
            <section class="fleet-planning" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-3); color: var(--color-gray-900);">
                    Interactive Fleet Planning
                </h2>
                <p class="lead-text" style="margin-bottom: var(--space-8); max-width: 900px;">
                    Customize fleet size and revenue mix assumptions to model your preferred growth strategy.
                    All financial projections update instantly as you adjust parameters.
                </p>

                <div class="grid grid-2" style="gap: var(--space-6);">
                    <!-- Transport Fleet Configuration -->
                    <div class="card card-transport">
                        <div class="card-header">
                            <div>
                                <h3 class="card-title">Transport Equipment Fleet</h3>
                                <p class="card-subtitle">Annual fleet size by equipment type</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-600); margin-bottom: var(--space-5); line-height: 1.6;">
                                Configure your transport fleet expansion strategy. Adjust unit counts by year and equipment type
                                to model different growth trajectories and capital deployment scenarios.
                            </p>
                            <div id="transport-fleet-inputs"></div>
                        </div>
                    </div>

                    <!-- Construction Fleet Configuration -->
                    <div class="card card-construction">
                        <div class="card-header">
                            <div>
                                <h3 class="card-title">Construction Equipment Fleet</h3>
                                <p class="card-subtitle">Annual fleet size by brand and type</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-600); margin-bottom: var(--space-5); line-height: 1.6;">
                                Set construction equipment targets across SDLG, CHL, and XCMG brands. Balance high-revenue
                                cranes with steady-utilization excavators and loaders.
                            </p>
                            <div id="construction-fleet-inputs"></div>
                        </div>
                    </div>
                </div>

                <!-- Revenue Split Controls -->
                <div class="card" style="margin-top: var(--space-6);">
                    <div class="card-header">
                        <h3 class="card-title">Revenue Mix Strategy</h3>
                        <p class="card-subtitle">Adjust rental, lease, and sales distribution</p>
                    </div>
                    <div class="card-body">
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); margin-bottom: var(--space-6); line-height: 1.6;">
                            Optimize revenue mix between recurring rental income (highest margin), lease financing (steady cash flow),
                            and strategic asset sales (capital recycling). Changes update all projections in real-time.
                        </p>
                        <div class="grid grid-2" style="gap: var(--space-8);">
                            <div id="transport-split-inputs"></div>
                            <div id="construction-split-inputs"></div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Risk Assessment Section
     */
    buildRiskAssessment() {
        return `
            <section class="risk-assessment" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-3); color: var(--color-gray-900);">
                    Risk Assessment & Mitigation
                </h2>
                <p class="lead-text" style="margin-bottom: var(--space-8); max-width: 900px;">
                    Comprehensive risk framework identifies key exposure areas and outlines proven mitigation strategies
                    from industry best practices.
                </p>

                <div class="grid grid-2" style="gap: var(--space-6);">
                    <!-- Market Risk -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: var(--space-3);">
                                <div style="width: 8px; height: 8px; background: var(--color-warning); border-radius: 50%;"></div>
                                <div>
                                    <h3 class="card-title">Market Demand Risk</h3>
                                    <p class="card-subtitle">Economic cycle sensitivity</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7; margin-bottom: var(--space-4);">
                                <strong>Risk:</strong> Economic downturn reduces freight volumes and construction activity,
                                impacting utilization rates and pricing power.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md); border-left: 3px solid var(--color-success);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-success); margin-bottom: var(--space-2);">
                                    Mitigation Strategies
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7;">
                                    <li>Dual-division strategy diversifies across uncorrelated sectors</li>
                                    <li>Long-term contracts (40% of revenue) provide downside protection</li>
                                    <li>Conservative utilization assumptions (85% vs 95% market peak)</li>
                                    <li>Flexible fleet deployment across geographies and sectors</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Equipment Value Risk -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: var(--space-3);">
                                <div style="width: 8px; height: 8px; background: var(--color-warning); border-radius: 50%;"></div>
                                <div>
                                    <h3 class="card-title">Asset Depreciation Risk</h3>
                                    <p class="card-subtitle">Residual value volatility</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7; margin-bottom: var(--space-4);">
                                <strong>Risk:</strong> Faster-than-expected equipment depreciation or technological obsolescence
                                reduces asset values and impairs sale proceeds.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md); border-left: 3px solid var(--color-success);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-success); margin-bottom: var(--space-2);">
                                    Mitigation Strategies
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7;">
                                    <li>Conservative residual value assumptions (35-40% vs 50% industry)</li>
                                    <li>Diversified brands reduce single-manufacturer exposure</li>
                                    <li>Regular maintenance programs preserve asset condition</li>
                                    <li>Active secondary market monitoring for disposal timing</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Operational Risk -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: var(--space-3);">
                                <div style="width: 8px; height: 8px; background: var(--color-info); border-radius: 50%;"></div>
                                <div>
                                    <h3 class="card-title">Operational Execution Risk</h3>
                                    <p class="card-subtitle">Fleet management complexity</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7; margin-bottom: var(--space-4);">
                                <strong>Risk:</strong> Managing 500+ unit fleet across two divisions requires sophisticated
                                logistics, maintenance scheduling, and customer service capabilities.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md); border-left: 3px solid var(--color-success);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-success); margin-bottom: var(--space-2);">
                                    Mitigation Strategies
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7;">
                                    <li>Fleet management software for real-time tracking and optimization</li>
                                    <li>Preventive maintenance programs reduce unplanned downtime</li>
                                    <li>Experienced management team with 50+ years combined experience</li>
                                    <li>Scalable processes and systems support 3x growth without major overhead</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Financing Risk -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: var(--space-3);">
                                <div style="width: 8px; height: 8px; background: var(--color-info); border-radius: 50%;"></div>
                                <div>
                                    <h3 class="card-title">Capital Access Risk</h3>
                                    <p class="card-subtitle">Funding availability and cost</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7; margin-bottom: var(--space-4);">
                                <strong>Risk:</strong> Rising interest rates or reduced credit availability could increase
                                capital costs or constrain growth plans.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md); border-left: 3px solid var(--color-success);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-success); margin-bottom: var(--space-2);">
                                    Mitigation Strategies
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7;">
                                    <li>Multiple lender relationships provide funding alternatives</li>
                                    <li>Strong cash generation supports debt service (3.5x+ coverage)</li>
                                    <li>Conservative leverage (55% LTV) maintains borrowing capacity</li>
                                    <li>Asset-backed lending structure provides collateral security</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Export and Actions Section
     */
    buildExportSection() {
        return `
            <section class="export-section" style="margin: var(--space-12) 0 var(--space-16);">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Data Export & Analysis Tools</h3>
                        <p class="card-subtitle">Download projections for further analysis</p>
                    </div>
                    <div class="card-body">
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); margin-bottom: var(--space-6); line-height: 1.6;">
                            Export your customized projections to CSV or JSON format for integration with financial models,
                            presentations, or portfolio analytics.
                        </p>
                        <div style="display: flex; gap: var(--space-4); flex-wrap: wrap;">
                            <button id="export-csv-btn" class="btn btn-primary">
                                <span>Export to CSV</span>
                            </button>
                            <button id="export-json-btn" class="btn btn-secondary">
                                <span>Export to JSON</span>
                            </button>
                            <button id="reset-btn" class="btn btn-outline">
                                <span>Reset to Defaults</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Core Calculation Engine
     * Runs comprehensive financial projections across all divisions
     */
    calculateProjections() {
        const projections = Calculator.calculateCombinedProjections(
            this.state.transportFleet,
            this.state.constructionFleet,
            this.state.transportSplit,
            this.state.constructionSplit,
            this.state.scenario
        );
        this.state.projections = projections;
        return projections;
    },

    /**
     * Initialize Interactive Components
     * Sets up all event listeners and dynamic elements
     */
    initializeComponents() {
        // Initialize scenario selector
        const scenarioContainer = document.getElementById('scenario-controls');
        if (scenarioContainer) {
            scenarioContainer.innerHTML = this.createScenarioButtons();
            this.addScenarioListeners();
        }

        // Create fleet input forms
        const transportInputsContainer = document.getElementById('transport-fleet-inputs');
        if (transportInputsContainer) {
            transportInputsContainer.innerHTML = this.createTransportInputs();
            this.addFleetInputListeners('transport');
        }

        const constructionInputsContainer = document.getElementById('construction-fleet-inputs');
        if (constructionInputsContainer) {
            constructionInputsContainer.innerHTML = this.createConstructionInputs();
            this.addFleetInputListeners('construction');
        }

        // Create revenue split controls
        const transportSplitContainer = document.getElementById('transport-split-inputs');
        if (transportSplitContainer) {
            transportSplitContainer.innerHTML = this.createSplitInputHTML('transport', 'Transport Equipment');
            this.addSplitInputListeners('transport');
        }

        const constructionSplitContainer = document.getElementById('construction-split-inputs');
        if (constructionSplitContainer) {
            constructionSplitContainer.innerHTML = this.createSplitInputHTML('construction', 'Construction Equipment');
            this.addSplitInputListeners('construction');
        }

        // Add export button listeners
        const exportCSVBtn = document.getElementById('export-csv-btn');
        if (exportCSVBtn) {
            exportCSVBtn.addEventListener('click', () => this.exportToCSV());
        }

        const exportJSONBtn = document.getElementById('export-json-btn');
        if (exportJSONBtn) {
            exportJSONBtn.addEventListener('click', () => this.exportToJSON());
        }

        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetToDefaults());
        }
    },

    /**
     * Create Scenario Selector Buttons
     */
    createScenarioButtons() {
        const scenarios = [
            { id: 'conservative', label: 'Conservative', desc: '85% utilization, moderate growth' },
            { id: 'moderate', label: 'Moderate', desc: '90% utilization, steady expansion' },
            { id: 'aggressive', label: 'Aggressive', desc: '95% utilization, rapid scaling' }
        ];

        return `
            <div class="scenario-buttons" style="display: flex; gap: var(--space-4); flex-wrap: wrap;">
                ${scenarios.map(s => `
                    <button
                        class="scenario-btn ${this.state.scenario === s.id ? 'active' : ''}"
                        data-scenario="${s.id}"
                        style="flex: 1; min-width: 200px; padding: var(--space-5); text-align: left; border: 2px solid var(--color-gray-300); border-radius: var(--radius-lg); background: var(--bg-surface); cursor: pointer; transition: all 0.2s;"
                    >
                        <div style="font-weight: var(--weight-semibold); font-size: var(--text-base); margin-bottom: var(--space-1);">${s.label}</div>
                        <div style="font-size: var(--text-sm); color: var(--color-gray-600);">${s.desc}</div>
                    </button>
                `).join('')}
            </div>
        `;
    },

    /**
     * Add Scenario Button Event Listeners
     */
    addScenarioListeners() {
        const buttons = document.querySelectorAll('.scenario-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const scenario = e.currentTarget.dataset.scenario;
                this.state.scenario = scenario;

                // Update button states
                buttons.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');

                // Recalculate and update
                this.recalculateAndUpdate();
            });
        });
    },

    /**
     * Create Transport Fleet Input Forms
     */
    createTransportInputs() {
        const types = Object.keys(CONFIG.transport.equipmentTypes);
        let html = '<div style="display: grid; gap: var(--space-4);">';

        CONFIG.years.forEach(year => {
            html += `
                <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md);">
                    <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); margin-bottom: var(--space-3); color: var(--color-transport);">
                        ${year} Fleet
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-3);">
                        ${types.map(type => {
                            const typeConfig = CONFIG.transport.equipmentTypes[type];
                            return `
                                <div>
                                    <label style="display: block; font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">
                                        ${typeConfig.name}
                                    </label>
                                    <input
                                        type="number"
                                        class="form-input transport-fleet-input"
                                        data-year="${year}"
                                        data-type="${type}"
                                        value="${this.state.transportFleet[year][type]}"
                                        min="0"
                                        max="1000"
                                        style="width: 100%; padding: var(--space-2); font-size: var(--text-sm);"
                                    />
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    },

    /**
     * Create Construction Fleet Input Forms
     */
    createConstructionInputs() {
        const types = Object.keys(CONFIG.construction.equipmentTypes);
        let html = '<div style="display: grid; gap: var(--space-4);">';

        CONFIG.years.forEach(year => {
            html += `
                <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md);">
                    <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); margin-bottom: var(--space-3); color: var(--color-construction);">
                        ${year} Fleet
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-3);">
                        ${types.map(type => {
                            const typeConfig = CONFIG.construction.equipmentTypes[type];
                            return `
                                <div>
                                    <label style="display: block; font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">
                                        ${typeConfig.name}
                                    </label>
                                    <input
                                        type="number"
                                        class="form-input construction-fleet-input"
                                        data-year="${year}"
                                        data-type="${type}"
                                        value="${this.state.constructionFleet[year][type]}"
                                        min="0"
                                        max="500"
                                        style="width: 100%; padding: var(--space-2); font-size: var(--text-sm);"
                                    />
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    },

    /**
     * Add Fleet Input Event Listeners
     */
    addFleetInputListeners(division) {
        const className = division === 'transport' ? 'transport-fleet-input' : 'construction-fleet-input';
        const inputs = document.querySelectorAll(`.${className}`);

        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const year = parseInt(e.target.dataset.year);
                const type = e.target.dataset.type;
                const value = parseInt(e.target.value) || 0;

                if (division === 'transport') {
                    this.state.transportFleet[year][type] = value;
                } else {
                    this.state.constructionFleet[year][type] = value;
                }

                // Real-time update with debouncing
                this.recalculateAndUpdate();
            });
        });
    },

    /**
     * Create Revenue Split Input HTML
     */
    createSplitInputHTML(division, title) {
        const split = division === 'transport' ? this.state.transportSplit : this.state.constructionSplit;

        return `
            <div>
                <h4 style="font-size: var(--text-base); font-weight: var(--weight-semibold); margin-bottom: var(--space-4);">
                    ${title}
                </h4>
                <div style="display: grid; gap: var(--space-4);">
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                            <label style="font-size: var(--text-sm); color: var(--color-gray-700);">Rental</label>
                            <span class="${division}-rental-value" style="font-size: var(--text-sm); font-family: var(--font-mono); font-weight: var(--weight-semibold);">
                                ${(split.rental * 100).toFixed(0)}%
                            </span>
                        </div>
                        <input
                            type="range"
                            class="form-range ${division}-rental-slider"
                            min="0"
                            max="100"
                            step="5"
                            value="${split.rental * 100}"
                            style="width: 100%;"
                        />
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                            <label style="font-size: var(--text-sm); color: var(--color-gray-700);">Lease</label>
                            <span class="${division}-lease-value" style="font-size: var(--text-sm); font-family: var(--font-mono); font-weight: var(--weight-semibold);">
                                ${(split.lease * 100).toFixed(0)}%
                            </span>
                        </div>
                        <input
                            type="range"
                            class="form-range ${division}-lease-slider"
                            min="0"
                            max="100"
                            step="5"
                            value="${split.lease * 100}"
                            style="width: 100%;"
                        />
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                            <label style="font-size: var(--text-sm); color: var(--color-gray-700);">Sales</label>
                            <span class="${division}-sales-value" style="font-size: var(--text-sm); font-family: var(--font-mono); font-weight: var(--weight-semibold);">
                                ${(split.sales * 100).toFixed(0)}%
                            </span>
                        </div>
                        <input
                            type="range"
                            class="form-range ${division}-sales-slider"
                            min="0"
                            max="100"
                            step="5"
                            value="${split.sales * 100}"
                            style="width: 100%;"
                        />
                    </div>
                    <div style="margin-top: var(--space-2); padding: var(--space-3); background: var(--color-gray-100); border-radius: var(--radius-md);">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: var(--text-sm); font-weight: var(--weight-semibold);">Total:</span>
                            <span class="${division}-total-value" style="font-size: var(--text-base); font-family: var(--font-mono); font-weight: var(--weight-bold);">
                                100%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Add Revenue Split Input Listeners
     */
    addSplitInputListeners(division) {
        const rentalSlider = document.querySelector(`.${division}-rental-slider`);
        const leaseSlider = document.querySelector(`.${division}-lease-slider`);
        const salesSlider = document.querySelector(`.${division}-sales-slider`);

        const updateSplitValues = () => {
            const rental = parseInt(rentalSlider.value);
            const lease = parseInt(leaseSlider.value);
            const sales = parseInt(salesSlider.value);
            const total = rental + lease + sales;

            // Update display values
            document.querySelector(`.${division}-rental-value`).textContent = `${rental}%`;
            document.querySelector(`.${division}-lease-value`).textContent = `${lease}%`;
            document.querySelector(`.${division}-sales-value`).textContent = `${sales}%`;
            document.querySelector(`.${division}-total-value`).textContent = `${total}%`;

            // Update state (normalize to 1.0)
            const split = division === 'transport' ? this.state.transportSplit : this.state.constructionSplit;
            split.rental = rental / 100;
            split.lease = lease / 100;
            split.sales = sales / 100;

            // Real-time update
            this.recalculateAndUpdate();
        };

        rentalSlider.addEventListener('input', updateSplitValues);
        leaseSlider.addEventListener('input', updateSplitValues);
        salesSlider.addEventListener('input', updateSplitValues);
    },

    /**
     * Real-Time Update Handler with Debouncing
     */
    recalculateAndUpdate() {
        if (this.state.isCalculating) return;

        this.state.isCalculating = true;

        // Debounce rapid updates
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => {
            this.calculateProjections();
            this.updateKPIs();
            this.updateAllCharts();
            this.state.isCalculating = false;
        }, 100);
    },

    /**
     * Update KPI Dashboard Values
     */
    updateKPIs() {
        const proj = this.state.projections;
        if (!proj) return;

        const totalRevenue = proj.revenue.total;
        const avgMargin = Utils.average(CONFIG.years.map(y => proj.ebitda.byYear[y].marginPercent));
        const totalCapital = proj.capitalRequirements.total;
        const npv = proj.valuation.npv;
        const irr = proj.valuation.irr;
        const totalFCF = proj.fcf.total;

        // Update KPI elements with animation
        this.updateMetricWithAnimation('total-revenue', Utils.formatCurrency(totalRevenue, true));
        this.updateMetricWithAnimation('avg-ebitda-margin', `${avgMargin.toFixed(1)}%`);
        this.updateMetricWithAnimation('total-capital', Utils.formatCurrency(totalCapital, true));
        this.updateMetricWithAnimation('npv-value', Utils.formatCurrency(npv, true));
        this.updateMetricWithAnimation('irr-value', Utils.formatPercent(irr, 1));
        this.updateMetricWithAnimation('total-fcf', Utils.formatCurrency(totalFCF, true));
    },

    /**
     * Update Metric with Animation
     */
    updateMetricWithAnimation(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.transition = 'opacity 0.2s';
            element.style.opacity = '0.5';
            setTimeout(() => {
                element.textContent = value;
                element.style.opacity = '1';
            }, 100);
        }
    },

    /**
     * Update All Charts
     */
    updateAllCharts() {
        const proj = this.state.projections;
        if (!proj) return;

        this.updateRevenueChart(proj);
        this.updateDivisionChart(proj);
        this.updateEBITDAChart(proj);
        this.updateFCFChart(proj);
        this.updateTransportFleetChart(proj);
        this.updateConstructionFleetChart(proj);
        this.updateBrandRevenueChart(proj);
        this.updateCapitalChart(proj);
    },

    /**
     * Update Revenue Chart
     */
    updateRevenueChart(proj) {
        const data = {
            labels: CONFIG.years,
            datasets: [{
                label: 'Total Revenue',
                data: CONFIG.years.map(y => proj.revenue.byYear[y].total),
                borderColor: CONFIG.colors.primary,
                backgroundColor: CONFIG.colors.primaryLight,
                fill: true,
                tension: 0.4
            }]
        };

        Charts.updateOrCreate('revenue-chart', 'line', data, {
            title: 'Combined Revenue Projection',
            yAxisFormatter: (value) => Utils.formatCurrency(value, true)
        });
    },

    /**
     * Update Division Chart
     */
    updateDivisionChart(proj) {
        const data = {
            labels: CONFIG.years,
            datasets: [
                {
                    label: 'Transport Equipment',
                    data: CONFIG.years.map(y => proj.transport.revenue.byYear[y].total),
                    backgroundColor: CONFIG.colors.transport,
                    borderColor: CONFIG.colors.transport,
                    borderWidth: 2
                },
                {
                    label: 'Construction Equipment',
                    data: CONFIG.years.map(y => proj.construction.revenue.byYear[y].total),
                    backgroundColor: CONFIG.colors.construction,
                    borderColor: CONFIG.colors.construction,
                    borderWidth: 2
                }
            ]
        };

        Charts.updateOrCreate('division-chart', 'bar', data, {
            title: 'Revenue by Division',
            yAxisFormatter: (value) => Utils.formatCurrency(value, true),
            stacked: false
        });
    },

    /**
     * Update EBITDA Chart
     */
    updateEBITDAChart(proj) {
        const data = {
            labels: CONFIG.years,
            datasets: [
                {
                    label: 'EBITDA',
                    data: CONFIG.years.map(y => proj.ebitda.byYear[y].amount),
                    type: 'bar',
                    backgroundColor: CONFIG.colors.success,
                    borderColor: CONFIG.colors.success,
                    yAxisID: 'y'
                },
                {
                    label: 'EBITDA Margin %',
                    data: CONFIG.years.map(y => proj.ebitda.byYear[y].marginPercent),
                    type: 'line',
                    borderColor: CONFIG.colors.gold,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    yAxisID: 'y1',
                    tension: 0.4
                }
            ]
        };

        Charts.updateOrCreate('ebitda-chart', 'bar', data, {
            title: 'EBITDA & Margin Analysis',
            yAxisFormatter: (value) => Utils.formatCurrency(value, true),
            dualAxis: true
        });
    },

    /**
     * Update FCF Chart
     */
    updateFCFChart(proj) {
        const data = {
            labels: CONFIG.years,
            datasets: [{
                label: 'Free Cash Flow',
                data: CONFIG.years.map(y => proj.fcf.byYear[y]),
                backgroundColor: CONFIG.years.map(y =>
                    proj.fcf.byYear[y] >= 0 ? CONFIG.colors.success : CONFIG.colors.danger
                ),
                borderColor: CONFIG.colors.primary,
                borderWidth: 1
            }]
        };

        Charts.updateOrCreate('fcf-chart', 'bar', data, {
            title: 'Free Cash Flow',
            yAxisFormatter: (value) => Utils.formatCurrency(value, true)
        });
    },

    /**
     * Update Transport Fleet Chart
     */
    updateTransportFleetChart(proj) {
        const types = Object.keys(CONFIG.transport.equipmentTypes);
        const year2025 = this.state.transportFleet[2025];

        const data = {
            labels: types.map(t => CONFIG.transport.equipmentTypes[t].name),
            datasets: [{
                data: types.map(t => year2025[t]),
                backgroundColor: [
                    CONFIG.colors.transport,
                    CONFIG.colors.transportLight,
                    CONFIG.colors.primary,
                    CONFIG.colors.info,
                    CONFIG.colors.warning
                ]
            }]
        };

        Charts.updateOrCreate('transport-fleet-chart', 'doughnut', data, {
            title: 'Transport Fleet Composition (2025)'
        });
    },

    /**
     * Update Construction Fleet Chart
     */
    updateConstructionFleetChart(proj) {
        const types = Object.keys(CONFIG.construction.equipmentTypes);
        const year2025 = this.state.constructionFleet[2025];

        const data = {
            labels: types.map(t => CONFIG.construction.equipmentTypes[t].name),
            datasets: [{
                data: types.map(t => year2025[t]),
                backgroundColor: [
                    CONFIG.colors.construction,
                    CONFIG.colors.constructionLight,
                    CONFIG.colors.warning,
                    CONFIG.colors.gold,
                    CONFIG.colors.primary,
                    CONFIG.colors.info
                ]
            }]
        };

        Charts.updateOrCreate('construction-fleet-chart', 'doughnut', data, {
            title: 'Construction Fleet Composition (2025)'
        });
    },

    /**
     * Update Brand Revenue Chart
     */
    updateBrandRevenueChart(proj) {
        const brandRevenue = {
            'SDLG': 0,
            'CHL': 0,
            'XCMG': 0
        };

        // Aggregate construction revenue by brand
        CONFIG.years.forEach(year => {
            const yearData = proj.construction.revenue.byYear[year];
            Object.keys(yearData.byType || {}).forEach(type => {
                const typeConfig = CONFIG.construction.equipmentTypes[type];
                if (typeConfig && typeConfig.brand) {
                    brandRevenue[typeConfig.brand] += yearData.byType[type] || 0;
                }
            });
        });

        const data = {
            labels: Object.keys(brandRevenue),
            datasets: [{
                label: 'Total Revenue by Brand',
                data: Object.values(brandRevenue),
                backgroundColor: [
                    CONFIG.colors.construction,
                    CONFIG.colors.constructionLight,
                    CONFIG.colors.gold
                ],
                borderColor: CONFIG.colors.primary,
                borderWidth: 1
            }]
        };

        Charts.updateOrCreate('brand-revenue-chart', 'bar', data, {
            title: 'Construction Revenue by Brand',
            yAxisFormatter: (value) => Utils.formatCurrency(value, true)
        });
    },

    /**
     * Update Capital Requirements Chart
     */
    updateCapitalChart(proj) {
        const data = {
            labels: CONFIG.years,
            datasets: [{
                label: 'Capital Requirements',
                data: CONFIG.years.map(y => proj.capitalRequirements.byYear[y]),
                backgroundColor: CONFIG.colors.primary,
                borderColor: CONFIG.colors.primaryDark,
                borderWidth: 2
            }]
        };

        Charts.updateOrCreate('capital-chart', 'bar', data, {
            title: 'Annual Capital Requirements',
            yAxisFormatter: (value) => Utils.formatCurrency(value, true)
        });
    },

    /**
     * Export to CSV
     */
    exportToCSV() {
        const proj = this.state.projections;
        if (!proj) return;

        let csv = 'Year,Total Revenue,EBITDA,EBITDA Margin %,Free Cash Flow,Capital Required\n';

        CONFIG.years.forEach(year => {
            const revenue = proj.revenue.byYear[year].total;
            const ebitda = proj.ebitda.byYear[year].amount;
            const margin = proj.ebitda.byYear[year].marginPercent;
            const fcf = proj.fcf.byYear[year];
            const capital = proj.capitalRequirements.byYear[year];

            csv += `${year},${revenue},${ebitda},${margin.toFixed(2)},${fcf},${capital}\n`;
        });

        // Add summary metrics
        csv += '\nSummary Metrics\n';
        csv += `Total Revenue,${proj.revenue.total}\n`;
        csv += `Total Capital,${proj.capitalRequirements.total}\n`;
        csv += `NPV (12% WACC),${proj.valuation.npv}\n`;
        csv += `IRR,${(proj.valuation.irr * 100).toFixed(2)}%\n`;
        csv += `Total FCF,${proj.fcf.total}\n`;

        // Download
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mainland-northland-projections-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    },

    /**
     * Export to JSON
     */
    exportToJSON() {
        const exportData = {
            timestamp: new Date().toISOString(),
            scenario: this.state.scenario,
            fleet: {
                transport: this.state.transportFleet,
                construction: this.state.constructionFleet
            },
            revenueSplit: {
                transport: this.state.transportSplit,
                construction: this.state.constructionSplit
            },
            projections: this.state.projections
        };

        const json = JSON.stringify(exportData, null, 2);

        // Download
        const blob = new Blob([json], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mainland-northland-projections-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
    },

    /**
     * Reset to Default Values
     */
    resetToDefaults() {
        if (!confirm('Reset all inputs to default values? This will clear your customizations.')) {
            return;
        }

        // Reset state
        this.state.transportFleet = Utils.deepClone(CONFIG.transport.defaultFleet);
        this.state.constructionFleet = Utils.deepClone(CONFIG.construction.defaultFleet);
        this.state.transportSplit = Utils.deepClone(CONFIG.transport.defaultRevenueSplit);
        this.state.constructionSplit = Utils.deepClone(CONFIG.construction.defaultRevenueSplit);
        this.state.scenario = 'moderate';

        // Re-render the entire dashboard
        const container = document.getElementById('business-content');
        if (container) {
            this.render(container);
        }
    }
};

// Make available globally
window.MainlandNorthland = MainlandNorthland;
