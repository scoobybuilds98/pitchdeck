/* ============================================
   BUSINESS PROJECTIONS PLATFORM - CONFIGURATION
   Constants, Defaults, and Settings
   ============================================ */

const CONFIG = {
    // Application Settings
    app: {
        name: 'Business Projections Platform',
        version: '1.0.0',
        currency: 'CAD',
        currencySymbol: '$',
        locale: 'en-CA'
    },

    // Projection Years
    years: [2025, 2026, 2027, 2028, 2029, 2030],

    // Transport Equipment Configuration (Mainland Truck & Trailer)
    transport: {
        // Equipment Types
        types: {
            chassis: {
                name: 'Chassis',
                rentalRate: 2500,      // $ per month
                purchasePrice: 45000,  // $ per unit
                utilization: {
                    conservative: 0.85,
                    moderate: 0.90,
                    aggressive: 0.95
                },
                depreciationRate: 0.15,
                maintenanceCost: 150  // $ per month
            },
            dryVan: {
                name: 'Dry Van',
                rentalRate: 1800,
                purchasePrice: 35000,
                utilization: {
                    conservative: 0.85,
                    moderate: 0.92,
                    aggressive: 1.00
                },
                depreciationRate: 0.12,
                maintenanceCost: 120
            },
            flatbed: {
                name: 'Flatbed Trailer',
                rentalRate: 1600,
                purchasePrice: 32000,
                utilization: {
                    conservative: 0.85,
                    moderate: 0.90,
                    aggressive: 0.95
                },
                depreciationRate: 0.12,
                maintenanceCost: 100
            },
            reefer: {
                name: 'Refrigerated Trailer',
                rentalRate: 2200,
                purchasePrice: 55000,
                utilization: {
                    conservative: 0.85,
                    moderate: 0.90,
                    aggressive: 0.95
                },
                depreciationRate: 0.18,
                maintenanceCost: 200
            }
        },

        // Default Fleet Sizes (Conservative Scenario)
        defaultFleet: {
            2025: { chassis: 60, dryVan: 180, flatbed: 50, reefer: 60 },
            2026: { chassis: 80, dryVan: 240, flatbed: 70, reefer: 80 },
            2027: { chassis: 100, dryVan: 300, flatbed: 85, reefer: 100 },
            2028: { chassis: 120, dryVan: 360, flatbed: 100, reefer: 120 },
            2029: { chassis: 140, dryVan: 420, flatbed: 115, reefer: 140 },
            2030: { chassis: 160, dryVan: 480, flatbed: 130, reefer: 160 }
        },

        // Revenue Split Defaults (%)
        defaultRevenueSplit: {
            rental: 70,
            lease: 20,
            sale: 10
        },

        // Operating Costs (%)
        costs: {
            maintenance: 0.08,      // 8% of revenue
            insurance: 0.03,        // 3% of revenue
            storage: 0.02,          // 2% of revenue
            administrative: 0.05    // 5% of revenue
        }
    },

    // Construction Equipment Configuration (Northland Equipment)
    construction: {
        // SDLG Equipment
        sdlg: {
            excavators: {
                name: 'SDLG Excavators',
                brand: 'SDLG',
                brandColor: '#047857',
                rentalRate: 12000,      // $ per month
                purchasePrice: 180000,  // $ per unit
                utilization: {
                    conservative: 0.70,
                    moderate: 0.80,
                    aggressive: 0.90
                },
                depreciationRate: 0.15,
                maintenanceCost: 800
            },
            loaders: {
                name: 'SDLG Wheel Loaders',
                brand: 'SDLG',
                brandColor: '#047857',
                rentalRate: 10000,
                purchasePrice: 150000,
                utilization: {
                    conservative: 0.70,
                    moderate: 0.80,
                    aggressive: 0.90
                },
                depreciationRate: 0.15,
                maintenanceCost: 700
            },
            dozers: {
                name: 'SDLG Dozers',
                brand: 'SDLG',
                brandColor: '#047857',
                rentalRate: 15000,
                purchasePrice: 250000,
                utilization: {
                    conservative: 0.70,
                    moderate: 0.80,
                    aggressive: 0.90
                },
                depreciationRate: 0.15,
                maintenanceCost: 1000
            }
        },

        // CHL Equipment
        chl: {
            loaders: {
                name: 'CHL Loaders',
                brand: 'CHL',
                brandColor: '#ea580c',
                rentalRate: 9000,
                purchasePrice: 140000,
                utilization: {
                    conservative: 0.70,
                    moderate: 0.80,
                    aggressive: 0.90
                },
                depreciationRate: 0.15,
                maintenanceCost: 650
            },
            backhoes: {
                name: 'CHL Backhoes',
                brand: 'CHL',
                brandColor: '#ea580c',
                rentalRate: 8000,
                purchasePrice: 120000,
                utilization: {
                    conservative: 0.70,
                    moderate: 0.80,
                    aggressive: 0.90
                },
                depreciationRate: 0.15,
                maintenanceCost: 600
            }
        },

        // XCMG Equipment
        xcmg: {
            cranes: {
                name: 'XCMG Cranes',
                brand: 'XCMG',
                brandColor: '#dc2626',
                rentalRate: 30000,
                purchasePrice: 600000,
                utilization: {
                    conservative: 0.75,
                    moderate: 0.85,
                    aggressive: 0.95
                },
                depreciationRate: 0.12,
                maintenanceCost: 2000
            },
            roadMachinery: {
                name: 'XCMG Road Machinery',
                brand: 'XCMG',
                brandColor: '#dc2626',
                rentalRate: 18000,
                purchasePrice: 350000,
                utilization: {
                    conservative: 0.70,
                    moderate: 0.80,
                    aggressive: 0.90
                },
                depreciationRate: 0.15,
                maintenanceCost: 1200
            }
        },

        // Default Fleet Sizes (Conservative Scenario)
        defaultFleet: {
            2025: {
                sdlg: { excavators: 8, loaders: 6, dozers: 4 },
                chl: { loaders: 5, backhoes: 6 },
                xcmg: { cranes: 3, roadMachinery: 5 }
            },
            2026: {
                sdlg: { excavators: 12, loaders: 9, dozers: 6 },
                chl: { loaders: 8, backhoes: 9 },
                xcmg: { cranes: 5, roadMachinery: 8 }
            },
            2027: {
                sdlg: { excavators: 16, loaders: 12, dozers: 8 },
                chl: { loaders: 11, backhoes: 12 },
                xcmg: { cranes: 7, roadMachinery: 11 }
            },
            2028: {
                sdlg: { excavators: 20, loaders: 15, dozers: 10 },
                chl: { loaders: 14, backhoes: 15 },
                xcmg: { cranes: 9, roadMachinery: 14 }
            },
            2029: {
                sdlg: { excavators: 24, loaders: 18, dozers: 12 },
                chl: { loaders: 17, backhoes: 18 },
                xcmg: { cranes: 11, roadMachinery: 17 }
            },
            2030: {
                sdlg: { excavators: 28, loaders: 21, dozers: 14 },
                chl: { loaders: 20, backhoes: 21 },
                xcmg: { cranes: 13, roadMachinery: 20 }
            }
        },

        // Revenue Split Defaults (%)
        defaultRevenueSplit: {
            rental: 60,
            lease: 25,
            sale: 15
        },

        // Operating Costs (%)
        costs: {
            maintenance: 0.12,      // 12% of revenue
            insurance: 0.04,        // 4% of revenue
            storage: 0.03,          // 3% of revenue
            administrative: 0.06    // 6% of revenue
        }
    },

    // Financing Configuration (Blue Capital Equipment Finance)
    finance: {
        // Loan Products
        products: {
            equipmentLoan: {
                name: 'Equipment Loan',
                defaultRate: 0.065,     // 6.5% interest rate
                termMonths: 60,
                ltv: 0.85              // Loan-to-value ratio
            },
            lease: {
                name: 'Equipment Lease',
                defaultRate: 0.055,
                termMonths: 48,
                ltv: 0.90
            },
            lineOfCredit: {
                name: 'Line of Credit',
                defaultRate: 0.075,
                termMonths: 12,
                ltv: 0.70
            }
        },

        // Default Portfolio
        defaultPortfolio: {
            2025: { equipmentLoan: 50, lease: 30, lineOfCredit: 20 },
            2026: { equipmentLoan: 75, lease: 45, lineOfCredit: 30 },
            2027: { equipmentLoan: 100, lease: 60, lineOfCredit: 40 },
            2028: { equipmentLoan: 125, lease: 75, lineOfCredit: 50 },
            2029: { equipmentLoan: 150, lease: 90, lineOfCredit: 60 },
            2030: { equipmentLoan: 175, lease: 105, lineOfCredit: 70 }
        },

        // Operating Costs (%)
        costs: {
            fundingCost: 0.035,     // 3.5% cost of funds
            lossProvision: 0.02,    // 2% loss provision
            administrative: 0.015,   // 1.5% administrative
            compliance: 0.005       // 0.5% compliance
        }
    },

    // Scenario Configurations
    scenarios: {
        conservative: {
            name: 'Conservative',
            description: 'Lower growth, higher stability',
            growthRate: 0.10,
            utilizationMultiplier: 1.0,
            priceInflation: 0.02
        },
        moderate: {
            name: 'Moderate',
            description: 'Balanced growth and risk',
            growthRate: 0.15,
            utilizationMultiplier: 1.05,
            priceInflation: 0.03
        },
        aggressive: {
            name: 'Aggressive',
            description: 'High growth, higher risk',
            growthRate: 0.25,
            utilizationMultiplier: 1.10,
            priceInflation: 0.04
        },
        custom: {
            name: 'Custom',
            description: 'User-defined parameters',
            growthRate: 0.15,
            utilizationMultiplier: 1.05,
            priceInflation: 0.03
        }
    },

    // Chart Configuration
    charts: {
        colors: {
            primary: '#1a365d',
            secondary: '#4a5568',
            accent: '#319795',
            success: '#38a169',
            warning: '#dd6b20',
            danger: '#e53e3e',
            transport: '#3b82f6',
            construction: '#f59e0b',
            finance: '#8b5cf6',
            sdlg: '#047857',
            chl: '#ea580c',
            xcmg: '#dc2626'
        },

        defaultOptions: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleFont: {
                        family: "'Inter', sans-serif",
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: "'Roboto Mono', monospace",
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true
                }
            }
        }
    },

    // Market Data
    market: {
        transport: {
            totalMarketSize: 2800000000,  // $2.8B CAD
            growthRate: 0.035,             // 3.5% CAGR
            competitorCount: 150
        },
        construction: {
            totalMarketSize: 3500000000,  // $3.5B CAD (converted from USD)
            growthRate: 0.042,             // 4.2% CAGR
            competitorCount: 200
        },
        finance: {
            totalMarketSize: 5000000000,  // $5B CAD
            growthRate: 0.055,             // 5.5% CAGR
            competitorCount: 80
        }
    },

    // Financial Metrics
    financial: {
        taxRate: 0.27,                 // 27% corporate tax rate
        discountRate: 0.12,            // 12% discount rate for NPV
        targetEBITDAMargin: 0.35,      // 35% target EBITDA margin
        targetROE: 0.20,               // 20% target ROE
        targetDebtToEquity: 2.5        // 2.5:1 debt-to-equity ratio
    },

    // Export Settings
    export: {
        formats: ['xlsx', 'csv', 'pdf', 'json'],
        defaultFormat: 'xlsx',
        includeCharts: true
    }
};

// Make CONFIG globally available
window.CONFIG = CONFIG;
