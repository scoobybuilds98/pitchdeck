/* ============================================
   BUSINESS PROJECTIONS PLATFORM - UTILITIES
   Helper Functions & Common Operations
   ============================================ */

const Utils = {
    /**
     * Format number as currency
     * @param {number} value - The value to format
     * @param {boolean} compact - Use compact notation (K, M, B)
     * @returns {string} Formatted currency string
     */
    formatCurrency(value, compact = false) {
        if (value === null || value === undefined || isNaN(value)) {
            return '$0';
        }

        if (compact) {
            if (Math.abs(value) >= 1000000000) {
                return `$${(value / 1000000000).toFixed(2)}B`;
            } else if (Math.abs(value) >= 1000000) {
                return `$${(value / 1000000).toFixed(2)}M`;
            } else if (Math.abs(value) >= 1000) {
                return `$${(value / 1000).toFixed(1)}K`;
            }
        }

        return new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    },

    /**
     * Format number with separators
     * @param {number} value - The value to format
     * @param {number} decimals - Number of decimal places
     * @returns {string} Formatted number string
     */
    formatNumber(value, decimals = 0) {
        if (value === null || value === undefined || isNaN(value)) {
            return '0';
        }

        return new Intl.NumberFormat('en-CA', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value);
    },

    /**
     * Format number as percentage
     * @param {number} value - The value to format (0-1 or 0-100)
     * @param {number} decimals - Number of decimal places
     * @param {boolean} isDecimal - Whether input is in decimal format (0-1)
     * @returns {string} Formatted percentage string
     */
    formatPercent(value, decimals = 1, isDecimal = true) {
        if (value === null || value === undefined || isNaN(value)) {
            return '0%';
        }

        const percentValue = isDecimal ? value * 100 : value;
        return `${percentValue.toFixed(decimals)}%`;
    },

    /**
     * Calculate percentage change
     * @param {number} oldValue - Original value
     * @param {number} newValue - New value
     * @returns {number} Percentage change
     */
    calculatePercentChange(oldValue, newValue) {
        if (oldValue === 0) return 0;
        return ((newValue - oldValue) / oldValue) * 100;
    },

    /**
     * Calculate compound annual growth rate (CAGR)
     * @param {number} startValue - Starting value
     * @param {number} endValue - Ending value
     * @param {number} years - Number of years
     * @returns {number} CAGR as decimal (e.g., 0.15 for 15%)
     */
    calculateCAGR(startValue, endValue, years) {
        if (startValue === 0 || years === 0) return 0;
        return Math.pow(endValue / startValue, 1 / years) - 1;
    },

    /**
     * Calculate present value
     * @param {number} futureValue - Future value
     * @param {number} rate - Discount rate
     * @param {number} periods - Number of periods
     * @returns {number} Present value
     */
    calculatePV(futureValue, rate, periods) {
        return futureValue / Math.pow(1 + rate, periods);
    },

    /**
     * Calculate net present value (NPV)
     * @param {Array<number>} cashFlows - Array of cash flows
     * @param {number} rate - Discount rate
     * @returns {number} NPV
     */
    calculateNPV(cashFlows, rate) {
        return cashFlows.reduce((npv, cashFlow, index) => {
            return npv + this.calculatePV(cashFlow, rate, index);
        }, 0);
    },

    /**
     * Calculate internal rate of return (IRR)
     * @param {Array<number>} cashFlows - Array of cash flows
     * @returns {number} IRR as decimal
     */
    calculateIRR(cashFlows) {
        const maxIterations = 100;
        const tolerance = 0.0001;
        let rate = 0.1; // Initial guess

        for (let i = 0; i < maxIterations; i++) {
            const npv = this.calculateNPV(cashFlows, rate);
            if (Math.abs(npv) < tolerance) {
                return rate;
            }

            // Calculate derivative
            const derivative = cashFlows.reduce((sum, cashFlow, index) => {
                return sum - (index * cashFlow) / Math.pow(1 + rate, index + 1);
            }, 0);

            // Newton-Raphson method
            rate = rate - npv / derivative;
        }

        return rate;
    },

    /**
     * Calculate depreciation using straight-line method
     * @param {number} purchasePrice - Asset purchase price
     * @param {number} salvageValue - Salvage value at end of life
     * @param {number} usefulLife - Useful life in years
     * @returns {number} Annual depreciation
     */
    calculateDepreciation(purchasePrice, salvageValue, usefulLife) {
        return (purchasePrice - salvageValue) / usefulLife;
    },

    /**
     * Calculate loan payment
     * @param {number} principal - Loan principal
     * @param {number} annualRate - Annual interest rate (decimal)
     * @param {number} months - Loan term in months
     * @returns {number} Monthly payment
     */
    calculateLoanPayment(principal, annualRate, months) {
        const monthlyRate = annualRate / 12;
        if (monthlyRate === 0) return principal / months;

        return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
               (Math.pow(1 + monthlyRate, months) - 1);
    },

    /**
     * Validate input value
     * @param {*} value - Value to validate
     * @param {string} type - Type of validation (number, positive, percent, etc.)
     * @returns {boolean} Whether value is valid
     */
    validate(value, type = 'number') {
        switch (type) {
            case 'number':
                return !isNaN(parseFloat(value)) && isFinite(value);
            case 'positive':
                return this.validate(value, 'number') && parseFloat(value) > 0;
            case 'nonNegative':
                return this.validate(value, 'number') && parseFloat(value) >= 0;
            case 'percent':
                return this.validate(value, 'number') &&
                       parseFloat(value) >= 0 && parseFloat(value) <= 100;
            case 'decimal':
                return this.validate(value, 'number') &&
                       parseFloat(value) >= 0 && parseFloat(value) <= 1;
            default:
                return true;
        }
    },

    /**
     * Clamp value between min and max
     * @param {number} value - Value to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Clamped value
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    /**
     * Deep clone an object
     * @param {Object} obj - Object to clone
     * @returns {Object} Cloned object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Debounce function execution
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
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
     * Generate array of years
     * @param {number} startYear - Starting year
     * @param {number} endYear - Ending year
     * @returns {Array<number>} Array of years
     */
    generateYears(startYear, endYear) {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
        }
        return years;
    },

    /**
     * Calculate sum of array
     * @param {Array<number>} arr - Array of numbers
     * @returns {number} Sum
     */
    sum(arr) {
        return arr.reduce((sum, val) => sum + val, 0);
    },

    /**
     * Calculate average of array
     * @param {Array<number>} arr - Array of numbers
     * @returns {number} Average
     */
    average(arr) {
        if (arr.length === 0) return 0;
        return this.sum(arr) / arr.length;
    },

    /**
     * Calculate median of array
     * @param {Array<number>} arr - Array of numbers
     * @returns {number} Median
     */
    median(arr) {
        if (arr.length === 0) return 0;
        const sorted = [...arr].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);

        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
        return sorted[middle];
    },

    /**
     * Generate random color
     * @returns {string} Random hex color
     */
    randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    },

    /**
     * Download data as file
     * @param {string} content - File content
     * @param {string} filename - File name
     * @param {string} mimeType - MIME type
     */
    downloadFile(content, filename, mimeType = 'text/plain') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    /**
     * Export data to CSV
     * @param {Array<Object>} data - Array of objects
     * @param {string} filename - File name
     */
    exportToCSV(data, filename = 'export.csv') {
        if (data.length === 0) return;

        const headers = Object.keys(data[0]);
        const csv = [
            headers.join(','),
            ...data.map(row =>
                headers.map(header => {
                    const value = row[header];
                    // Escape quotes and wrap in quotes if contains comma
                    if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value;
                }).join(',')
            )
        ].join('\n');

        this.downloadFile(csv, filename, 'text/csv');
    },

    /**
     * Export data to JSON
     * @param {*} data - Data to export
     * @param {string} filename - File name
     */
    exportToJSON(data, filename = 'export.json') {
        const json = JSON.stringify(data, null, 2);
        this.downloadFile(json, filename, 'application/json');
    },

    /**
     * Show notification
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, warning, info)
     * @param {number} duration - Duration in milliseconds
     */
    showNotification(message, type = 'info', duration = 3000) {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification');
        existing.forEach(el => el.remove());

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#38a169' : type === 'error' ? '#e53e3e' : type === 'warning' ? '#dd6b20' : '#319795'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        // Auto-remove
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    },

    /**
     * Local storage helpers
     */
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Error saving to localStorage:', e);
                return false;
            }
        },

        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('Error reading from localStorage:', e);
                return defaultValue;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Error removing from localStorage:', e);
                return false;
            }
        },

        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('Error clearing localStorage:', e);
                return false;
            }
        }
    },

    /**
     * DOM helpers
     */
    dom: {
        /**
         * Create element with attributes and children
         * @param {string} tag - HTML tag name
         * @param {Object} attrs - Element attributes
         * @param {Array|string} children - Child elements or text content
         * @returns {HTMLElement} Created element
         */
        create(tag, attrs = {}, children = []) {
            const element = document.createElement(tag);

            // Set attributes
            Object.entries(attrs).forEach(([key, value]) => {
                if (key === 'class') {
                    element.className = value;
                } else if (key === 'style' && typeof value === 'object') {
                    Object.assign(element.style, value);
                } else if (key.startsWith('on') && typeof value === 'function') {
                    element.addEventListener(key.substring(2).toLowerCase(), value);
                } else {
                    element.setAttribute(key, value);
                }
            });

            // Add children
            if (typeof children === 'string') {
                element.textContent = children;
            } else if (Array.isArray(children)) {
                children.forEach(child => {
                    if (typeof child === 'string') {
                        element.appendChild(document.createTextNode(child));
                    } else if (child instanceof HTMLElement) {
                        element.appendChild(child);
                    }
                });
            }

            return element;
        },

        /**
         * Remove all children from element
         * @param {HTMLElement} element - Parent element
         */
        empty(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        /**
         * Show element
         * @param {HTMLElement} element - Element to show
         */
        show(element) {
            element.classList.remove('hidden', 'd-none');
            element.style.display = '';
        },

        /**
         * Hide element
         * @param {HTMLElement} element - Element to hide
         */
        hide(element) {
            element.classList.add('hidden');
        },

        /**
         * Toggle element visibility
         * @param {HTMLElement} element - Element to toggle
         */
        toggle(element) {
            element.classList.toggle('hidden');
        }
    }
};

// Make Utils globally available
window.Utils = Utils;
