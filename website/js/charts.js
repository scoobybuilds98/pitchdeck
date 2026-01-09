/* ============================================
   BUSINESS PROJECTIONS PLATFORM - CHARTS
   Chart.js Wrapper & Visualization Functions
   ============================================ */

const Charts = {
    instances: {}, // Store chart instances for updates

    /**
     * Destroy existing chart if it exists
     * @param {string} canvasId - Canvas element ID
     */
    destroy(canvasId) {
        if (this.instances[canvasId]) {
            this.instances[canvasId].destroy();
            delete this.instances[canvasId];
        }
    },

    /**
     * Create revenue projection line chart
     * @param {string} canvasId - Canvas element ID
     * @param {Object} data - Revenue data
     * @param {Object} options - Additional options
     * @returns {Chart} Chart instance
     */
    createRevenueChart(canvasId, data, options = {}) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const chartData = {
            labels: CONFIG.years,
            datasets: [{
                label: 'Total Revenue',
                data: CONFIG.years.map(year => data.byYear[year]?.total || 0),
                borderColor: CONFIG.charts.colors.primary,
                backgroundColor: 'rgba(26, 54, 93, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3
            }]
        };

        const chartOptions = {
            ...CONFIG.charts.defaultOptions,
            ...options,
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
                title: {
                    display: true,
                    text: 'Revenue Projection (2025-2030)',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    ...CONFIG.charts.defaultOptions.plugins.tooltip,
                    callbacks: {
                        label: (context) => {
                            return `Revenue: ${Utils.formatCurrency(context.parsed.y)}`;
                        }
                    }
                }
            }
        };

        this.instances[canvasId] = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });

        return this.instances[canvasId];
    },

    /**
     * Create division comparison chart (Transport vs Construction)
     * @param {string} canvasId - Canvas element ID
     * @param {Object} data - Combined revenue data
     * @returns {Chart} Chart instance
     */
    createDivisionComparisonChart(canvasId, data) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const chartData = {
            labels: CONFIG.years,
            datasets: [
                {
                    label: 'Transport Equipment',
                    data: CONFIG.years.map(year => data.byYear[year]?.transport || 0),
                    backgroundColor: CONFIG.charts.colors.transport,
                    borderColor: CONFIG.charts.colors.transport,
                    borderWidth: 2
                },
                {
                    label: 'Construction Equipment',
                    data: CONFIG.years.map(year => data.byYear[year]?.construction || 0),
                    backgroundColor: CONFIG.charts.colors.construction,
                    borderColor: CONFIG.charts.colors.construction,
                    borderWidth: 2
                }
            ]
        };

        const chartOptions = {
            ...CONFIG.charts.defaultOptions,
            scales: {
                x: { stacked: true },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => Utils.formatCurrency(value, true)
                    }
                }
            },
            plugins: {
                ...CONFIG.charts.defaultOptions.plugins,
                title: {
                    display: true,
                    text: 'Revenue by Division',
                    font: { size: 16, weight: 'bold' }
                },
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

        this.instances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });

        return this.instances[canvasId];
    },

    /**
     * Create EBITDA margin chart
     * @param {string} canvasId - Canvas element ID
     * @param {Object} data - EBITDA data
     * @returns {Chart} Chart instance
     */
    createEBITDAChart(canvasId, data) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const chartData = {
            labels: CONFIG.years,
            datasets: [
                {
                    label: 'EBITDA',
                    data: CONFIG.years.map(year => data.byYear[year]?.value || 0),
                    backgroundColor: 'rgba(56, 161, 105, 0.2)',
                    borderColor: CONFIG.charts.colors.success,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'EBITDA Margin %',
                    data: CONFIG.years.map(year => (data.byYear[year]?.marginPercent || 0)),
                    backgroundColor: 'rgba(49, 151, 149, 0.2)',
                    borderColor: CONFIG.charts.colors.accent,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        };

        const chartOptions = {
            ...CONFIG.charts.defaultOptions,
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => Utils.formatCurrency(value, true)
                    }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        callback: (value) => value + '%'
                    }
                }
            },
            plugins: {
                ...CONFIG.charts.defaultOptions.plugins,
                title: {
                    display: true,
                    text: 'EBITDA & Margin Analysis',
                    font: { size: 16, weight: 'bold' }
                }
            }
        };

        this.instances[canvasId] = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });

        return this.instances[canvasId];
    },

    /**
     * Create equipment fleet composition chart
     * @param {string} canvasId - Canvas element ID
     * @param {Object} fleet - Fleet data for a specific year
     * @param {string} division - Division type ('transport' or 'construction')
     * @returns {Chart} Chart instance
     */
    createFleetCompositionChart(canvasId, fleet, division = 'transport') {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        let labels = [];
        let data = [];
        let colors = [];

        if (division === 'transport') {
            Object.keys(CONFIG.transport.types).forEach(type => {
                labels.push(CONFIG.transport.types[type].name);
                data.push(fleet[type] || 0);
                colors.push(this.generateColorFromIndex(labels.length - 1));
            });
        } else if (division === 'construction') {
            ['sdlg', 'chl', 'xcmg'].forEach(brand => {
                const brandFleet = fleet[brand] || {};
                const brandConfig = CONFIG.construction[brand];
                Object.keys(brandConfig).forEach(type => {
                    labels.push(brandConfig[type].name);
                    data.push(brandFleet[type] || 0);
                    colors.push(brandConfig[type].brandColor);
                });
            });
        }

        const chartData = {
            labels,
            datasets: [{
                data,
                backgroundColor: colors,
                borderColor: colors.map(c => c),
                borderWidth: 2
            }]
        };

        const chartOptions = {
            ...CONFIG.charts.defaultOptions,
            plugins: {
                ...CONFIG.charts.defaultOptions.plugins,
                title: {
                    display: true,
                    text: `Fleet Composition - ${division.charAt(0).toUpperCase() + division.slice(1)}`,
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    ...CONFIG.charts.defaultOptions.plugins.tooltip,
                    callbacks: {
                        label: (context) => {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percent = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                            return `${context.label}: ${context.parsed} units (${percent}%)`;
                        }
                    }
                }
            }
        };

        this.instances[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: chartOptions
        });

        return this.instances[canvasId];
    },

    /**
     * Create capital requirements chart
     * @param {string} canvasId - Canvas element ID
     * @param {Object} data - Capital requirements data
     * @returns {Chart} Chart instance
     */
    createCapitalRequirementsChart(canvasId, data) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const chartData = {
            labels: CONFIG.years,
            datasets: [{
                label: 'Capital Requirements',
                data: CONFIG.years.map(year => data.byYear[year] || 0),
                backgroundColor: CONFIG.charts.colors.warning,
                borderColor: CONFIG.charts.colors.warning,
                borderWidth: 2
            }]
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
                title: {
                    display: true,
                    text: 'Annual Capital Requirements',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    ...CONFIG.charts.defaultOptions.plugins.tooltip,
                    callbacks: {
                        label: (context) => {
                            return `Capital: ${Utils.formatCurrency(context.parsed.y)}`;
                        }
                    }
                }
            }
        };

        this.instances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });

        return this.instances[canvasId];
    },

    /**
     * Create free cash flow waterfall chart
     * @param {string} canvasId - Canvas element ID
     * @param {Object} data - FCF data
     * @returns {Chart} Chart instance
     */
    createFCFChart(canvasId, data) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const chartData = {
            labels: CONFIG.years,
            datasets: [{
                label: 'Free Cash Flow',
                data: CONFIG.years.map(year => data.byYear[year]?.fcf || 0),
                backgroundColor: CONFIG.years.map(year =>
                    (data.byYear[year]?.fcf || 0) >= 0 ? CONFIG.charts.colors.success : CONFIG.charts.colors.danger
                ),
                borderColor: CONFIG.years.map(year =>
                    (data.byYear[year]?.fcf || 0) >= 0 ? CONFIG.charts.colors.success : CONFIG.charts.colors.danger
                ),
                borderWidth: 2
            }]
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
                title: {
                    display: true,
                    text: 'Free Cash Flow Projection',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    ...CONFIG.charts.defaultOptions.plugins.tooltip,
                    callbacks: {
                        label: (context) => {
                            return `FCF: ${Utils.formatCurrency(context.parsed.y)}`;
                        }
                    }
                }
            }
        };

        this.instances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });

        return this.instances[canvasId];
    },

    /**
     * Create brand revenue breakdown (for construction)
     * @param {string} canvasId - Canvas element ID
     * @param {Object} data - Brand revenue data
     * @returns {Chart} Chart instance
     */
    createBrandRevenueChart(canvasId, data) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const chartData = {
            labels: CONFIG.years,
            datasets: [
                {
                    label: 'SDLG',
                    data: CONFIG.years.map(year => data.byBrand?.sdlg || 0),
                    backgroundColor: CONFIG.charts.colors.sdlg,
                    borderColor: CONFIG.charts.colors.sdlg,
                    borderWidth: 2
                },
                {
                    label: 'CHL',
                    data: CONFIG.years.map(year => data.byBrand?.chl || 0),
                    backgroundColor: CONFIG.charts.colors.chl,
                    borderColor: CONFIG.charts.colors.chl,
                    borderWidth: 2
                },
                {
                    label: 'XCMG',
                    data: CONFIG.years.map(year => data.byBrand?.xcmg || 0),
                    backgroundColor: CONFIG.charts.colors.xcmg,
                    borderColor: CONFIG.charts.colors.xcmg,
                    borderWidth: 2
                }
            ]
        };

        const chartOptions = {
            ...CONFIG.charts.defaultOptions,
            scales: {
                x: { stacked: true },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => Utils.formatCurrency(value, true)
                    }
                }
            },
            plugins: {
                ...CONFIG.charts.defaultOptions.plugins,
                title: {
                    display: true,
                    text: 'Construction Equipment Revenue by Brand',
                    font: { size: 16, weight: 'bold' }
                }
            }
        };

        this.instances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });

        return this.instances[canvasId];
    },

    /**
     * Create utilization rate chart
     * @param {string} canvasId - Canvas element ID
     * @param {Array} utilizationData - Array of utilization rates by year
     * @returns {Chart} Chart instance
     */
    createUtilizationChart(canvasId, utilizationData) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const chartData = {
            labels: CONFIG.years,
            datasets: [{
                label: 'Utilization Rate',
                data: utilizationData,
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
                    min: 0,
                    max: 100,
                    ticks: {
                        callback: (value) => value + '%'
                    }
                }
            },
            plugins: {
                ...CONFIG.charts.defaultOptions.plugins,
                title: {
                    display: true,
                    text: 'Fleet Utilization Rate',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    ...CONFIG.charts.defaultOptions.plugins.tooltip,
                    callbacks: {
                        label: (context) => {
                            return `Utilization: ${context.parsed.y.toFixed(1)}%`;
                        }
                    }
                }
            }
        };

        this.instances[canvasId] = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });

        return this.instances[canvasId];
    },

    /**
     * Create revenue stream breakdown (Rental, Lease, Sale)
     * @param {string} canvasId - Canvas element ID
     * @param {Object} data - Revenue split data
     * @returns {Chart} Chart instance
     */
    createRevenueStreamChart(canvasId, data) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const chartData = {
            labels: ['Rental', 'Lease', 'Sale'],
            datasets: [{
                data: [data.rental || 0, data.lease || 0, data.sale || 0],
                backgroundColor: [
                    CONFIG.charts.colors.primary,
                    CONFIG.charts.colors.accent,
                    CONFIG.charts.colors.success
                ],
                borderWidth: 2
            }]
        };

        const chartOptions = {
            ...CONFIG.charts.defaultOptions,
            plugins: {
                ...CONFIG.charts.defaultOptions.plugins,
                title: {
                    display: true,
                    text: 'Revenue Stream Distribution',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    ...CONFIG.charts.defaultOptions.plugins.tooltip,
                    callbacks: {
                        label: (context) => {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percent = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                            return `${context.label}: ${percent}%`;
                        }
                    }
                }
            }
        };

        this.instances[canvasId] = new Chart(ctx, {
            type: 'pie',
            data: chartData,
            options: chartOptions
        });

        return this.instances[canvasId];
    },

    /**
     * Generate color from index
     * @param {number} index - Color index
     * @returns {string} Hex color
     */
    generateColorFromIndex(index) {
        const colors = [
            CONFIG.charts.colors.primary,
            CONFIG.charts.colors.accent,
            CONFIG.charts.colors.success,
            CONFIG.charts.colors.warning,
            CONFIG.charts.colors.transport,
            CONFIG.charts.colors.construction,
            CONFIG.charts.colors.finance
        ];
        return colors[index % colors.length];
    },

    /**
     * Update chart data
     * @param {string} canvasId - Canvas element ID
     * @param {Object} newData - New data
     */
    updateChart(canvasId, newData) {
        const chart = this.instances[canvasId];
        if (!chart) return;

        chart.data = newData;
        chart.update();
    },

    /**
     * Destroy all charts
     */
    destroyAll() {
        Object.keys(this.instances).forEach(canvasId => {
            this.destroy(canvasId);
        });
    }
};

// Make Charts globally available
window.Charts = Charts;
