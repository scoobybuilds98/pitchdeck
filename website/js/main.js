/* ============================================
   BUSINESS PROJECTIONS PLATFORM - MAIN
   Application Entry Point
   ============================================ */

// Application State
const AppState = {
    currentBusiness: 'mainland-northland',
    currentScenario: 'moderate',
    isLoading: false,
    data: {}
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Show loading screen
    showLoading();

    // Setup event listeners
    setupEventListeners();

    // Load saved state from localStorage
    loadSavedState();

    // Load default business
    setTimeout(() => {
        loadBusiness(AppState.currentBusiness);
        hideLoading();
    }, 1000);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Business tab selector
    const businessTabs = document.querySelectorAll('.business-tab:not(.disabled)');
    businessTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const business = tab.dataset.business;
            if (business) {
                selectBusiness(business);
            }
        });
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Handle navigation
            const href = link.getAttribute('href');
            if (href === '#home') {
                scrollToTop();
            } else if (href === '#about') {
                Utils.showNotification('About section coming soon!', 'info');
            } else if (href === '#contact') {
                Utils.showNotification('Contact section coming soon!', 'info');
            }
        });
    });

    // Window scroll for sticky stats bar
    let lastScroll = 0;
    window.addEventListener('scroll', Utils.debounce(() => {
        const quickStatsBar = document.getElementById('quick-stats-bar');
        const currentScroll = window.pageYOffset;

        if (currentScroll > 600 && currentScroll > lastScroll) {
            // Scrolling down and past threshold
            Utils.dom.show(quickStatsBar);
        } else if (currentScroll < 400) {
            // Scrolled back to top
            Utils.dom.hide(quickStatsBar);
        }

        lastScroll = currentScroll;
    }, 100));

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + S to save state
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveState();
            Utils.showNotification('State saved!', 'success');
        }

        // Ctrl/Cmd + E to export
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            exportData();
        }
    });
}

/**
 * Select a business
 * @param {string} businessId - Business identifier
 */
function selectBusiness(businessId) {
    if (AppState.isLoading || AppState.currentBusiness === businessId) {
        return;
    }

    // Update active tab
    document.querySelectorAll('.business-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.business === businessId) {
            tab.classList.add('active');
        }
    });

    // Update state
    AppState.currentBusiness = businessId;

    // Load business data
    loadBusiness(businessId);

    // Save state
    saveState();

    // Analytics
    console.log(`Switched to business: ${businessId}`);
}

/**
 * Load business data and render dashboard
 * @param {string} businessId - Business identifier
 */
function loadBusiness(businessId) {
    showLoading();

    // Clear current dashboard
    const dashboardContainer = document.getElementById('dashboard-container');
    Utils.dom.empty(dashboardContainer);

    // Load appropriate business module
    setTimeout(() => {
        try {
            if (businessId === 'mainland-northland') {
                if (typeof MainlandNorthland !== 'undefined') {
                    MainlandNorthland.render(dashboardContainer);
                    updateQuickStats(MainlandNorthland.getCurrentStats());
                } else {
                    showError('Mainland & Northland module not loaded');
                }
            } else if (businessId === 'blue-capital') {
                if (typeof BlueCapital !== 'undefined') {
                    BlueCapital.render(dashboardContainer);
                    updateQuickStats(BlueCapital.getCurrentStats());
                } else {
                    showError('Blue Capital module not loaded');
                }
            } else {
                showError(`Unknown business: ${businessId}`);
            }
        } catch (error) {
            console.error('Error loading business:', error);
            showError('Error loading business data');
        } finally {
            hideLoading();
        }
    }, 500);
}

/**
 * Update quick stats bar
 * @param {Object} stats - Statistics object
 */
function updateQuickStats(stats) {
    if (!stats) return;

    const elements = {
        totalFleet: document.getElementById('total-fleet'),
        annualRevenue: document.getElementById('annual-revenue'),
        utilizationRate: document.getElementById('utilization-rate'),
        ebitdaMargin: document.getElementById('ebitda-margin')
    };

    if (elements.totalFleet) {
        elements.totalFleet.textContent = Utils.formatNumber(stats.totalFleet || 0);
    }

    if (elements.annualRevenue) {
        elements.annualRevenue.textContent = Utils.formatCurrency(stats.annualRevenue || 0, true);
    }

    if (elements.utilizationRate) {
        elements.utilizationRate.textContent = Utils.formatPercent(stats.utilizationRate || 0, 0);
    }

    if (elements.ebitdaMargin) {
        elements.ebitdaMargin.textContent = Utils.formatPercent(stats.ebitdaMargin || 0, 1);
    }
}

/**
 * Show loading screen
 */
function showLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
    AppState.isLoading = true;
}

/**
 * Hide loading screen
 */
function hideLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
    AppState.isLoading = false;
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    const dashboardContainer = document.getElementById('dashboard-container');
    dashboardContainer.innerHTML = `
        <div class="container">
            <div class="alert alert-danger">
                <h3>Error</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="location.reload()">Reload Page</button>
            </div>
        </div>
    `;
    Utils.showNotification(message, 'error');
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Save application state to localStorage
 */
function saveState() {
    const state = {
        currentBusiness: AppState.currentBusiness,
        currentScenario: AppState.currentScenario,
        timestamp: Date.now()
    };

    Utils.storage.set('appState', state);
    console.log('State saved:', state);
}

/**
 * Load saved state from localStorage
 */
function loadSavedState() {
    const state = Utils.storage.get('appState');

    if (state) {
        AppState.currentBusiness = state.currentBusiness || 'mainland-northland';
        AppState.currentScenario = state.currentScenario || 'moderate';
        console.log('State loaded:', state);
    }
}

/**
 * Export all data
 */
function exportData() {
    try {
        const exportData = {
            business: AppState.currentBusiness,
            scenario: AppState.currentScenario,
            data: AppState.data,
            exportDate: new Date().toISOString(),
            config: {
                years: CONFIG.years,
                currency: CONFIG.app.currency
            }
        };

        Utils.exportToJSON(exportData, `business-projections-${Date.now()}.json`);
        Utils.showNotification('Data exported successfully!', 'success');
    } catch (error) {
        console.error('Export error:', error);
        Utils.showNotification('Error exporting data', 'error');
    }
}

/**
 * Change scenario
 * @param {string} scenario - Scenario name
 */
function changeScenario(scenario) {
    if (!CONFIG.scenarios[scenario]) {
        console.error(`Unknown scenario: ${scenario}`);
        return;
    }

    AppState.currentScenario = scenario;
    saveState();

    // Reload current business with new scenario
    loadBusiness(AppState.currentBusiness);

    Utils.showNotification(`Switched to ${CONFIG.scenarios[scenario].name} scenario`, 'info');
}

/**
 * Create scenario selector
 * @param {HTMLElement} container - Container element
 * @param {Function} callback - Callback function when scenario changes
 */
function createScenarioSelector(container, callback) {
    const selectorHtml = `
        <div class="form-group">
            <label class="form-label">Projection Scenario</label>
            <div class="scenario-selector">
                ${Object.keys(CONFIG.scenarios).map(key => {
                    const scenario = CONFIG.scenarios[key];
                    return `
                        <button
                            class="btn btn-outline scenario-btn ${key === AppState.currentScenario ? 'active' : ''}"
                            data-scenario="${key}"
                        >
                            <strong>${scenario.name}</strong>
                            <small>${scenario.description}</small>
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    container.innerHTML = selectorHtml;

    // Add event listeners
    container.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const scenario = btn.dataset.scenario;
            container.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            AppState.currentScenario = scenario;
            if (callback) {
                callback(scenario);
            }
        });
    });
}

/**
 * Create input panel
 * @param {HTMLElement} container - Container element
 * @param {Object} config - Input configuration
 * @param {Function} callback - Callback function when values change
 */
function createInputPanel(container, config, callback) {
    const inputs = config.inputs.map(input => {
        if (input.type === 'number') {
            return `
                <div class="form-group">
                    <label class="form-label ${input.required ? 'required' : ''}">${input.label}</label>
                    <input
                        type="number"
                        class="form-input"
                        id="${input.id}"
                        value="${input.defaultValue || 0}"
                        min="${input.min || 0}"
                        max="${input.max || ''}"
                        step="${input.step || 1}"
                        ${input.required ? 'required' : ''}
                    >
                    ${input.help ? `<span class="form-help">${input.help}</span>` : ''}
                </div>
            `;
        } else if (input.type === 'range') {
            return `
                <div class="form-group">
                    <label class="form-label">
                        ${input.label}
                        <span id="${input.id}-value">${input.defaultValue || 0}${input.unit || ''}</span>
                    </label>
                    <input
                        type="range"
                        class="form-range"
                        id="${input.id}"
                        value="${input.defaultValue || 0}"
                        min="${input.min || 0}"
                        max="${input.max || 100}"
                        step="${input.step || 1}"
                    >
                    ${input.help ? `<span class="form-help">${input.help}</span>` : ''}
                </div>
            `;
        }
        return '';
    }).join('');

    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${config.title}</h3>
                ${config.subtitle ? `<p class="card-subtitle">${config.subtitle}</p>` : ''}
            </div>
            <div class="card-body">
                ${inputs}
            </div>
        </div>
    `;

    // Add event listeners
    config.inputs.forEach(input => {
        const element = document.getElementById(input.id);
        if (!element) return;

        if (input.type === 'range') {
            const valueDisplay = document.getElementById(`${input.id}-value`);
            element.addEventListener('input', Utils.debounce(() => {
                if (valueDisplay) {
                    valueDisplay.textContent = element.value + (input.unit || '');
                }
                if (callback) {
                    callback(input.id, parseFloat(element.value));
                }
            }, 300));
        } else {
            element.addEventListener('input', Utils.debounce(() => {
                if (callback) {
                    callback(input.id, parseFloat(element.value));
                }
            }, 300));
        }
    });
}

// Make functions globally available
window.AppState = AppState;
window.selectBusiness = selectBusiness;
window.changeScenario = changeScenario;
window.createScenarioSelector = createScenarioSelector;
window.createInputPanel = createInputPanel;
window.updateQuickStats = updateQuickStats;
window.exportData = exportData;

console.log('Business Projections Platform initialized');
