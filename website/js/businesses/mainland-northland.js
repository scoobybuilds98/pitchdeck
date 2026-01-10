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
     * Continue building in next message...
     */
