# Investment Platform Architecture
## Institutional-Grade Financial Projections Platform

---

## 📋 **Project Overview**

A Bloomberg Terminal-style investment platform for presenting multi-business financial projections to institutional investors. The platform features real-time interactive modeling, comprehensive analytical narratives, and professional data visualization.

**Target Audience**: Institutional investors, private equity firms, multi-billion dollar companies
**Quality Standard**: Investment-grade, institutional quality (no emojis, no "childish" design)
**Key Requirement**: Real-time updates, detailed analysis, professional aesthetics

---

## 🏗️ **File Structure**

```
pitchdeck/
├── website/
│   ├── index.html                          # Main entry point
│   │
│   ├── css/
│   │   ├── main.css                        # Core styles, Bloomberg Terminal theme
│   │   ├── components.css                  # Reusable UI components
│   │   └── charts.css                      # Chart-specific styling
│   │
│   ├── js/
│   │   ├── config.js                       # Global configuration & constants
│   │   ├── utils.js                        # Utility functions (formatting, etc)
│   │   ├── calculator.js                   # Financial calculation engine
│   │   ├── charts.js                       # Chart.js wrapper & helpers
│   │   ├── main.js                         # Application bootstrap
│   │   │
│   │   └── businesses/
│   │       ├── mainland-northland.js       # Mainland Truck & Northland Equipment
│   │       └── blue-capital.js             # Blue Capital Equipment Finance
│   │
│   └── assets/
│       └── (future: logos, images)
│
└── ARCHITECTURE.md                          # This file
```

---

## 📄 **Detailed File Specifications**

### **1. index.html**
**Purpose**: Single-page application entry point
**Size**: ~150 lines

**Structure**:
```html
<!DOCTYPE html>
<html>
<head>
    - Meta tags (viewport, charset)
    - Title: "Investment Portfolio Platform"
    - CSS imports (main.css, components.css, charts.css)
    - Chart.js CDN
</head>
<body>
    <!-- Professional Header -->
    <header class="main-header">
        - Platform title with gradient effect
        - Business selector tabs (Mainland/Northland, Blue Capital)
        - Quick stats bar (real-time metrics)
    </header>

    <!-- Main Content Area -->
    <main id="business-content">
        - Dynamic content rendered by JS modules
        - Each business module controls this area
    </main>

    <!-- Footer -->
    <footer>
        - Data export timestamp
        - Disclaimer text
    </footer>

    <!-- JavaScript Imports (bottom of body) -->
    - config.js (first - defines globals)
    - utils.js (second - needed by everything)
    - calculator.js (third - calculation engine)
    - charts.js (fourth - chart helpers)
    - businesses/mainland-northland.js
    - businesses/blue-capital.js
    - main.js (last - bootstraps app)
</body>
</html>
```

**Key Elements**:
- Business selector tabs that switch between modules
- Quick stats bar showing real-time aggregated metrics
- Responsive container for dynamic content

---

### **2. css/main.css**
**Purpose**: Core Bloomberg Terminal aesthetic, typography, layout
**Size**: ~600 lines

**Sections**:

#### A. CSS Variables (Design System)
```css
:root {
    /* Colors - Bloomberg Terminal Palette */
    --color-primary: #0a1929;           /* Deep navy */
    --color-primary-light: #1a2f42;     /* Lighter navy */
    --color-gold: #c5a572;              /* Premium gold accents */

    /* Background Colors */
    --bg-primary: #0a1929;
    --bg-surface: #ffffff;
    --bg-secondary: #1a2f42;

    /* Typography */
    --font-primary: 'Inter', -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* Font Sizes (responsive scale) */
    --text-xs: 0.6875rem;    /* 11px */
    --text-sm: 0.8125rem;    /* 13px */
    --text-base: 0.9375rem;  /* 15px */
    --text-lg: 1.0625rem;    /* 17px */
    --text-xl: 1.25rem;      /* 20px */
    --text-2xl: 1.5rem;      /* 24px */
    --text-3xl: 1.875rem;    /* 30px */
    --text-4xl: 2.25rem;     /* 36px */
    --text-5xl: 3rem;        /* 48px */

    /* Spacing Scale */
    --space-1: 0.25rem;   /* 4px */
    --space-2: 0.5rem;    /* 8px */
    --space-3: 0.75rem;   /* 12px */
    --space-4: 1rem;      /* 16px */
    --space-5: 1.25rem;   /* 20px */
    --space-6: 1.5rem;    /* 24px */
    --space-8: 2rem;      /* 32px */
    --space-12: 3rem;     /* 48px */
    --space-16: 4rem;     /* 64px */

    /* Border Radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;

    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
}
```

#### B. Reset & Base Styles
- Box-sizing: border-box
- Body: Inter font, smooth scrolling
- Heading hierarchy (h1-h6)
- Professional link styles

#### C. Layout Components
- `.container`: Max-width 1400px, centered, responsive padding
- `.grid`: Flexible grid system (grid-2, grid-3, grid-4)
- `.main-header`: Fixed header with gradient background
- `.platform-title`: Gradient text effect (white to gold)

#### D. Business Selector Tabs
- `.business-tabs`: Flex container for tab buttons
- `.business-tab`: Individual tab styling
- `.business-tab.active`: Active state with gold underline

#### E. Quick Stats Bar
- `.quick-stats`: Horizontal stats display
- `.stat-item`: Individual metric with label/value
- Real-time updating animation

---

### **3. css/components.css**
**Purpose**: Reusable UI components (cards, buttons, forms, tables)
**Size**: ~750 lines

**Component Categories**:

#### A. Cards
```css
.card {
    /* White background, subtle shadow, rounded corners */
}

.card-header {
    /* Section header within card */
}

.card-title {
    /* Bold title, 1.25rem */
}

.card-subtitle {
    /* Muted subtitle, smaller font */
}

.card-body {
    /* Main card content area */
}

/* Specialized Cards */
.card-elevated       /* Enhanced shadow for prominence */
.card-accent         /* Dark background with gold accents */
.card-success        /* Success state (green accents) */
.card-transport      /* Transport equipment theme (blue) */
.card-construction   /* Construction equipment theme (orange) */
.card-finance        /* Finance theme (teal) */
```

#### B. Buttons
```css
.btn {
    /* Base button: padding, border-radius, transitions */
}

.btn-primary {
    /* Primary CTA: gradient background, white text */
}

.btn-secondary {
    /* Secondary action: outlined style */
}

.btn-outline {
    /* Outline only, transparent background */
}

.scenario-btn {
    /* Special button for scenario selection */
    /* Larger, card-like appearance */
}
```

#### C. Forms
```css
.form-group {
    /* Form field container with spacing */
}

.form-label {
    /* Field label: semibold, small, uppercase */
}

.form-input {
    /* Text/number input: border, focus states */
}

.form-range {
    /* Range slider: custom styling */
}

/* Focus States */
.form-input:focus {
    /* Blue border, subtle glow */
}
```

#### D. Metrics Display
```css
.metric {
    /* Container for KPI display */
}

.metric-label {
    /* Small uppercase label */
}

.metric-value {
    /* Large monospace number */
}

.stacked-metric {
    /* Vertical metric layout */
}

.stacked-metric-bar {
    /* Progress bar visualization */
}
```

#### E. Tables
```css
.table {
    /* Full-width, bordered, hover effects */
}

.table thead {
    /* Header: gradient background, bold text */
}

.table tbody tr:hover {
    /* Hover state for rows */
}
```

#### F. Progress Bars
```css
.progress {
    /* Container: gray background */
}

.progress-bar {
    /* Fill: gradient, smooth transitions */
}
```

#### G. Badges & Alerts
```css
.badge {
    /* Small status indicator */
}

.alert {
    /* Message box with icon and border */
}
```

---

### **4. css/charts.css**
**Purpose**: Bloomberg Terminal-style chart containers
**Size**: ~370 lines

**Sections**:

#### A. Chart Grid Layout
```css
.charts-grid {
    /* 2-column grid, responsive to 1-column on mobile */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
}

@media (max-width: 768px) {
    .charts-grid {
        grid-template-columns: 1fr;
    }
}
```

#### B. Chart Cards
```css
.chart-card {
    /* Card specifically for charts */
    /* Extra padding, professional borders */
}

.chart-header {
    /* Chart title section */
}

.chart-title {
    /* Main chart title */
}

.chart-subtitle {
    /* Chart descriptor text */
}
```

#### C. Chart Wrappers
```css
.chart-wrapper {
    /* Container for canvas element */
    position: relative;
    height: 420px;  /* Standard height */
    background: var(--bg-surface);
}

.chart-wrapper.chart-sm {
    height: 280px;  /* Smaller charts */
}

.chart-wrapper.chart-md {
    height: 350px;  /* Medium charts */
}
```

#### D. Chart Controls
```css
.chart-controls {
    /* Buttons for chart interactions (timeframe, etc) */
}

.chart-control-btn {
    /* Individual control button */
}

.chart-control-btn.active {
    /* Active state with gradient */
}
```

#### E. Chart States
```css
.chart-loading {
    /* Loading spinner overlay */
}

.chart-empty {
    /* Empty state message */
}

.chart-error {
    /* Error state display */
}
```

---

### **5. js/config.js**
**Purpose**: Global configuration, constants, default data
**Size**: ~400 lines

**Structure**:

```javascript
const CONFIG = {
    // Global Settings
    years: [2025, 2026, 2027, 2028, 2029, 2030],

    // Scenarios
    scenarios: {
        conservative: {
            name: 'Conservative',
            utilizationMultiplier: 0.85,
            growthRate: 1.05
        },
        moderate: {
            name: 'Moderate',
            utilizationMultiplier: 0.90,
            growthRate: 1.08
        },
        aggressive: {
            name: 'Aggressive',
            utilizationMultiplier: 0.95,
            growthRate: 1.12
        }
    },

    // Color Palette (matches CSS variables)
    colors: {
        primary: '#0a1929',
        gold: '#c5a572',
        transport: '#0369a1',
        construction: '#d97706',
        finance: '#319795',
        success: '#0d7a5f',
        danger: '#dc2626',
        // ... more colors
    },

    // Transport Equipment Configuration
    transport: {
        equipmentTypes: {
            dryVan: {
                name: 'Dry Van',
                avgCost: 45000,
                avgRentalRate: 2500,
                avgLeaseRate: 1200,
                avgSalePrice: 35000,
                avgUtilization: 0.88
            },
            reefer: {
                name: 'Reefer',
                avgCost: 65000,
                avgRentalRate: 3500,
                avgLeaseRate: 1800,
                avgSalePrice: 50000,
                avgUtilization: 0.85
            },
            flatbed: {
                name: 'Flatbed',
                avgCost: 48000,
                // ... more properties
            },
            tanker: { /* ... */ },
            chassis: { /* ... */ }
        },

        defaultFleet: {
            2025: { dryVan: 150, reefer: 50, flatbed: 30, tanker: 20, chassis: 40 },
            2026: { dryVan: 180, reefer: 60, flatbed: 35, tanker: 25, chassis: 50 },
            // ... 2027-2030
        },

        defaultRevenueSplit: {
            rental: 0.70,
            lease: 0.20,
            sales: 0.10
        }
    },

    // Construction Equipment Configuration
    construction: {
        equipmentTypes: {
            excavator: {
                name: 'Excavator',
                brand: 'SDLG',
                avgCost: 120000,
                avgRentalRate: 8000,
                avgLeaseRate: 4500,
                avgSalePrice: 95000,
                avgUtilization: 0.82
            },
            loader: {
                name: 'Loader',
                brand: 'SDLG',
                avgCost: 95000,
                // ... more properties
            },
            dozer: {
                name: 'Dozer',
                brand: 'SDLG',
                // ... more properties
            },
            backhoe: {
                name: 'Backhoe',
                brand: 'CHL',
                // ... more properties
            },
            crane: {
                name: 'Crane',
                brand: 'XCMG',
                avgCost: 250000,
                avgRentalRate: 30000,
                // ... more properties
            },
            roadEquipment: {
                name: 'Road Equipment',
                brand: 'XCMG',
                // ... more properties
            }
        },

        defaultFleet: {
            2025: { excavator: 40, loader: 35, dozer: 15, backhoe: 20, crane: 10, roadEquipment: 12 },
            // ... 2026-2030
        },

        defaultRevenueSplit: {
            rental: 0.70,
            lease: 0.20,
            sales: 0.10
        }
    },

    // Blue Capital Equipment Finance Configuration
    finance: {
        products: {
            equipmentLoan: {
                name: 'Equipment Loan',
                defaultRate: 0.085,
                termMonths: 60,
                ltv: 0.75
            },
            lease: {
                name: 'Equipment Lease',
                defaultRate: 0.095,
                termMonths: 48,
                ltv: 0.85
            },
            lineOfCredit: {
                name: 'Line of Credit',
                defaultRate: 0.115,  // Prime + 6.5%
                termMonths: 12,
                ltv: 0.70
            }
        },

        costs: {
            fundingCost: 0.045,        // 4.5% funding cost
            lossProvision: 0.04,       // 4% credit loss provision
            administrative: 0.015,     // 1.5% admin costs
            compliance: 0.005          // 0.5% compliance
        },

        defaultPortfolio: {
            2025: { equipmentLoan: 100, lease: 50, lineOfCredit: 15 },
            2026: { equipmentLoan: 130, lease: 65, lineOfCredit: 20 },
            // ... 2027-2030
        }
    },

    // Financial Assumptions
    financial: {
        wacc: 0.12,                    // 12% WACC for NPV
        taxRate: 0.26,                 // 26% corporate tax
        maintenanceCostPercent: 0.08,  // 8% of asset value annually
        insurancePercent: 0.03,        // 3% of asset value
        depreciationYears: 7           // Straight-line depreciation
    },

    // Chart.js Default Configuration
    charts: {
        defaultOptions: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 25, 41, 0.95)',
                    titleFont: {
                        family: "'Inter', sans-serif",
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: "'JetBrains Mono', monospace",
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: "'JetBrains Mono', monospace",
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12
                        }
                    }
                }
            }
        }
    }
};

// Make available globally
window.CONFIG = CONFIG;
```

---

### **6. js/utils.js**
**Purpose**: Utility functions for formatting, calculations, DOM manipulation
**Size**: ~200 lines

**Functions**:

```javascript
const Utils = {
    /**
     * Format number as currency
     * @param {number} value - Numeric value
     * @param {boolean} abbreviated - Use K/M abbreviations
     * @returns {string} Formatted currency string
     */
    formatCurrency(value, abbreviated = false) {
        if (abbreviated) {
            if (value >= 1000000) {
                return '$' + (value / 1000000).toFixed(1) + 'M';
            }
            if (value >= 1000) {
                return '$' + (value / 1000).toFixed(0) + 'K';
            }
        }
        return '$' + value.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    },

    /**
     * Format number as percentage
     * @param {number} value - Decimal value (0.05 = 5%)
     * @param {number} decimals - Decimal places
     * @returns {string} Formatted percentage
     */
    formatPercent(value, decimals = 1) {
        return (value * 100).toFixed(decimals) + '%';
    },

    /**
     * Format large numbers with K/M/B abbreviations
     * @param {number} value - Numeric value
     * @returns {string} Formatted number
     */
    formatNumber(value) {
        if (value >= 1000000000) {
            return (value / 1000000000).toFixed(1) + 'B';
        }
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + 'M';
        }
        if (value >= 1000) {
            return (value / 1000).toFixed(0) + 'K';
        }
        return value.toLocaleString();
    },

    /**
     * Calculate average of array
     * @param {number[]} arr - Array of numbers
     * @returns {number} Average value
     */
    average(arr) {
        return arr.reduce((sum, val) => sum + val, 0) / arr.length;
    },

    /**
     * Calculate sum of array
     * @param {number[]} arr - Array of numbers
     * @returns {number} Sum
     */
    sum(arr) {
        return arr.reduce((sum, val) => sum + val, 0);
    },

    /**
     * Deep clone object
     * @param {object} obj - Object to clone
     * @returns {object} Cloned object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Debounce function execution
     * @param {function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {function} Debounced function
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Linear interpolation between two values
     * @param {number} start - Start value
     * @param {number} end - End value
     * @param {number} t - Interpolation factor (0-1)
     * @returns {number} Interpolated value
     */
    lerp(start, end, t) {
        return start + (end - start) * t;
    },

    /**
     * Calculate NPV (Net Present Value)
     * @param {number[]} cashFlows - Array of cash flows
     * @param {number} discountRate - Discount rate (decimal)
     * @returns {number} NPV
     */
    calculateNPV(cashFlows, discountRate) {
        return cashFlows.reduce((npv, cf, year) => {
            return npv + (cf / Math.pow(1 + discountRate, year + 1));
        }, 0);
    },

    /**
     * Calculate IRR (Internal Rate of Return)
     * @param {number[]} cashFlows - Array of cash flows
     * @returns {number} IRR as decimal
     */
    calculateIRR(cashFlows) {
        // Newton-Raphson method
        let rate = 0.1;
        for (let i = 0; i < 100; i++) {
            const npv = cashFlows.reduce((sum, cf, year) => {
                return sum + (cf / Math.pow(1 + rate, year));
            }, 0);

            const dnpv = cashFlows.reduce((sum, cf, year) => {
                return sum - (year * cf / Math.pow(1 + rate, year + 1));
            }, 0);

            const newRate = rate - npv / dnpv;
            if (Math.abs(newRate - rate) < 0.0001) {
                return newRate;
            }
            rate = newRate;
        }
        return rate;
    }
};

// Make available globally
window.Utils = Utils;
```

---

### **7. js/calculator.js**
**Purpose**: Core financial calculation engine
**Size**: ~600 lines

**Structure**:

```javascript
const Calculator = {
    /**
     * Calculate combined projections for Mainland/Northland
     * @param {object} transportFleet - Transport fleet by year
     * @param {object} constructionFleet - Construction fleet by year
     * @param {object} transportSplit - Transport revenue split
     * @param {object} constructionSplit - Construction revenue split
     * @param {string} scenario - Scenario name
     * @returns {object} Complete projection object
     */
    calculateCombinedProjections(transportFleet, constructionFleet, transportSplit, constructionSplit, scenario) {
        // 1. Calculate transport projections
        const transportProj = this.calculateTransportProjections(
            transportFleet,
            transportSplit,
            scenario
        );

        // 2. Calculate construction projections
        const constructionProj = this.calculateConstructionProjections(
            constructionFleet,
            constructionSplit,
            scenario
        );

        // 3. Combine revenue
        const revenue = this.combineRevenue(transportProj.revenue, constructionProj.revenue);

        // 4. Calculate EBITDA
        const ebitda = this.calculateEBITDA(revenue, scenario);

        // 5. Calculate capital requirements
        const capitalRequirements = this.calculateCapitalRequirements(
            transportFleet,
            constructionFleet
        );

        // 6. Calculate free cash flow
        const fcf = this.calculateFreeCashFlow(ebitda, capitalRequirements);

        // 7. Calculate valuation (NPV, IRR)
        const valuation = this.calculateValuation(fcf);

        return {
            transport: transportProj,
            construction: constructionProj,
            revenue,
            ebitda,
            capitalRequirements,
            fcf,
            valuation
        };
    },

    /**
     * Calculate transport equipment projections
     * @param {object} fleet - Fleet by year/type
     * @param {object} split - Revenue split
     * @param {string} scenario - Scenario name
     * @returns {object} Transport projections
     */
    calculateTransportProjections(fleet, split, scenario) {
        const scenarioConfig = CONFIG.scenarios[scenario];
        const revenue = { byYear: {}, total: 0 };

        CONFIG.years.forEach(year => {
            const yearRevenue = { rental: 0, lease: 0, sales: 0, total: 0, byType: {} };

            Object.keys(fleet[year]).forEach(type => {
                const units = fleet[year][type];
                const config = CONFIG.transport.equipmentTypes[type];

                // Calculate revenue by stream
                const rentalRev = units * config.avgRentalRate * 12 * config.avgUtilization * scenarioConfig.utilizationMultiplier;
                const leaseRev = units * config.avgLeaseRate * 12 * config.avgUtilization * scenarioConfig.utilizationMultiplier;
                const salesRev = units * 0.15 * config.avgSalePrice; // 15% turnover

                yearRevenue.byType[type] = {
                    rental: rentalRev * split.rental,
                    lease: leaseRev * split.lease,
                    sales: salesRev * split.sales,
                    total: (rentalRev * split.rental) + (leaseRev * split.lease) + (salesRev * split.sales)
                };

                yearRevenue.rental += rentalRev * split.rental;
                yearRevenue.lease += leaseRev * split.lease;
                yearRevenue.sales += salesRev * split.sales;
            });

            yearRevenue.total = yearRevenue.rental + yearRevenue.lease + yearRevenue.sales;
            revenue.byYear[year] = yearRevenue;
            revenue.total += yearRevenue.total;
        });

        return { revenue };
    },

    /**
     * Calculate construction equipment projections
     * (Similar structure to transport)
     */
    calculateConstructionProjections(fleet, split, scenario) {
        // Implementation similar to calculateTransportProjections
        // ...
    },

    /**
     * Combine revenue from multiple divisions
     */
    combineRevenue(transportRev, constructionRev) {
        const combined = { byYear: {}, total: 0 };

        CONFIG.years.forEach(year => {
            combined.byYear[year] = {
                transport: transportRev.byYear[year].total,
                construction: constructionRev.byYear[year].total,
                total: transportRev.byYear[year].total + constructionRev.byYear[year].total
            };
            combined.total += combined.byYear[year].total;
        });

        return combined;
    },

    /**
     * Calculate EBITDA with margin assumptions
     */
    calculateEBITDA(revenue, scenario) {
        const ebitda = { byYear: {}, total: 0 };
        const baseMargin = 0.32; // 32% base EBITDA margin
        const marginExpansion = 0.01; // 1% annual expansion

        CONFIG.years.forEach((year, index) => {
            const margin = baseMargin + (marginExpansion * index);
            const amount = revenue.byYear[year].total * margin;

            ebitda.byYear[year] = {
                amount: amount,
                marginPercent: margin * 100
            };
            ebitda.total += amount;
        });

        return ebitda;
    },

    /**
     * Calculate capital requirements
     */
    calculateCapitalRequirements(transportFleet, constructionFleet) {
        const capital = { byYear: {}, total: 0 };

        CONFIG.years.forEach(year => {
            let yearCapital = 0;

            // Transport equipment capital
            Object.keys(transportFleet[year]).forEach(type => {
                const units = transportFleet[year][type];
                const cost = CONFIG.transport.equipmentTypes[type].avgCost;
                yearCapital += units * cost * 0.15; // 15% new units
            });

            // Construction equipment capital
            Object.keys(constructionFleet[year]).forEach(type => {
                const units = constructionFleet[year][type];
                const cost = CONFIG.construction.equipmentTypes[type].avgCost;
                yearCapital += units * cost * 0.15;
            });

            capital.byYear[year] = yearCapital;
            capital.total += yearCapital;
        });

        return capital;
    },

    /**
     * Calculate free cash flow
     */
    calculateFreeCashFlow(ebitda, capitalReq) {
        const fcf = { byYear: {}, total: 0 };

        CONFIG.years.forEach(year => {
            const yearFCF = ebitda.byYear[year].amount - capitalReq.byYear[year];
            fcf.byYear[year] = yearFCF;
            fcf.total += yearFCF;
        });

        return fcf;
    },

    /**
     * Calculate valuation metrics (NPV, IRR)
     */
    calculateValuation(fcf) {
        const cashFlows = CONFIG.years.map(year => fcf.byYear[year]);

        return {
            npv: Utils.calculateNPV(cashFlows, CONFIG.financial.wacc),
            irr: Utils.calculateIRR([-50000000, ...cashFlows]) // Assume $50M initial investment
        };
    },

    /**
     * Calculate finance projections for Blue Capital
     * @param {object} portfolio - Portfolio by year/product
     * @param {string} scenario - Scenario name
     * @returns {object} Finance projections
     */
    calculateFinanceProjections(portfolio, scenario) {
        const projections = { byYear: {}, total: { revenue: 0, costs: 0, profit: 0 } };

        CONFIG.years.forEach(year => {
            let yearRevenue = 0;
            let yearCosts = 0;

            Object.keys(portfolio[year]).forEach(product => {
                const contracts = portfolio[year][product];
                const productConfig = CONFIG.finance.products[product];

                // Revenue = contracts * avg principal * interest rate
                const avgPrincipal = 150000; // $150K avg equipment value
                const revenue = contracts * avgPrincipal * productConfig.defaultRate;

                // Costs = funding + losses + admin
                const costs = contracts * avgPrincipal * (
                    CONFIG.finance.costs.fundingCost +
                    CONFIG.finance.costs.lossProvision +
                    CONFIG.finance.costs.administrative +
                    CONFIG.finance.costs.compliance
                );

                yearRevenue += revenue;
                yearCosts += costs;
            });

            const yearProfit = yearRevenue - yearCosts;
            const margin = yearRevenue > 0 ? yearProfit / yearRevenue : 0;

            projections.byYear[year] = {
                revenue: yearRevenue,
                costs: yearCosts,
                profit: yearProfit,
                margin: margin
            };

            projections.total.revenue += yearRevenue;
            projections.total.costs += yearCosts;
            projections.total.profit += yearProfit;
        });

        return projections;
    }
};

// Make available globally
window.Calculator = Calculator;
```

---

### **8. js/charts.js**
**Purpose**: Chart.js wrapper and helper functions
**Size**: ~250 lines

```javascript
const Charts = {
    // Store chart instances for updates
    instances: {},

    /**
     * Create or update a chart
     * @param {string} canvasId - Canvas element ID
     * @param {string} type - Chart type (line, bar, doughnut, etc)
     * @param {object} data - Chart data
     * @param {object} options - Custom options
     */
    updateOrCreate(canvasId, type, data, options = {}) {
        // Destroy existing chart if exists
        if (this.instances[canvasId]) {
            this.instances[canvasId].destroy();
        }

        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error(`Canvas not found: ${canvasId}`);
            return;
        }

        const ctx = canvas.getContext('2d');

        // Merge with default options
        const chartOptions = this.buildOptions(type, options);

        // Create new chart
        this.instances[canvasId] = new Chart(ctx, {
            type: type,
            data: data,
            options: chartOptions
        });
    },

    /**
     * Build chart options
     */
    buildOptions(type, customOptions) {
        const baseOptions = Utils.deepClone(CONFIG.charts.defaultOptions);

        // Apply custom formatter if provided
        if (customOptions.yAxisFormatter) {
            baseOptions.scales.y.ticks.callback = customOptions.yAxisFormatter;
        }

        // Apply dual axis if needed
        if (customOptions.dualAxis) {
            baseOptions.scales.y1 = {
                position: 'right',
                grid: {
                    display: false
                }
            };
        }

        // Apply stacked if needed
        if (customOptions.stacked) {
            baseOptions.scales.x.stacked = true;
            baseOptions.scales.y.stacked = true;
        }

        return baseOptions;
    },

    /**
     * Destroy a chart instance
     */
    destroy(canvasId) {
        if (this.instances[canvasId]) {
            this.instances[canvasId].destroy();
            delete this.instances[canvasId];
        }
    },

    /**
     * Destroy all charts
     */
    destroyAll() {
        Object.keys(this.instances).forEach(id => {
            this.destroy(id);
        });
    }
};

// Make available globally
window.Charts = Charts;
```

---

### **9. js/businesses/mainland-northland.js**
**Purpose**: Mainland Truck & Trailer + Northland Equipment module
**Size**: ~1600 lines

**Complete Module Structure** (see next section for detailed breakdown)

---

### **10. js/businesses/blue-capital.js**
**Purpose**: Blue Capital Equipment Finance module
**Size**: ~1400 lines

**Complete Module Structure** (see next section for detailed breakdown)

---

### **11. js/main.js**
**Purpose**: Application bootstrap and initialization
**Size**: ~100 lines

```javascript
// Application entry point
document.addEventListener('DOMContentLoaded', () => {
    console.log('Investment Platform Initializing...');

    // Initialize business selector
    initBusinessSelector();

    // Load default business (Mainland/Northland)
    loadBusiness('mainland-northland');

    // Update quick stats bar
    updateQuickStats();
});

/**
 * Initialize business selector tabs
 */
function initBusinessSelector() {
    const tabs = document.querySelectorAll('.business-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const businessId = e.currentTarget.dataset.business;

            // Update active state
            tabs.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');

            // Load business
            loadBusiness(businessId);
        });
    });
}

/**
 * Load business module
 * @param {string} businessId - Business identifier
 */
function loadBusiness(businessId) {
    const container = document.getElementById('business-content');

    // Clear existing content
    container.innerHTML = '';

    // Destroy all existing charts
    Charts.destroyAll();

    // Load appropriate business module
    if (businessId === 'mainland-northland') {
        MainlandNorthland.render(container);
    } else if (businessId === 'blue-capital') {
        BlueCapital.render(container);
    }

    // Update quick stats
    setTimeout(() => updateQuickStats(), 500);
}

/**
 * Update quick stats bar
 */
function updateQuickStats() {
    // Get stats from active business module
    // Update DOM elements in quick stats bar
}
```

---

## 🎨 **Visual Design Specifications**

### **Color Palette**
- **Primary Navy**: #0a1929 (headers, primary elements)
- **Gold Accent**: #c5a572 (highlights, active states, premium metrics)
- **Transport Blue**: #0369a1 (transport-specific elements)
- **Construction Orange**: #d97706 (construction-specific elements)
- **Finance Teal**: #319795 (finance-specific elements)
- **Success Green**: #0d7a5f (positive metrics)
- **Danger Red**: #dc2626 (negative metrics, warnings)

### **Typography**
- **Primary Font**: Inter (clean, professional sans-serif)
- **Monospace**: JetBrains Mono (for numbers, data)
- **Heading Scale**: 48px (H1) → 36px (H2) → 30px (H3)
- **Body Text**: 15px (readable, professional)

### **Spacing System**
- **Micro**: 4px, 8px, 12px (component spacing)
- **Small**: 16px, 20px, 24px (section spacing)
- **Large**: 32px, 48px, 64px (major section spacing)

---

## 📊 **Content Requirements**

### **Per Business Module**

Each business module must include:

1. **Executive Summary** (1 section)
   - 4 hero metrics with gold numbers
   - Market TAM highlight
   - 2-3 sentence overview paragraph

2. **Market Analysis** (1 section, 2-3 cards)
   - Market size with sources ($XXB TAM)
   - Growth rates (CAGR)
   - 2-3 paragraphs per card explaining market dynamics
   - Key growth drivers (bulleted list)
   - Competitive advantages (bulleted list)

3. **Strategic Business Model** (1 section, 2 cards)
   - Revenue model explanation (2-3 paragraphs)
   - Competitive positioning (2-3 paragraphs)
   - Visual revenue mix breakdown
   - Moat/defensibility points

4. **Scenario Selector** (1 section)
   - 3 buttons: Conservative, Moderate, Aggressive
   - Real-time switching

5. **KPI Dashboard** (1 section, 6 metrics)
   - Total revenue
   - Total profit/EBITDA
   - Margin metrics
   - Each with 1-sentence explanation paragraph

6. **Financial Projections** (1 section, 4-8 charts)
   - Revenue projection (line chart)
   - Division/product comparison (bar chart)
   - Margin analysis (line chart)
   - Cash flow (bar chart)
   - Each chart with 2-3 sentence analytical paragraph

7. **Interactive Planning** (1 section)
   - Input forms for all parameters
   - Real-time updates (100ms debounce)
   - Year-by-year configuration

8. **Risk Assessment** (1 section, 4 risk cards)
   - Market risk
   - Operational risk
   - Financial risk
   - Regulatory risk
   - Each with risk description + mitigation strategies (4-5 bullets)

9. **Export Section** (1 section)
   - CSV export button
   - JSON export button
   - Reset to defaults button

### **Total Charts Per Module**
- Mainland/Northland: **8 charts**
- Blue Capital: **4 charts**

### **Total Analytical Paragraphs Per Module**
- Minimum: **20-25 paragraphs** of institutional-quality analysis
- Each 2-4 sentences explaining the "why" behind the data

---

## ⚡ **Real-Time Update Flow**

```
User Input Change
    ↓
Event Listener Triggered
    ↓
Update State Object
    ↓
Debounce (100ms)
    ↓
calculateProjections()
    ↓
updateKPIs() (with animation)
    ↓
updateAllCharts()
    ↓
UI Refreshed
```

**Key Requirements**:
- ALL inputs must trigger real-time updates
- Debounce to prevent excessive recalculation
- Smooth animations on metric changes
- No page reloads

---

## 🔧 **Build Order**

We will build files in this exact order:

1. ✅ **index.html** - Structure first
2. ✅ **css/main.css** - Core styles
3. ✅ **css/components.css** - Component library
4. ✅ **css/charts.css** - Chart styling
5. ✅ **js/config.js** - Data foundation
6. ✅ **js/utils.js** - Helper functions
7. ✅ **js/calculator.js** - Calculation engine
8. ✅ **js/charts.js** - Chart wrapper
9. ✅ **js/businesses/mainland-northland.js** - First business module
10. ✅ **js/businesses/blue-capital.js** - Second business module
11. ✅ **js/main.js** - Bootstrap app

---

## ✅ **Quality Checklist**

Before considering the platform complete:

- [ ] No emojis anywhere in the code or UI
- [ ] All numbers use monospace font
- [ ] All charts have analytical paragraphs (2-3 sentences minimum)
- [ ] All sections have lead paragraphs explaining context
- [ ] Real-time updates work on ALL inputs
- [ ] Bloomberg Terminal aesthetic throughout
- [ ] Responsive design (works on mobile)
- [ ] All exports (CSV, JSON) functional
- [ ] Professional error handling
- [ ] Loading states for calculations
- [ ] Smooth animations on metric updates
- [ ] Accessible color contrast ratios
- [ ] Print-friendly styling

---

## 📝 **Notes**

- **Professional Tone**: Every paragraph should read like it's from a Goldman Sachs pitch deck
- **Data-Driven**: Always explain WHY behind the numbers
- **Visual Hierarchy**: Use spacing and typography to guide the eye
- **Institutional Quality**: This should look like it costs $1M to build

---

Ready to proceed with building file by file?
