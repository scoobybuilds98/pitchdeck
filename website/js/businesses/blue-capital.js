/* ============================================
   BLUE CAPITAL EQUIPMENT FINANCE
   Institutional Investment Platform
   Enterprise-Grade Financial Projections & Analysis
   ============================================ */

const BlueCapital = {
    // Application State
    state: {
        portfolio: Utils.deepClone(CONFIG.finance.defaultPortfolio),
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

                <!-- Product Analysis -->
                ${this.buildProductAnalysis()}

                <!-- Interactive Portfolio Planning -->
                ${this.buildPortfolioPlanning()}

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
        const totalRevenue = proj ? proj.total.revenue : 0;
        const totalProfit = proj ? proj.total.profit : 0;
        const avgMargin = proj ? Utils.average(CONFIG.years.map(y => proj.byYear[y].margin)) * 100 : 0;
        const totalContracts = CONFIG.years.reduce((sum, year) =>
            sum + this.calculateTotalPortfolio(this.state.portfolio[year]), 0
        );

        return `
            <section class="executive-summary" style="margin: var(--space-16) 0 var(--space-12);">
                <div class="card-accent" style="padding: var(--space-8); border-radius: var(--radius-xl);">
                    <h1 style="font-size: var(--text-5xl); font-weight: var(--weight-bold); color: var(--color-white); margin-bottom: var(--space-4); letter-spacing: -0.03em;">
                        Blue Capital Equipment Finance
                    </h1>
                    <p class="lead-text" style="color: rgba(255, 255, 255, 0.9); font-size: var(--text-lg); line-height: 1.8; margin-bottom: var(--space-6);">
                        Specialized Equipment Financing Platform
                    </p>

                    <div class="grid grid-4" style="gap: var(--space-6); margin-top: var(--space-8);">
                        <div>
                            <div style="font-size: var(--text-xs); color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">6-Year Revenue</div>
                            <div style="font-size: var(--text-4xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-gold);">
                                ${Utils.formatCurrency(totalRevenue, true)}
                            </div>
                        </div>
                        <div>
                            <div style="font-size: var(--text-xs); color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">6-Year Profit</div>
                            <div style="font-size: var(--text-4xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-gold);">
                                ${Utils.formatCurrency(totalProfit, true)}
                            </div>
                        </div>
                        <div>
                            <div style="font-size: var(--text-xs); color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">Avg Net Margin</div>
                            <div style="font-size: var(--text-4xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-gold);">
                                ${avgMargin.toFixed(1)}%
                            </div>
                        </div>
                        <div>
                            <div style="font-size: var(--text-xs); color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">Total Contracts</div>
                            <div style="font-size: var(--text-4xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-gold);">
                                ${Utils.formatNumber(totalContracts)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Market Analysis Section
     */
    buildMarketAnalysis() {
        return `
            <section class="market-analysis" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-3); color: var(--color-gray-900);">
                    Market Analysis & Strategic Opportunity
                </h2>
                <p class="lead-text" style="margin-bottom: var(--space-8); max-width: 900px;">
                    We operate in the Canadian equipment financing market valued at approximately $28 billion annually,
                    serving small and medium-sized enterprises across transport, construction, and industrial sectors.
                </p>

                <div class="grid grid-2" style="gap: var(--space-6);">
                    <!-- Equipment Financing Market -->
                    <div class="card">
                        <div class="card-header">
                            <div>
                                <h3 class="card-title">Equipment Financing Market</h3>
                                <p class="card-subtitle">$28B Canadian Opportunity</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="line-height: 1.7; color: var(--color-gray-700); margin-bottom: var(--space-4);">
                                The Canadian equipment financing market represents one of the most resilient segments of commercial lending,
                                with over 80% of businesses utilizing some form of equipment financing. The sector benefits from
                                structural tailwinds including aging equipment fleets, regulatory compliance driving upgrades, and
                                the fundamental economics of preserving working capital for core operations.
                            </p>
                            <div class="grid grid-2" style="gap: var(--space-4); margin-top: var(--space-5);">
                                <div>
                                    <div style="font-size: var(--text-xs); color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">Market Size</div>
                                    <div style="font-size: var(--text-2xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-finance);">
                                        $28B CAD
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: var(--text-xs); color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">CAGR 2024-2030</div>
                                    <div style="font-size: var(--text-2xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-success);">
                                        4.8%
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: var(--space-5); padding: var(--space-4); background: rgba(49, 151, 149, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--color-finance);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-finance); margin-bottom: var(--space-2);">
                                    Key Growth Drivers
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); color: var(--color-gray-700); font-size: var(--text-sm); line-height: 1.7;">
                                    <li>Small business equipment needs (1.2M SMEs in Canada)</li>
                                    <li>Tax incentives for equipment financing (CCA benefits)</li>
                                    <li>Equipment age (avg 12 years, replacement cycle accelerating)</li>
                                    <li>Alternative financing gap (banks tightening SME lending)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Competitive Landscape -->
                    <div class="card">
                        <div class="card-header">
                            <div>
                                <h3 class="card-title">Competitive Positioning</h3>
                                <p class="card-subtitle">Specialized Alternative Lender</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="line-height: 1.7; color: var(--color-gray-700); margin-bottom: var(--space-4);">
                                We operate in the non-bank equipment financing segment, targeting customers underserved by
                                traditional banks. Our focus on transport and construction equipment provides specialized
                                underwriting expertise that larger competitors lack, while our technology platform enables
                                faster credit decisions and superior customer experience.
                            </p>
                            <div class="grid grid-2" style="gap: var(--space-4); margin-top: var(--space-5);">
                                <div>
                                    <div style="font-size: var(--text-xs); color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">Target Segment</div>
                                    <div style="font-size: var(--text-2xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-finance);">
                                        $8.5B
                                    </div>
                                    <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-top: var(--space-1);">Alt. lender addressable market</div>
                                </div>
                                <div>
                                    <div style="font-size: var(--text-xs); color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">Market Share Goal</div>
                                    <div style="font-size: var(--text-2xl); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-success);">
                                        0.5%
                                    </div>
                                    <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-top: var(--space-1);">By 2030 (achievable scale)</div>
                                </div>
                            </div>
                            <div style="margin-top: var(--space-5); padding: var(--space-4); background: rgba(49, 151, 149, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--color-success);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-success); margin-bottom: var(--space-2);">
                                    Competitive Advantages
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); color: var(--color-gray-700); font-size: var(--text-sm); line-height: 1.7;">
                                    <li>Specialized equipment expertise (transport + construction)</li>
                                    <li>Technology-enabled underwriting (48-hour decisions)</li>
                                    <li>Relationship with equipment dealers (referral network)</li>
                                    <li>Flexible structures (equipment loans, leases, LOC)</li>
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
                    Our equipment financing platform generates returns through net interest margin, fee income,
                    and residual value capture, with multiple product offerings tailored to customer needs.
                </p>

                <div class="grid grid-2" style="gap: var(--space-6);">
                    <!-- Revenue Model -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Revenue Economics</h3>
                        </div>
                        <div class="card-body">
                            <p style="line-height: 1.7; color: var(--color-gray-700); margin-bottom: var(--space-5);">
                                Our revenue model combines net interest margin (spread between funding cost and customer rate),
                                origination fees (2-3% of principal), and lease residual value capture. This diversified approach
                                provides stable recurring income while maintaining attractive risk-adjusted returns.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); margin-bottom: var(--space-3);">Revenue Components</h4>
                                <div class="stacked-metrics">
                                    <div class="stacked-metric">
                                        <div class="stacked-metric-header">
                                            <div class="stacked-metric-label">Net Interest Margin</div>
                                            <div class="stacked-metric-value">5.5-7.5%</div>
                                        </div>
                                        <div class="progress" style="margin-top: var(--space-2);">
                                            <div class="progress-bar" style="width: 65%;"></div>
                                        </div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-top: var(--space-1);">
                                            Primary revenue driver (65% of total)
                                        </div>
                                    </div>
                                    <div class="stacked-metric" style="margin-top: var(--space-3);">
                                        <div class="stacked-metric-header">
                                            <div class="stacked-metric-label">Origination Fees</div>
                                            <div class="stacked-metric-value">2.0-3.0%</div>
                                        </div>
                                        <div class="progress" style="margin-top: var(--space-2);">
                                            <div class="progress-bar" style="width: 25%;"></div>
                                        </div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-top: var(--space-1);">
                                            Up-front fee income (25% of total)
                                        </div>
                                    </div>
                                    <div class="stacked-metric" style="margin-top: var(--space-3);">
                                        <div class="stacked-metric-header">
                                            <div class="stacked-metric-label">Residual Value</div>
                                            <div class="stacked-metric-value">8-12%</div>
                                        </div>
                                        <div class="progress" style="margin-top: var(--space-2);">
                                            <div class="progress-bar" style="width: 10%;"></div>
                                        </div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-top: var(--space-1);">
                                            Lease-end value capture (10% of total)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product Portfolio -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Product Portfolio</h3>
                        </div>
                        <div class="card-body">
                            <p style="line-height: 1.7; color: var(--color-gray-700); margin-bottom: var(--space-5);">
                                Three complementary financing products address different customer needs and risk profiles.
                                Equipment loans provide ownership financing, leases enable operating expense treatment,
                                and lines of credit offer flexible working capital solutions.
                            </p>
                            <div style="margin-top: var(--space-4);">
                                <div style="padding: var(--space-3); background: rgba(49, 151, 149, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--color-finance); margin-bottom: var(--space-3);">
                                    <div style="font-weight: var(--weight-semibold); color: var(--color-finance); font-size: var(--text-sm); margin-bottom: var(--space-1);">Equipment Loans</div>
                                    <div style="font-size: var(--text-sm); color: var(--color-gray-700);">
                                        60-month term, 75% LTV, 8.5% rate - Full ownership financing for creditworthy borrowers
                                    </div>
                                </div>
                                <div style="padding: var(--space-3); background: rgba(49, 151, 149, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--color-finance); margin-bottom: var(--space-3);">
                                    <div style="font-weight: var(--weight-semibold); color: var(--color-finance); font-size: var(--text-sm); margin-bottom: var(--space-1);">Equipment Leases</div>
                                    <div style="font-size: var(--text-sm); color: var(--color-gray-700);">
                                        48-month term, 85% LTV, 9.5% rate - Operating leases with residual value retention
                                    </div>
                                </div>
                                <div style="padding: var(--space-3); background: rgba(49, 151, 149, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--color-finance);">
                                    <div style="font-weight: var(--weight-semibold); color: var(--color-finance); font-size: var(--text-sm); margin-bottom: var(--space-1);">Equipment Lines of Credit</div>
                                    <div style="font-size: var(--text-sm); color: var(--color-gray-700);">
                                        12-month revolving, 70% LTV, Prime + 6.5% - Flexible working capital secured by equipment
                                    </div>
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
                    Model different growth trajectories and credit environments to stress-test portfolio performance.
                </p>
                <div id="scenario-controls"></div>
            </section>
        `;
    },

    /**
     * KPI Dashboard
     */
    buildKPIDashboard() {
        const proj = this.state.projections;
        if (!proj) return '';

        const totalRevenue = proj.total.revenue;
        const totalProfit = proj.total.profit;
        const avgMargin = Utils.average(CONFIG.years.map(y => proj.byYear[y].margin)) * 100;
        const totalContracts = CONFIG.years.reduce((sum, year) =>
            sum + this.calculateTotalPortfolio(this.state.portfolio[year]), 0
        );
        const avgPortfolio = totalContracts / CONFIG.years.length;
        const year2030Margin = proj.byYear[2030].margin * 100;

        return `
            <section class="kpi-dashboard" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-6); color: var(--color-gray-900);">
                    Key Performance Indicators
                </h2>

                <div class="grid grid-3" style="gap: var(--space-6); margin-bottom: var(--space-8);">
                    <div class="card card-elevated">
                        <div class="metric">
                            <div class="metric-label">Total Revenue (2025-2030)</div>
                            <div class="metric-value" id="finance-total-revenue">${Utils.formatCurrency(totalRevenue, true)}</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.6;">
                                Aggregate interest income, fees, and residual value capture over projection period.
                            </p>
                        </div>
                    </div>

                    <div class="card card-elevated">
                        <div class="metric">
                            <div class="metric-label">Total Net Profit (2025-2030)</div>
                            <div class="metric-value" id="finance-total-profit">${Utils.formatCurrency(totalProfit, true)}</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.6;">
                                After funding costs, credit losses, and operating expenses.
                            </p>
                        </div>
                    </div>

                    <div class="card card-elevated">
                        <div class="metric">
                            <div class="metric-label">Average Net Margin</div>
                            <div class="metric-value" id="finance-avg-margin">${avgMargin.toFixed(1)}%</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.6;">
                                Industry-leading profitability reflecting specialized underwriting expertise.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="grid grid-3" style="gap: var(--space-6);">
                    <div class="card card-success">
                        <div class="metric">
                            <div class="metric-label">Total Contracts (6 Years)</div>
                            <div class="metric-value" id="finance-total-contracts">${Utils.formatNumber(totalContracts)}</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.6;">
                                Cumulative financing contracts across all product types.
                            </p>
                        </div>
                    </div>

                    <div class="card card-success">
                        <div class="metric">
                            <div class="metric-label">Avg Annual Portfolio</div>
                            <div class="metric-value" id="finance-avg-portfolio">${Utils.formatNumber(Math.round(avgPortfolio))}</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.6;">
                                Average active contract count demonstrating sustainable scale.
                            </p>
                        </div>
                    </div>

                    <div class="card card-success">
                        <div class="metric">
                            <div class="metric-label">2030 Net Margin</div>
                            <div class="metric-value" id="finance-2030-margin">${year2030Margin.toFixed(1)}%</div>
                            <p style="margin-top: var(--space-3); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.6;">
                                Terminal year profitability showing margin expansion potential.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Calculate total portfolio size
     */
    calculateTotalPortfolio(portfolio) {
        if (!portfolio) return 0;
        return Object.values(portfolio).reduce((sum, val) => sum + val, 0);
    },

    /**
     * Core Calculation Engine
     */
    calculateProjections() {
        this.state.projections = Calculator.calculateFinanceProjections(
            this.state.portfolio,
            this.state.scenario
        );
        return this.state.projections;
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
                    Comprehensive 6-year financial model incorporating portfolio growth, net interest margin dynamics,
                    credit loss provisioning, and operating leverage.
                </p>

                <div class="charts-grid">
                    <!-- Revenue & Profit Projection -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Revenue & Profit Projection</h3>
                                <p class="chart-subtitle">6-Year Growth (2025-2030)</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            Revenue growth driven by portfolio expansion and consistent net interest margin. Profitability
                            improves as operating costs are leveraged across larger portfolio base.
                        </p>
                        <div class="chart-wrapper">
                            <canvas id="finance-revenue-profit-chart"></canvas>
                        </div>
                    </div>

                    <!-- Profit Margin Trend -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Profit Margin Analysis</h3>
                                <p class="chart-subtitle">Efficiency Improvement</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            Margin expansion from 28% to 35% driven by operating leverage, improved credit selection,
                            and technology automation reducing per-contract costs.
                        </p>
                        <div class="chart-wrapper">
                            <canvas id="finance-margin-chart"></canvas>
                        </div>
                    </div>

                    <!-- Portfolio Mix -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Portfolio Mix (2025)</h3>
                                <p class="chart-subtitle">Product Distribution</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            Balanced portfolio across equipment loans (60%), leases (30%), and lines of credit (10%)
                            optimizes for risk-adjusted returns and customer needs.
                        </p>
                        <div class="chart-wrapper chart-md">
                            <canvas id="finance-portfolio-mix-chart"></canvas>
                        </div>
                    </div>

                    <!-- Portfolio Growth -->
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Portfolio Growth by Product</h3>
                                <p class="chart-subtitle">Contract Volume Expansion</p>
                            </div>
                        </div>
                        <p style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.7; margin-bottom: var(--space-5);">
                            Steady portfolio growth across all products demonstrates sustainable origination capacity
                            and market acceptance of our financing solutions.
                        </p>
                        <div class="chart-wrapper chart-md">
                            <canvas id="finance-portfolio-growth-chart"></canvas>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Product Analysis Section
     */
    buildProductAnalysis() {
        return `
            <section class="product-analysis" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-3); color: var(--color-gray-900);">
                    Product Analysis
                </h2>
                <p class="lead-text" style="margin-bottom: var(--space-8); max-width: 900px;">
                    Detailed analysis of our three complementary financing products, each serving distinct customer needs
                    and risk profiles.
                </p>

                <div class="grid grid-3" style="gap: var(--space-6);">
                    <!-- Equipment Loans -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Equipment Loans</h3>
                            <p class="card-subtitle">Ownership Financing</p>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7; margin-bottom: var(--space-4);">
                                Traditional equipment financing with asset ownership transferred to customer. Secured by equipment,
                                provides predictable amortizing payments over 60-month term.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md);">
                                <div class="grid grid-2" style="gap: var(--space-3); margin-bottom: var(--space-3);">
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Interest Rate</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-finance);">
                                            8.5%
                                        </div>
                                    </div>
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Loan-to-Value</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-finance);">
                                            75%
                                        </div>
                                    </div>
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Term</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-finance);">
                                            60 mo
                                        </div>
                                    </div>
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Portfolio %</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-success);">
                                            60%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Equipment Leases -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Equipment Leases</h3>
                            <p class="card-subtitle">Operating Lease Solutions</p>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7; margin-bottom: var(--space-4);">
                                Operating leases enable customers to use equipment without ownership, preserving capital and
                                enabling operating expense treatment. We retain residual value upside.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md);">
                                <div class="grid grid-2" style="gap: var(--space-3); margin-bottom: var(--space-3);">
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Effective Rate</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-finance);">
                                            9.5%
                                        </div>
                                    </div>
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Loan-to-Value</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-finance);">
                                            85%
                                        </div>
                                    </div>
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Term</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-finance);">
                                            48 mo
                                        </div>
                                    </div>
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Portfolio %</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-success);">
                                            30%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Lines of Credit -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Equipment Lines of Credit</h3>
                            <p class="card-subtitle">Flexible Working Capital</p>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7; margin-bottom: var(--space-4);">
                                Revolving credit facilities secured by equipment enable customers to manage working capital
                                fluctuations. Higher rates reflect shorter-term revolving nature.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md);">
                                <div class="grid grid-2" style="gap: var(--space-3); margin-bottom: var(--space-3);">
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Interest Rate</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-finance);">
                                            Prime + 6.5%
                                        </div>
                                    </div>
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Advance Rate</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-finance);">
                                            70%
                                        </div>
                                    </div>
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Commitment</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-finance);">
                                            12 mo revolving
                                        </div>
                                    </div>
                                    <div>
                                        <div style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-1);">Portfolio %</div>
                                        <div style="font-size: var(--text-lg); font-weight: var(--weight-bold); font-family: var(--font-mono); color: var(--color-success);">
                                            10%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Interactive Portfolio Planning
     */
    buildPortfolioPlanning() {
        return `
            <section class="portfolio-planning" style="margin: var(--space-12) 0;">
                <h2 style="font-size: var(--text-4xl); font-weight: var(--weight-bold); margin-bottom: var(--space-3); color: var(--color-gray-900);">
                    Interactive Portfolio Planning
                </h2>
                <p class="lead-text" style="margin-bottom: var(--space-8); max-width: 900px;">
                    Customize contract volumes by product and year to model your preferred growth strategy.
                    All financial projections update instantly as you adjust parameters.
                </p>

                <div id="portfolio-inputs-container"></div>
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
                    from equipment financing best practices.
                </p>

                <div class="grid grid-2" style="gap: var(--space-6);">
                    <!-- Credit Risk -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: var(--space-3);">
                                <div style="width: 8px; height: 8px; background: var(--color-warning); border-radius: 50%;"></div>
                                <div>
                                    <h3 class="card-title">Credit & Default Risk</h3>
                                    <p class="card-subtitle">Borrower payment performance</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7; margin-bottom: var(--space-4);">
                                <strong>Risk:</strong> Economic downturn or customer financial distress leads to payment defaults,
                                requiring equipment repossession and disposition at potentially depressed values.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md); border-left: 3px solid var(--color-success);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-success); margin-bottom: var(--space-2);">
                                    Mitigation Strategies
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7;">
                                    <li>Conservative LTV ratios (70-85% vs 90%+ competitors)</li>
                                    <li>Specialized underwriting (equipment-specific expertise)</li>
                                    <li>Diversified portfolio (transport + construction + industrial)</li>
                                    <li>4% loss provision (2x historical default rates)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Interest Rate Risk -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: var(--space-3);">
                                <div style="width: 8px; height: 8px; background: var(--color-warning); border-radius: 50%;"></div>
                                <div>
                                    <h3 class="card-title">Interest Rate Risk</h3>
                                    <p class="card-subtitle">Funding cost volatility</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7; margin-bottom: var(--space-4);">
                                <strong>Risk:</strong> Rising interest rates increase our funding costs while customer rates
                                remain fixed on existing contracts, compressing net interest margin.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md); border-left: 3px solid var(--color-success);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-success); margin-bottom: var(--space-2);">
                                    Mitigation Strategies
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7;">
                                    <li>Fixed-rate funding match to asset duration</li>
                                    <li>400bp spread provides cushion for rate movements</li>
                                    <li>Variable-rate products (LOC) adjust with market</li>
                                    <li>Interest rate swaps for duration mismatches</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Residual Value Risk -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: var(--space-3);">
                                <div style="width: 8px; height: 8px; background: var(--color-info); border-radius: 50%;"></div>
                                <div>
                                    <h3 class="card-title">Residual Value Risk</h3>
                                    <p class="card-subtitle">Equipment value volatility</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7; margin-bottom: var(--space-4);">
                                <strong>Risk:</strong> Equipment values decline faster than projected, impairing lease residual
                                values and collateral coverage for loans.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md); border-left: 3px solid var(--color-success);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-success); margin-bottom: var(--space-2);">
                                    Mitigation Strategies
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7;">
                                    <li>Conservative residual value assumptions (35% vs 50% OEM)</li>
                                    <li>Focus on mainstream equipment with liquid markets</li>
                                    <li>Ongoing residual value monitoring and updates</li>
                                    <li>Equipment loans reduce residual exposure</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Regulatory & Compliance Risk -->
                    <div class="card">
                        <div class="card-header">
                            <div style="display: flex; align-items: center; gap: var(--space-3);">
                                <div style="width: 8px; height: 8px; background: var(--color-info); border-radius: 50%;"></div>
                                <div>
                                    <h3 class="card-title">Regulatory Risk</h3>
                                    <p class="card-subtitle">Compliance requirements</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7; margin-bottom: var(--space-4);">
                                <strong>Risk:</strong> Changes to consumer lending regulations, capital requirements, or tax treatment
                                of equipment financing could impact profitability or operations.
                            </p>
                            <div style="background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md); border-left: 3px solid var(--color-success);">
                                <h4 style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-success); margin-bottom: var(--space-2);">
                                    Mitigation Strategies
                                </h4>
                                <ul style="margin: 0; padding-left: var(--space-5); font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.7;">
                                    <li>Non-bank lender status (lighter regulatory burden)</li>
                                    <li>Commercial focus (vs consumer lending regulations)</li>
                                    <li>Compliance budget (1.5% of revenue allocated)</li>
                                    <li>Legal counsel monitoring regulatory changes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Export Section
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
                            <button id="finance-export-csv-btn" class="btn btn-primary">
                                <span>Export to CSV</span>
                            </button>
                            <button id="finance-export-json-btn" class="btn btn-secondary">
                                <span>Export to JSON</span>
                            </button>
                            <button id="finance-reset-btn" class="btn btn-outline">
                                <span>Reset to Defaults</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Initialize Components - Continuing with remaining methods...
     */

