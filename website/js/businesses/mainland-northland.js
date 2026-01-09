/* ============================================
   MAINLAND TRUCK & TRAILER + NORTHLAND EQUIPMENT
   Interactive Dashboard & Projections
   ============================================ */

const MainlandNorthland = {
    // State
    state: {
        transportFleet: Utils.deepClone(CONFIG.transport.defaultFleet),
        constructionFleet: Utils.deepClone(CONFIG.construction.defaultFleet),
        transportSplit: Utils.deepClone(CONFIG.transport.defaultRevenueSplit),
        constructionSplit: Utils.deepClone(CONFIG.construction.defaultRevenueSplit),
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
                    <div class="grid grid-2">
                        <div class="card card-transport">
                            <div class="card-header">
                                <div>
                                    <h3 class="card-title">🚛 Mainland Truck & Trailer</h3>
                                    <p class="card-subtitle">Transport Equipment Rental & Sales</p>
                                </div>
                            </div>
                            <div class="card-body">
                                <p>Leading provider of transport equipment including chassis, dry vans, flatbeds, and refrigerated trailers across Canada.</p>
                                <div class="metric">
                                    <div class="metric-label">2025 Target Fleet</div>
                                    <div class="metric-value">${this.calculateTotalFleet(this.state.transportFleet[2025])}</div>
                                </div>
                            </div>
                        </div>

                        <div class="card card-construction">
                            <div class="card-header">
                                <div>
                                    <h3 class="card-title">🏗️ Northland Equipment</h3>
                                    <p class="card-subtitle">Construction Equipment Official Dealer</p>
                                </div>
                            </div>
                            <div class="card-body">
                                <p>Official dealer for SDLG, CHL, and XCMG construction equipment. Offering excavators, loaders, dozers, cranes, and more.</p>
                                <div style="display: flex; gap: var(--spacing-sm); margin-top: var(--spacing-md);">
                                    <span class="badge badge-sdlg">SDLG</span>
                                    <span class="badge badge-chl">CHL</span>
                                    <span class="badge badge-xcmg">XCMG</span>
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
                                <div class="metric-label">Average EBITDA Margin</div>
                                <div class="metric-value" id="avg-ebitda-margin">0%</div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="metric">
                                <div class="metric-label">Total Capital Required</div>
                                <div class="metric-value" id="total-capital">$0</div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="metric">
                                <div class="metric-label">NPV @ 12%</div>
                                <div class="metric-value" id="npv-value">$0</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Main Charts -->
                <section class="main-charts" style="margin: var(--spacing-3xl) 0;">
                    <h2 class="section-title">Financial Projections</h2>

                    <div class="charts-grid">
                        <div class="chart-card">
                            <div class="chart-header">
                                <div class="chart-title-section">
                                    <h3 class="chart-title">Revenue Projection</h3>
                                    <p class="chart-subtitle">Combined Transport & Construction (2025-2030)</p>
                                </div>
                            </div>
                            <div class="chart-wrapper">
                                <canvas id="revenue-chart"></canvas>
                            </div>
                        </div>

                        <div class="chart-card">
                            <div class="chart-header">
                                <div class="chart-title-section">
                                    <h3 class="chart-title">Division Comparison</h3>
                                    <p class="chart-subtitle">Transport vs Construction Revenue</p>
                                </div>
                            </div>
                            <div class="chart-wrapper">
                                <canvas id="division-chart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="charts-grid">
                        <div class="chart-card">
                            <div class="chart-header">
                                <div class="chart-title-section">
                                    <h3 class="chart-title">EBITDA & Margin</h3>
                                    <p class="chart-subtitle">Profitability Analysis</p>
                                </div>
                            </div>
                            <div class="chart-wrapper">
                                <canvas id="ebitda-chart"></canvas>
                            </div>
                        </div>

                        <div class="chart-card">
                            <div class="chart-header">
                                <div class="chart-title-section">
                                    <h3 class="chart-title">Free Cash Flow</h3>
                                    <p class="chart-subtitle">Annual Cash Generation</p>
                                </div>
                            </div>
                            <div class="chart-wrapper">
                                <canvas id="fcf-chart"></canvas>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Fleet Input Controls -->
                <section class="fleet-controls" style="margin: var(--spacing-3xl) 0;">
                    <h2 class="section-title">Fleet Planning & Configuration</h2>
                    <p class="section-subtitle">Adjust fleet sizes and revenue splits to see real-time projection updates</p>

                    <div class="tabs">
                        <button class="tab active" data-tab="transport">Transport Equipment</button>
                        <button class="tab" data-tab="construction">Construction Equipment</button>
                        <button class="tab" data-tab="revenue-split">Revenue Splits</button>
                    </div>

                    <!-- Transport Tab -->
                    <div class="tab-content active" id="transport-tab">
                        <div id="transport-inputs"></div>
                    </div>

                    <!-- Construction Tab -->
                    <div class="tab-content" id="construction-tab">
                        <div id="construction-inputs"></div>
                    </div>

                    <!-- Revenue Split Tab -->
                    <div class="tab-content" id="revenue-split-tab">
                        <div class="grid grid-2">
                            <div id="transport-split-inputs"></div>
                            <div id="construction-split-inputs"></div>
                        </div>
                    </div>
                </section>

                <!-- Detailed Charts -->
                <section class="detailed-charts" style="margin: var(--spacing-3xl) 0;">
                    <h2 class="section-title">Detailed Analytics</h2>

                    <div class="charts-grid">
                        <div class="chart-card chart-transport">
                            <div class="chart-header">
                                <div class="chart-title-section">
                                    <h3 class="chart-title">Transport Fleet Composition</h3>
                                    <p class="chart-subtitle">2025 Starting Fleet</p>
                                </div>
                            </div>
                            <div class="chart-wrapper chart-medium">
                                <canvas id="transport-fleet-chart"></canvas>
                            </div>
                        </div>

                        <div class="chart-card chart-construction">
                            <div class="chart-header">
                                <div class="chart-title-section">
                                    <h3 class="chart-title">Construction Fleet Composition</h3>
                                    <p class="chart-subtitle">2025 Starting Fleet</p>
                                </div>
                            </div>
                            <div class="chart-wrapper chart-medium">
                                <canvas id="construction-fleet-chart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="chart-card chart-construction">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Construction Revenue by Brand</h3>
                                <p class="chart-subtitle">SDLG, CHL, XCMG Performance</p>
                            </div>
                        </div>
                        <div class="chart-wrapper">
                            <canvas id="brand-revenue-chart"></canvas>
                        </div>
                    </div>

                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title-section">
                                <h3 class="chart-title">Capital Requirements</h3>
                                <p class="chart-subtitle">Annual Investment Needs</p>
                            </div>
                        </div>
                        <div class="chart-wrapper">
                            <canvas id="capital-chart"></canvas>
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
                                <button class="btn btn-primary" onclick="MainlandNorthland.exportToCSV()">
                                    📊 Export to CSV
                                </button>
                                <button class="btn btn-primary" onclick="MainlandNorthland.exportToJSON()">
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
        this.initializeTabs();
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
     * Initialize tabs
     */
    initializeTabs() {
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;

                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${targetTab}-tab`) {
                        content.classList.add('active');
                    }
                });
            });
        });
    },

    /**
     * Initialize input controls
     */
    initializeInputs() {
        // Transport inputs
        this.createTransportInputs();

        // Construction inputs
        this.createConstructionInputs();

        // Revenue split inputs
        this.createRevenueSplitInputs();
    },

    /**
     * Create transport equipment inputs
     */
    createTransportInputs() {
        const container = document.getElementById('transport-inputs');
        const html = `
            <div class="grid grid-2">
                ${CONFIG.years.map(year => `
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">${year} Fleet</h4>
                        </div>
                        <div class="card-body">
                            ${Object.keys(CONFIG.transport.types).map(type => `
                                <div class="form-group">
                                    <label class="form-label">
                                        ${CONFIG.transport.types[type].icon} ${CONFIG.transport.types[type].name}
                                    </label>
                                    <input
                                        type="number"
                                        class="form-input"
                                        id="transport-${type}-${year}"
                                        value="${this.state.transportFleet[year][type]}"
                                        min="0"
                                        step="1"
                                        data-year="${year}"
                                        data-type="${type}"
                                        data-division="transport"
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
                const type = input.dataset.type;
                const value = parseInt(input.value) || 0;

                this.state.transportFleet[year][type] = value;
                this.calculateProjections();
                this.updateDashboard();
            }, 500));
        });
    },

    /**
     * Create construction equipment inputs
     */
    createConstructionInputs() {
        const container = document.getElementById('construction-inputs');
        const html = `
            <div class="grid grid-2">
                ${CONFIG.years.map(year => `
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">${year} Fleet</h4>
                        </div>
                        <div class="card-body">
                            ${['sdlg', 'chl', 'xcmg'].map(brand => `
                                <h5 style="margin-top: var(--spacing-md); margin-bottom: var(--spacing-sm);">
                                    <span class="badge badge-${brand}">${brand.toUpperCase()}</span>
                                </h5>
                                ${Object.keys(CONFIG.construction[brand]).map(type => `
                                    <div class="form-group">
                                        <label class="form-label">
                                            ${CONFIG.construction[brand][type].icon} ${CONFIG.construction[brand][type].name}
                                        </label>
                                        <input
                                            type="number"
                                            class="form-input"
                                            id="construction-${brand}-${type}-${year}"
                                            value="${this.state.constructionFleet[year][brand][type]}"
                                            min="0"
                                            step="1"
                                            data-year="${year}"
                                            data-brand="${brand}"
                                            data-type="${type}"
                                            data-division="construction"
                                        >
                                    </div>
                                `).join('')}
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
                const brand = input.dataset.brand;
                const type = input.dataset.type;
                const value = parseInt(input.value) || 0;

                this.state.constructionFleet[year][brand][type] = value;
                this.calculateProjections();
                this.updateDashboard();
            }, 500));
        });
    },

    /**
     * Create revenue split inputs
     */
    createRevenueSplitInputs() {
        const transportContainer = document.getElementById('transport-split-inputs');
        const constructionContainer = document.getElementById('construction-split-inputs');

        // Transport split
        transportContainer.innerHTML = this.createSplitInputHTML('Transport', this.state.transportSplit, 'transport');

        // Construction split
        constructionContainer.innerHTML = this.createSplitInputHTML('Construction', this.state.constructionSplit, 'construction');

        // Add event listeners
        this.addSplitInputListeners('transport');
        this.addSplitInputListeners('construction');
    },

    /**
     * Create split input HTML
     */
    createSplitInputHTML(title, split, division) {
        return `
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">${title} Revenue Split</h4>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label class="form-label">
                            Rental: <span id="${division}-rental-value">${split.rental}%</span>
                        </label>
                        <input
                            type="range"
                            class="form-range"
                            id="${division}-rental"
                            value="${split.rental}"
                            min="0"
                            max="100"
                            step="5"
                        >
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            Lease: <span id="${division}-lease-value">${split.lease}%</span>
                        </label>
                        <input
                            type="range"
                            class="form-range"
                            id="${division}-lease"
                            value="${split.lease}"
                            min="0"
                            max="100"
                            step="5"
                        >
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            Sale: <span id="${division}-sale-value">${split.sale}%</span>
                        </label>
                        <input
                            type="range"
                            class="form-range"
                            id="${division}-sale"
                            value="${split.sale}"
                            min="0"
                            max="100"
                            step="5"
                        >
                    </div>
                    <div id="${division}-split-error" class="form-error" style="display: none;">
                        Total must equal 100%
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Add split input listeners
     */
    addSplitInputListeners(division) {
        ['rental', 'lease', 'sale'].forEach(type => {
            const input = document.getElementById(`${division}-${type}`);
            const valueDisplay = document.getElementById(`${division}-${type}-value`);

            input.addEventListener('input', () => {
                const value = parseInt(input.value);
                valueDisplay.textContent = `${value}%`;

                // Get all values
                const rental = parseInt(document.getElementById(`${division}-rental`).value);
                const lease = parseInt(document.getElementById(`${division}-lease`).value);
                const sale = parseInt(document.getElementById(`${division}-sale`).value);

                const total = rental + lease + sale;
                const errorElement = document.getElementById(`${division}-split-error`);

                if (total !== 100) {
                    errorElement.style.display = 'block';
                } else {
                    errorElement.style.display = 'none';

                    // Update state
                    const splitState = division === 'transport' ? this.state.transportSplit : this.state.constructionSplit;
                    splitState.rental = rental;
                    splitState.lease = lease;
                    splitState.sale = sale;

                    // Recalculate
                    this.calculateProjections();
                    this.updateDashboard();
                }
            });
        });
    },

    /**
     * Calculate projections
     */
    calculateProjections() {
        this.state.projections = Calculator.calculateCombinedProjections(
            this.state.transportFleet,
            this.state.constructionFleet,
            this.state.transportSplit,
            this.state.constructionSplit,
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

        document.getElementById('total-revenue').textContent = Utils.formatCurrency(proj.revenue.total, true);

        const avgMargin = Utils.average(CONFIG.years.map(year => proj.ebitda.byYear[year].marginPercent));
        document.getElementById('avg-ebitda-margin').textContent = Utils.formatPercent(avgMargin / 100, 1);

        document.getElementById('total-capital').textContent = Utils.formatCurrency(proj.capitalRequirements.total, true);

        document.getElementById('npv-value').textContent = Utils.formatCurrency(proj.valuation.npv, true);
    },

    /**
     * Update all charts
     */
    updateCharts() {
        const proj = this.state.projections;

        // Revenue chart
        Charts.createRevenueChart('revenue-chart', proj.revenue);

        // Division comparison
        Charts.createDivisionComparisonChart('division-chart', proj.revenue);

        // EBITDA chart
        Charts.createEBITDAChart('ebitda-chart', proj.ebitda);

        // FCF chart
        Charts.createFCFChart('fcf-chart', proj.fcf);

        // Fleet composition charts
        Charts.createFleetCompositionChart('transport-fleet-chart', this.state.transportFleet[2025], 'transport');
        Charts.createFleetCompositionChart('construction-fleet-chart', this.state.constructionFleet[2025], 'construction');

        // Brand revenue chart
        Charts.createBrandRevenueChart('brand-revenue-chart', proj.divisions.construction.revenue);

        // Capital requirements
        Charts.createCapitalRequirementsChart('capital-chart', proj.capitalRequirements);
    },

    /**
     * Calculate total fleet size
     */
    calculateTotalFleet(fleet) {
        if (!fleet) return 0;
        return Object.values(fleet).reduce((sum, val) => {
            if (typeof val === 'object') {
                return sum + Object.values(val).reduce((s, v) => s + v, 0);
            }
            return sum + val;
        }, 0);
    },

    /**
     * Get current stats for quick stats bar
     */
    getCurrentStats() {
        if (!this.state.projections) return null;

        const currentYear = CONFIG.years[0];
        const totalTransportFleet = this.calculateTotalFleet(this.state.transportFleet[currentYear]);
        const totalConstructionFleet = this.calculateTotalFleet(this.state.constructionFleet[currentYear]);

        return {
            totalFleet: totalTransportFleet + totalConstructionFleet,
            annualRevenue: this.state.projections.revenue.byYear[currentYear].total,
            utilizationRate: 0.88, // Average utilization
            ebitdaMargin: this.state.projections.ebitda.byYear[currentYear].margin
        };
    },

    /**
     * Export to CSV
     */
    exportToCSV() {
        if (!this.state.projections) return;

        const data = CONFIG.years.map(year => ({
            Year: year,
            'Transport Revenue': this.state.projections.revenue.byYear[year].transport,
            'Construction Revenue': this.state.projections.revenue.byYear[year].construction,
            'Total Revenue': this.state.projections.revenue.byYear[year].total,
            'EBITDA': this.state.projections.ebitda.byYear[year].value,
            'EBITDA Margin %': this.state.projections.ebitda.byYear[year].marginPercent.toFixed(2),
            'FCF': this.state.projections.fcf.byYear[year].fcf,
            'Capital Required': this.state.projections.capitalRequirements.byYear[year]
        }));

        Utils.exportToCSV(data, `mainland-northland-projections-${Date.now()}.csv`);
        Utils.showNotification('Exported to CSV successfully!', 'success');
    },

    /**
     * Export to JSON
     */
    exportToJSON() {
        const exportData = {
            business: 'Mainland Truck & Trailer + Northland Equipment',
            scenario: this.state.scenario,
            fleet: {
                transport: this.state.transportFleet,
                construction: this.state.constructionFleet
            },
            revenueSplit: {
                transport: this.state.transportSplit,
                construction: this.state.constructionSplit
            },
            projections: this.state.projections,
            exportDate: new Date().toISOString()
        };

        Utils.exportToJSON(exportData, `mainland-northland-full-${Date.now()}.json`);
        Utils.showNotification('Exported to JSON successfully!', 'success');
    }
};

// Make globally available
window.MainlandNorthland = MainlandNorthland;
