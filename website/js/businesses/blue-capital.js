/* ============================================
   BLUE CAPITAL EQUIPMENT FINANCE
   Interactive Dashboard & Projections
   ============================================ */

const BlueCapital = {
    // State
    state: {
        portfolio: Utils.deepClone(CONFIG.finance.defaultPortfolio),
        scenario: 'moderate',
        projections: null
    },

    /**
     * Render the dashboard
     * @param {HTMLElement} container - Container element
     */
    render(container) {
        // Calculate initial projections
        this.calculateProjections();

        // Create dashboard layout
        const dashboardHTML = `
            <div class="container">
                <!-- Company Overview -->
                <section class="company-overview" style="margin: var(--spacing-3xl) 0;">
                    <div class="card card-finance">
                        <div class="card-header">
                            <div>
                                <h2 class="card-title">💼 Blue Capital Equipment Finance</h2>
                                <p class="card-subtitle">Equipment Financing & Leasing Solutions</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <p>Specialized equipment financing company providing loans, leases, and lines of credit for heavy equipment across Canada. Serving transport, construction, and industrial sectors.</p>
                            <div class="grid grid-3" style="margin-top: var(--spacing-lg);">
                                <div class="metric">
                                    <div class="metric-label">Product Types</div>
                                    <div class="metric-value">3</div>
                                </div>
                                <div class="metric">
                                    <div class="metric-label">Target Markets</div>
                                    <div class="metric-value">5+</div>
                                </div>
                                <div class="metric">
                                    <div class="metric-label">2025 Portfolio</div>
                                    <div class="metric-value">${this.calculateTotalPortfolio(this.state.portfolio[2025])}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Scenario Selector -->
                <section id="scenario-selector" class="scenario-section" style="margin: var(--spacing-3xl) 0;"></section>

                <!-- Key Metrics Dashboard -->
                <section class="key-metrics" style="margin: var(--spacing-3xl) 0;">
                    <h2 class="section-title">Key Performance Indicators</h2>
                    <div class="grid grid-4">
                        <div class="card">
                            <div class="metric">
                                <div class="metric-label">Total Revenue (6 Years)</div>
                                <div class="metric-value" id="total-revenue">$0</div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="metric">
                                <div class="metric-label">Total Profit (6 Years)</div>
                                <div class="metric-value" id="total-profit">$0</div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="metric">
                                <div class="metric-label">Average Margin</div>
                                <div class="metric-value" id="avg-margin">0%</div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="metric">
                                <div class="metric-label">Total Contracts</div>
                                <div class="metric-value" id="total-contracts">0</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Products Overview -->
                <section class="products-section" style="margin: var(--spacing-3xl) 0;">
                    <h2 class="section-title">Financial Products</h2>
                    <div class="grid grid-3">
                        ${Object.keys(CONFIG.finance.products).map(key => {
                            const product = CONFIG.finance.products[key];
                            return `
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">${product.icon} ${product.name}</h3>
                                    </div>
                                    <div class="card-body">
                                        <div class="stacked-metrics">
                                            <div class="stacked-metric">
                                                <div class="stacked-metric-header">
                                                    <div class="stacked-metric-label">Interest Rate</div>
                                                    <div class="stacked-metric-value">${Utils.formatPercent(product.defaultRate, 2)}</div>
                                                </div>
                                            </div>
                                            <div class="stacked-metric">
                                                <div class="stacked-metric-header">
                                                    <div class="stacked-metric-label">Term</div>
                                                    <div class="stacked-metric-value">${product.termMonths} mo</div>
                                                </div>
                                            </div>
                                            <div class="stacked-metric">
                                                <div class="stacked-metric-header">
                                                    <div class="stacked-metric-label">LTV Ratio</div>
                                                    <div class="stacked-metric-value">${Utils.formatPercent(product.ltv, 0)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </section>

                <!-- Main Charts -->
                <section class="main-charts" style="margin: var(--spacing-3xl) 0;">
                    <h2 class="section-title">Financial Performance</h2>

                    <div class="charts-grid">
                        <div class="chart-card">
                            <div class="chart-header">
                                <div class="chart-title-section">
                                    <h3 class="chart-title">Revenue & Profit Projection</h3>
                                    <p class="chart-subtitle">6-Year Growth (2025-2030)</p>
                                </div>
                            </div>
                            <div class="chart-wrapper">
                                <canvas id="revenue-profit-chart"></canvas>
                            </div>
                        </div>

                        <div class="chart-card">
                            <div class="chart-header">
                                <div class="chart-title-section">
                                    <h3 class="chart-title">Profit Margin Trend</h3>
                                    <p class="chart-subtitle">Efficiency Analysis</p>
                                </div>
                            </div>
                            <div class="chart-wrapper">
                                <canvas id="margin-chart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="charts-grid">
                        <div class="chart-card">
                            <div class="chart-header">
                                <div class="chart-title-section">
                                    <h3 class="chart-title">Portfolio Mix</h3>
                                    <p class="chart-subtitle">Product Distribution (2025)</p>
                                </div>
                            </div>
                            <div class="chart-wrapper chart-medium">
                                <canvas id="portfolio-mix-chart"></canvas>
                            </div>
                        </div>

                        <div class="chart-card">
                            <div class="chart-header">
                                <div class="chart-title-section">
                                    <h3 class="chart-title">Portfolio Growth</h3>
                                    <p class="chart-subtitle">Contract Volume by Product</p>
                                </div>
                            </div>
                            <div class="chart-wrapper chart-medium">
                                <canvas id="portfolio-growth-chart"></canvas>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Portfolio Input Controls -->
                <section class="portfolio-controls" style="margin: var(--spacing-3xl) 0;">
                    <h2 class="section-title">Portfolio Planning</h2>
                    <p class="section-subtitle">Adjust contract volumes by product and year</p>

                    <div id="portfolio-inputs"></div>
                </section>

                <!-- Cost Analysis -->
                <section class="cost-analysis" style="margin: var(--spacing-3xl) 0;">
                    <h2 class="section-title">Cost Structure Analysis</h2>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Operating Cost Breakdown</h3>
                        </div>
                        <div class="card-body">
                            <div class="grid grid-4">
                                <div class="stacked-metric">
                                    <div class="stacked-metric-header">
                                        <div class="stacked-metric-label">Funding Cost</div>
                                        <div class="stacked-metric-value">${Utils.formatPercent(CONFIG.finance.costs.fundingCost, 2)}</div>
                                    </div>
                                    <div class="stacked-metric-bar">
                                        <div class="stacked-metric-fill" style="width: ${CONFIG.finance.costs.fundingCost * 100}%"></div>
                                    </div>
                                </div>
                                <div class="stacked-metric">
                                    <div class="stacked-metric-header">
                                        <div class="stacked-metric-label">Loss Provision</div>
                                        <div class="stacked-metric-value">${Utils.formatPercent(CONFIG.finance.costs.lossProvision, 2)}</div>
                                    </div>
                                    <div class="stacked-metric-bar">
                                        <div class="stacked-metric-fill" style="width: ${CONFIG.finance.costs.lossProvision * 100}%"></div>
                                    </div>
                                </div>
                                <div class="stacked-metric">
                                    <div class="stacked-metric-header">
                                        <div class="stacked-metric-label">Administrative</div>
                                        <div class="stacked-metric-value">${Utils.formatPercent(CONFIG.finance.costs.administrative, 2)}</div>
                                    </div>
                                    <div class="stacked-metric-bar">
                                        <div class="stacked-metric-fill" style="width: ${CONFIG.finance.costs.administrative * 100}%"></div>
                                    </div>
                                </div>
                                <div class="stacked-metric">
                                    <div class="stacked-metric-header">
                                        <div class="stacked-metric-label">Compliance</div>
                                        <div class="stacked-metric-value">${Utils.formatPercent(CONFIG.finance.costs.compliance, 2)}</div>
                                    </div>
                                    <div class="stacked-metric-bar">
                                        <div class="stacked-metric-fill" style="width: ${CONFIG.finance.costs.compliance * 100}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Data Export -->
                <section class="export-section" style="margin: var(--spacing-3xl) 0;">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Export Data</h3>
                        </div>
                        <div class="card-body">
                            <p>Download your projections and analysis in various formats</p>
                            <div style="display: flex; gap: var(--spacing-md); margin-top: var(--spacing-lg);">
                                <button class="btn btn-primary" onclick="BlueCapital.exportToCSV()">
                                    📊 Export to CSV
                                </button>
                                <button class="btn btn-primary" onclick="BlueCapital.exportToJSON()">
                                    📄 Export to JSON
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;

        container.innerHTML = dashboardHTML;

        // Initialize components
        this.initializeScenarioSelector();
        this.initializeInputs();
        this.updateDashboard();
    },

    /**
     * Initialize scenario selector
     */
    initializeScenarioSelector() {
        const container = document.getElementById('scenario-selector');
        createScenarioSelector(container, (scenario) => {
            this.state.scenario = scenario;
            this.calculateProjections();
            this.updateDashboard();
            Utils.showNotification(`Switched to ${CONFIG.scenarios[scenario].name} scenario`, 'success');
        });
    },

    /**
     * Initialize input controls
     */
    initializeInputs() {
        const container = document.getElementById('portfolio-inputs');

        const html = `
            <div class="grid grid-2">
                ${CONFIG.years.map(year => `
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">${year} Portfolio</h4>
                        </div>
                        <div class="card-body">
                            ${Object.keys(CONFIG.finance.products).map(product => `
                                <div class="form-group">
                                    <label class="form-label">
                                        ${CONFIG.finance.products[product].icon} ${CONFIG.finance.products[product].name}
                                    </label>
                                    <input
                                        type="number"
                                        class="form-input"
                                        id="finance-${product}-${year}"
                                        value="${this.state.portfolio[year][product]}"
                                        min="0"
                                        step="5"
                                        data-year="${year}"
                                        data-product="${product}"
                                    >
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;

        // Add event listeners
        container.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('input', Utils.debounce(() => {
                const year = parseInt(input.dataset.year);
                const product = input.dataset.product;
                const value = parseInt(input.value) || 0;

                this.state.portfolio[year][product] = value;
                this.calculateProjections();
                this.updateDashboard();
            }, 500));
        });
    },

    /**
     * Calculate projections
     */
    calculateProjections() {
        this.state.projections = Calculator.calculateFinanceProjections(
            this.state.portfolio,
            this.state.scenario
        );
    },

    /**
     * Update dashboard with new data
     */
    updateDashboard() {
        if (!this.state.projections) return;

        // Update KPIs
        this.updateKPIs();

        // Update charts
        this.updateCharts();
    },

    /**
     * Update KPIs
     */
    updateKPIs() {
        const proj = this.state.projections;

        document.getElementById('total-revenue').textContent = Utils.formatCurrency(proj.total.revenue, true);
        document.getElementById('total-profit').textContent = Utils.formatCurrency(proj.total.profit, true);

        const avgMargin = Utils.average(CONFIG.years.map(year => proj.byYear[year].margin)) * 100;
        document.getElementById('avg-margin').textContent = Utils.formatPercent(avgMargin / 100, 1);

        const totalContracts = CONFIG.years.reduce((sum, year) =>
            sum + this.calculateTotalPortfolio(this.state.portfolio[year]), 0
        );
        document.getElementById('total-contracts').textContent = Utils.formatNumber(totalContracts);
    },

    /**
     * Update all charts
     */
    updateCharts() {
        const proj = this.state.projections;

        // Revenue & Profit chart
        this.createRevenueProfitChart(proj);

        // Margin chart
        this.createMarginChart(proj);

        // Portfolio mix chart
        this.createPortfolioMixChart();

        // Portfolio growth chart
        this.createPortfolioGrowthChart();
    },

    /**
     * Create revenue and profit chart
     */
    createRevenueProfitChart(proj) {
        const canvasId = 'revenue-profit-chart';
        Charts.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const chartData = {
            labels: CONFIG.years,
            datasets: [
                {
                    label: 'Revenue',
                    data: CONFIG.years.map(year => proj.byYear[year].revenue),
                    borderColor: CONFIG.charts.colors.primary,
                    backgroundColor: 'rgba(26, 54, 93, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    yAxisID: 'y'
                },
                {
                    label: 'Profit',
                    data: CONFIG.years.map(year => proj.byYear[year].profit),
                    borderColor: CONFIG.charts.colors.success,
                    backgroundColor: 'rgba(56, 161, 105, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    yAxisID: 'y'
                }
            ]
        };

        const chartOptions = {
            ...CONFIG.charts.defaultOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => Utils.formatCurrency(value, true)
                    }
                }
            },
            plugins: {
                ...CONFIG.charts.defaultOptions.plugins,
                tooltip: {
                    ...CONFIG.charts.defaultOptions.plugins.tooltip,
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: ${Utils.formatCurrency(context.parsed.y)}`;
                        }
                    }
                }
            }
        };

        Charts.instances[canvasId] = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    },

    /**
     * Create margin chart
     */
    createMarginChart(proj) {
        const canvasId = 'margin-chart';
        Charts.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const chartData = {
            labels: CONFIG.years,
            datasets: [{
                label: 'Profit Margin',
                data: CONFIG.years.map(year => proj.byYear[year].margin * 100),
                borderColor: CONFIG.charts.colors.accent,
                backgroundColor: 'rgba(49, 151, 149, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 3
            }]
        };

        const chartOptions = {
            ...CONFIG.charts.defaultOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: (value) => value + '%'
                    }
                }
            }
        };

        Charts.instances[canvasId] = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    },

    /**
     * Create portfolio mix chart
     */
    createPortfolioMixChart() {
        const canvasId = 'portfolio-mix-chart';
        Charts.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const portfolio2025 = this.state.portfolio[2025];

        const chartData = {
            labels: Object.keys(CONFIG.finance.products).map(k => CONFIG.finance.products[k].name),
            datasets: [{
                data: Object.values(portfolio2025),
                backgroundColor: [
                    CONFIG.charts.colors.primary,
                    CONFIG.charts.colors.accent,
                    CONFIG.charts.colors.finance
                ],
                borderWidth: 2
            }]
        };

        Charts.instances[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: CONFIG.charts.defaultOptions
        });
    },

    /**
     * Create portfolio growth chart
     */
    createPortfolioGrowthChart() {
        const canvasId = 'portfolio-growth-chart';
        Charts.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const datasets = Object.keys(CONFIG.finance.products).map((product, index) => ({
            label: CONFIG.finance.products[product].name,
            data: CONFIG.years.map(year => this.state.portfolio[year][product]),
            backgroundColor: Charts.generateColorFromIndex(index),
            borderColor: Charts.generateColorFromIndex(index),
            borderWidth: 2
        }));

        const chartData = {
            labels: CONFIG.years,
            datasets
        };

        const chartOptions = {
            ...CONFIG.charts.defaultOptions,
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true }
            }
        };

        Charts.instances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });
    },

    /**
     * Calculate total portfolio size
     */
    calculateTotalPortfolio(portfolio) {
        if (!portfolio) return 0;
        return Object.values(portfolio).reduce((sum, val) => sum + val, 0);
    },

    /**
     * Get current stats for quick stats bar
     */
    getCurrentStats() {
        if (!this.state.projections) return null;

        const currentYear = CONFIG.years[0];
        const totalPortfolio = this.calculateTotalPortfolio(this.state.portfolio[currentYear]);

        return {
            totalFleet: totalPortfolio,
            annualRevenue: this.state.projections.byYear[currentYear].revenue,
            utilizationRate: 0.95,
            ebitdaMargin: this.state.projections.byYear[currentYear].margin
        };
    },

    /**
     * Export to CSV
     */
    exportToCSV() {
        if (!this.state.projections) return;

        const data = CONFIG.years.map(year => ({
            Year: year,
            Revenue: this.state.projections.byYear[year].revenue,
            Costs: this.state.projections.byYear[year].costs,
            Profit: this.state.projections.byYear[year].profit,
            'Margin %': (this.state.projections.byYear[year].margin * 100).toFixed(2),
            'Equipment Loans': this.state.portfolio[year].equipmentLoan,
            'Leases': this.state.portfolio[year].lease,
            'Lines of Credit': this.state.portfolio[year].lineOfCredit
        }));

        Utils.exportToCSV(data, `blue-capital-projections-${Date.now()}.csv`);
        Utils.showNotification('Exported to CSV successfully!', 'success');
    },

    /**
     * Export to JSON
     */
    exportToJSON() {
        const exportData = {
            business: 'Blue Capital Equipment Finance',
            scenario: this.state.scenario,
            portfolio: this.state.portfolio,
            projections: this.state.projections,
            exportDate: new Date().toISOString()
        };

        Utils.exportToJSON(exportData, `blue-capital-full-${Date.now()}.json`);
        Utils.showNotification('Exported to JSON successfully!', 'success');
    }
};

// Make globally available
window.BlueCapital = BlueCapital;
