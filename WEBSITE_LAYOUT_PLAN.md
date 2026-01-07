# Mainland Truck & Trailer Interactive Pitch Deck Website
## Comprehensive Layout & Structure Plan

---

## 🎨 Design Philosophy
- **Modern & Professional**: Clean design with corporate blues, grays, and accent colors
- **Interactive**: Editable projections, live charts, dynamic calculations
- **Responsive**: Mobile-first approach, works on all devices
- **Data-Driven**: Visual charts, graphs, and interactive dashboards

---

## 📱 Site Structure

### 1. **HOME PAGE** (`index.html`)
**Hero Section:**
- Company logo (prominent)
- Compelling headline: "Scaling Canadian Transport Equipment Leadership"
- Subtitle: "Asset-backed equipment rental with proven operational excellence"
- Key metrics dashboard (live counters):
  - Current Fleet Size: 92-120 units
  - Utilization Rate: 100%
  - Target Fleet (2030): 10,000-14,000 units
  - Customer Retention: 90%+
- CTA Buttons: "View Projections" | "Explore Opportunity"

**Quick Stats Section:**
- 4 stat cards in a row:
  1. Annual Rental Revenue (2025): $1.0-1.4M
  2. EBITDA Margin: 80%+
  3. Recovery Time: <48 hours
  4. Years of Experience: 50+ combined

**Value Propositions:**
- 3 columns with icons:
  1. **Asset-Backed Security** - GPS tracking, geofencing, rapid recovery
  2. **Proven Operations** - 100% utilization, 90%+ retention
  3. **Growth Ready** - Scalable model, pan-Canadian expansion

**Navigation Menu:**
- Home
- Company Overview
- Financial Projections (dropdown: Dashboard, Fleet Growth, Revenue, Capital)
- Market Opportunity
- Technology & Operations
- Risk Management
- Team
- Contact

---

### 2. **COMPANY OVERVIEW** (`/company`)
**Sections:**

**Who We Are:**
- Company description
- Mission statement
- Strategic positioning map (visual)

**Company Structure:**
- **Mainland Truck & Trailer** - Transport equipment rental & sales
- **Northland Equipment** - Construction equipment dealership (SDLG, CHL, XCMG)

**Business Model - 3 Revenue Streams:**
- Interactive cards (flip/expand):
  1. **Rental & Lease Division** (85% revenue)
     - **Transport Equipment** (Mainland):
       - Chassis, dry vans, flatbeds, reefers
       - Average rates: $950-1,100/month
       - Utilization: 100%
     - **Construction Equipment** (Northland):
       - SDLG (Official Dealer): Excavators, loaders, dozers
       - CHL: Wheel loaders, backhoes
       - XCMG: Cranes, graders, compactors
       - Rental/Lease options with flexible terms
  2. **Sales Division** (10% revenue)
     - Transport: New chassis (Max Atlas dealer), used equipment
     - Construction: SDLG, CHL, XCMG new equipment sales
  3. **Service Division** (5% revenue)
     - Maintenance & repair for both divisions
     - Mobile repair services
     - Parts & attachments

**Current Operations (2025):**
- Interactive map showing locations:
  - British Columbia
  - Alberta
  - Ontario
  - Washington State
- Fleet composition pie chart
- Key operational metrics cards

**Operational Excellence:**
- Metrics dashboard:
  - Utilization Rate timeline chart
  - Customer Retention graph
  - Days to Revenue counter
  - Recovery Rate percentage

---

### 3. **FINANCIAL PROJECTIONS DASHBOARD** (`/projections`)
**Interactive Dashboard:**

**Scenario Selector:**
- Toggle buttons: "Conservative" | "Moderate" | "Aggressive" | "Custom"
- Custom mode: All inputs become editable

**Fleet Growth Calculator:**
- **Division Tabs**: Toggle between "Transport Equipment" and "Construction Equipment"

- **Transport Equipment Input Panel** (editable in custom mode):
  - Starting Fleet (2025): 92-120
  - Growth Rate %: adjustable slider (0-500%)
  - Equipment Mix %:
    - Chassis: % slider
    - Dry Vans: % slider
    - Flatbeds: % slider
    - Reefers: % slider
  - Target Fleet by 2030: auto-calculated

- **Construction Equipment Input Panel** (NEW - Northland Equipment):
  - **SDLG Equipment** (Official Dealer):
    - Excavators: unit count input (2025-2030)
    - Wheel Loaders: unit count input
    - Dozers: unit count input
    - Other SDLG: unit count input
  - **CHL Equipment**:
    - Wheel Loaders: unit count input
    - Backhoe Loaders: unit count input
    - Other CHL: unit count input
  - **XCMG Equipment**:
    - Cranes: unit count input
    - Road Machinery (graders, compactors): unit count input
    - Other XCMG: unit count input
  - **Revenue Split** (% sliders):
    - Rental %: slider (0-100%)
    - Lease %: slider (0-100%)
    - Sale %: slider (0-100%)
    - Auto-validation: must equal 100%

- **Output Visualization:**
  - **Combined View**: Toggle to see transport + construction together
  - Line chart: Total fleet growth 2025-2030 (both divisions)
  - Stacked area chart: Equipment breakdown by division and type
  - Pie chart: Division split (Transport vs Construction)
  - Growth multiplier indicator for each division

**Revenue Projections:**
- **Transport Equipment Inputs**:
  - Average Rental Rate: $950-1,100/month (slider)
  - Utilization Rate: 85-100% (slider)
  - Sales Price per Unit: input field
  - Sales Volume (units/year): input field

- **Construction Equipment Inputs** (NEW - Northland):
  - **Rental Rates** (monthly, per equipment type):
    - SDLG Excavators: $ input (default $8,000-15,000)
    - SDLG Loaders: $ input (default $6,000-10,000)
    - SDLG Dozers: $ input (default $10,000-18,000)
    - CHL Loaders: $ input (default $5,000-9,000)
    - CHL Backhoes: $ input (default $4,000-7,000)
    - XCMG Cranes: $ input (default $15,000-30,000)
    - XCMG Road Machinery: $ input (default $8,000-12,000)

  - **Lease Rates** (monthly, per equipment type):
    - All equipment types: % of purchase price input
    - Lease term: dropdown (24/36/48/60 months)

  - **Sales Prices** (per unit):
    - SDLG Equipment: $ input per type
    - CHL Equipment: $ input per type
    - XCMG Equipment: $ input per type

  - **Utilization Rate**: 70-95% (slider, lower than transport)
  - **Sales Volume** (units/year by brand): input fields

- **Output Charts**:
  - **Combined Revenue View**:
    - Multi-line graph: Transport Rental + Construction Rental + Leasing + Sales + Service
    - Stacked bar chart: Total revenue by year (color-coded by division and stream)
    - Revenue composition donut chart (nested: outer = division, inner = stream type)
  - **Division Comparison**:
    - Side-by-side: Transport vs Construction revenue
    - Growth rate comparison
  - **Revenue Per Unit Analysis**:
    - Average revenue per transport unit
    - Average revenue per construction unit

**Profitability Metrics:**
- **Live Calculations**:
  - EBITDA calculator
  - Operating margin chart
  - Cash flow waterfall
  - ROI timeline

**Comparison Table:**
- Side-by-side: Baseline vs With Capital Investment
- Growth multiple indicators (15x-20x)
- Year-over-year percentage changes

---

### 4. **DETAILED PROJECTIONS** (Sub-pages under /projections)

#### 4a. **Fleet Growth** (`/projections/fleet`)
- **Transport Equipment Table** (Mainland):
  - Editable cells (in custom mode)
  - Columns: Year, Chassis, Dry Vans, Flatbeds, Reefers, Total Transport
  - Rows: 2025-2030
  - Auto-calculate totals

- **Construction Equipment Table** (NEW - Northland):
  - **SDLG Fleet** (editable in custom mode):
    - Columns: Year, Excavators, Wheel Loaders, Dozers, Other SDLG, Total SDLG
    - Rows: 2025-2030
  - **CHL Fleet**:
    - Columns: Year, Wheel Loaders, Backhoes, Other CHL, Total CHL
    - Rows: 2025-2030
  - **XCMG Fleet**:
    - Columns: Year, Cranes, Road Machinery, Other XCMG, Total XCMG
    - Rows: 2025-2030
  - **Construction Total**:
    - Auto-sum all construction equipment brands

- **Combined Fleet Summary Table**:
  - Columns: Year, Transport Total, Construction Total, Grand Total, YoY Growth %
  - Visual indicators for growth trends

- **Visualizations**:
  - **Multi-Division Charts**:
    - Stacked bar chart: Transport vs Construction units by year
    - Dual-axis line chart: Both divisions' growth trajectories
    - Brand comparison: SDLG vs CHL vs XCMG growth
  - **Equipment Type Breakdown**:
    - Transport equipment stacked area chart
    - Construction equipment stacked area chart
  - Market share gain chart (both divisions)

- **Geographic Expansion Timeline**:
  - Interactive map with expansion phases
  - Phase cards showing:
    - Cities
    - Timeline
    - Transport units deployed
    - Construction units deployed (NEW)

#### 4b. **Revenue Breakdown** (`/projections/revenue`)
- **Transport Revenue Calculator** (Mainland):
  - Rental Revenue inputs (by asset type)
  - Sales Revenue inputs (new & used)
  - Service Revenue inputs
  - Automatic totals

- **Construction Revenue Calculator** (NEW - Northland):
  - **Rental Revenue Inputs** (by brand & equipment type):
    - SDLG: Excavators, Loaders, Dozers (units × rate × utilization)
    - CHL: Loaders, Backhoes (units × rate × utilization)
    - XCMG: Cranes, Road Machinery (units × rate × utilization)
    - Monthly rental rate inputs per equipment type
    - Utilization % input
    - Auto-calculation of annual rental revenue

  - **Lease Revenue Inputs**:
    - Number of units leased (by brand/type)
    - Average lease payment (monthly)
    - Lease term (months)
    - Auto-calculation of lease revenue stream

  - **Sales Revenue Inputs**:
    - SDLG sales: units sold × average price
    - CHL sales: units sold × average price
    - XCMG sales: units sold × average price
    - Commission % on dealer sales

- **Combined Revenue Table** (2025-2030):
  - Columns:
    - Year
    - Transport Rental
    - Construction Rental (NEW)
    - Construction Leasing (NEW)
    - Transport Sales
    - Construction Sales (NEW)
    - Service Revenue (both divisions)
    - Total Revenue
    - YoY Growth %

- **Charts**:
  - **Revenue by Division**:
    - Stacked area: Transport vs Construction over time
    - Growth comparison: Division growth rates
  - **Revenue by Stream**:
    - Stacked bar: Rental + Leasing + Sales + Service by year
    - Pie chart: Revenue composition (current year)
  - **Revenue by Asset/Equipment Type**:
    - Transport: Chassis, dry vans, flatbeds, reefers
    - Construction: SDLG, CHL, XCMG breakdown
  - **Revenue Per Unit Analysis**:
    - Average revenue per transport unit
    - Average revenue per construction unit (by brand)

- **Comparison Tables**:
  - Baseline vs Accelerated Growth (both divisions)
  - Detailed P&L projections with construction equipment added
  - Margin analysis by division and equipment type

#### 4c. **Capital Deployment** (`/projections/capital`)
- **Deployment Timeline**:
  - Gantt chart: Capital deployment 2026-2030
  - **Breakdown by Division**:
    - Transport Fleet Purchases
    - Construction Equipment Purchases (NEW - Northland)
    - Facilities (both divisions)
    - Working Capital (both divisions)
    - Technology & Systems

- **Capital Inputs** (editable in custom mode):
  - **Transport Equipment**:
    - Average cost per chassis: $ input
    - Average cost per dry van: $ input
    - Average cost per flatbed: $ input
    - Average cost per reefer: $ input

  - **Construction Equipment** (NEW):
    - **SDLG Pricing**:
      - Excavator cost: $ input (default $150k-400k)
      - Loader cost: $ input (default $100k-250k)
      - Dozer cost: $ input (default $200k-500k)
    - **CHL Pricing**:
      - Loader cost: $ input (default $80k-200k)
      - Backhoe cost: $ input (default $60k-120k)
    - **XCMG Pricing**:
      - Crane cost: $ input (default $500k-2M)
      - Road machinery cost: $ input (default $150k-400k)
    - Dealer inventory requirements: input
    - Parts inventory: % of equipment value

  - **Facility Costs**:
    - Transport yards: cost per location
    - Construction equipment yards: cost per location
    - Service bays: cost per bay

  - **Working Capital**:
    - AR days: input
    - Inventory turns: input
    - AP days: input

- **Capital Deployment Table** (2025-2030):
  - Columns:
    - Year
    - Transport Fleet Capex
    - Construction Fleet Capex (NEW)
    - Facility Investments
    - Working Capital
    - Technology
    - Total Annual
    - Cumulative
  - Auto-calculation based on fleet growth and unit costs

- **Financing Structure Inputs**:
  - Debt %: slider (0-80%)
  - Equity %: auto-calculated
  - Interest rate: input
  - Term: dropdown

- **Cumulative Capital Chart**:
  - Waterfall chart showing:
    - Initial investment
    - Annual capex (both divisions)
    - Reinvested cash flow
    - Total capital employed
  - Division color-coding
  - Debt capacity calculator with LTV ratios

- **Returns Calculator**:
  - Input: Investment amount, structure, division allocation %
  - Output:
    - Projected returns by division
    - Blended returns (interest, fees, success fees)
    - IRR and ROI charts (overall and by division)
    - Cash-on-cash returns timeline

---

### 5. **MARKET OPPORTUNITY** (`/market`)
**Sections:**

**Market Size & Growth:**

- **Transport Equipment Market** (Mainland):
  - Total Canadian market: $10B+ rental/leasing visual
  - Growth rate: 8-12% annually
  - Equipment rental market: $17.5B (2023)
  - Market share opportunity chart

- **Construction Equipment Market** (NEW - Northland):
  - **Canadian Construction Equipment Market**:
    - Total market value: ~US$3-4B (mid-decade)
    - Growth rate: 5-8% annually
    - M&E investment (Canada 2025): C$132.3B
  - **Market by Brand/Segment**:
    - Chinese equipment market share growing
    - SDLG (VOLVO subsidiary): Premium positioning
    - CHL: Value segment penetration
    - XCMG: #1 Chinese brand globally, growing in Canada
  - **Addressable Market**:
    - Construction rental/leasing subset
    - Dealer sales potential
    - Service & parts aftermarket

- **Combined Total Addressable Market (TAM)**:
  - Interactive chart showing both divisions
  - Growth projections 2025-2030
  - Market share capture scenarios

**Growth Drivers:**

- **Transport Division**:
  - 4 cards with icons:
    1. E-commerce Explosion
    2. Port Volume Growth (Vancouver TEUs +11% YoY)
    3. Supply Chain Diversification
    4. Cross-border Opportunities

- **Construction Division** (NEW):
  - 4 cards with icons:
    1. Infrastructure Investment (federal & provincial)
    2. Housing Construction Demand
    3. Resource Sector Activity (mining, energy)
    4. Equipment Fleet Modernization (ESG, efficiency)

**Competitive Landscape:**

- **Transport Equipment Competitors**:
  - TIP Canada: ~28,000 trailers
  - Trailcon Leasing: ~8,500 trailers
  - Mainland (2030 target): market share visualization

- **Construction Equipment Competitors** (NEW):
  - **Rental/Leasing**:
    - Toromont CAT Rental: Major player
    - United Rentals Canada: Large footprint
    - Regional independents
    - Northland positioning: Official SDLG dealer advantage
  - **Sales/Dealerships**:
    - Traditional brands: CAT, Komatsu, John Deere
    - Chinese brands: Growing acceptance
    - Northland advantage: SDLG/VOLVO relationship, CHL/XCMG availability

- **Competitive Advantages**:
  - **Transport** (4 expandable sections):
    1. Strategic Asset Focus (short-haul)
    2. Technology-Enabled Control
    3. Tariff Advantages
    4. Operational Expertise

  - **Construction** (NEW - 4 expandable sections):
    1. Official SDLG Dealership (exclusive territory potential)
    2. Multi-Brand Offering (SDLG, CHL, XCMG)
    3. Rent-Lease-Buy Flexibility
    4. Value Positioning (vs. premium brands)

**Target Market Analysis:**

- **Transport Customers**:
  - Customer segment breakdown
  - Use case examples (drayage, regional, last-mile)
  - Geographic heat map

- **Construction Customers** (NEW):
  - **Customer Segments**:
    - General contractors (commercial/residential)
    - Heavy civil contractors (infrastructure)
    - Mining & resource companies
    - Municipalities & utilities
  - **Use Cases**:
    - Project-based rentals (short-term)
    - Long-term leases (fleet replacement)
    - Direct sales (owner-operators, small contractors)
  - **Geographic Focus**:
    - BC Lower Mainland (construction boom)
    - Alberta (resource sector)
    - Ontario (infrastructure investment)

---

### 6. **TECHNOLOGY & OPERATIONS** (`/technology`)
**Sections:**

**Technology Stack:**
- **Current Systems** (icon grid):
  - GPS/Telematics: 100% fleet coverage
  - Geofencing
  - Automated Billing
  - CRM

- **Technology Roadmap**:
  - Timeline visualization (2026-2030)
  - Phase cards:
    - Phase 1 (2026): Core Platform
    - Phase 2 (2027): Advanced Analytics
    - Phase 3 (2028+): AI & Automation

**Operational Controls:**
- **Asset Protection System**:
  - Visual flowchart: Detection → Response → Recovery
  - Average recovery time: <48 hours (animated counter)

- **Credit & Risk Management**:
  - Process diagram
  - Screening criteria
  - Risk scoring visualization

**Fleet Management:**
- **Maintenance Program**:
  - Preventive maintenance schedule
  - Service bay capacity chart
  - Fleet age distribution graph

---

### 7. **RISK MANAGEMENT** (`/risk`)
**Sections:**

**Risk Framework:**
- **Risk Matrix**:
  - Interactive heat map
  - Impact vs Probability grid
  - Mitigation strategies (expand on click)

**Market Risks:**
- Table with columns: Risk, Impact, Probability, Mitigation
- Charts showing sensitivity analysis

**Stress Test Scenarios:**
- **Interactive Stress Tester**:
  - Sliders for:
    - Utilization drop %
    - Rate decrease %
    - Credit loss increase
  - Live calculation of impact on:
    - EBITDA margin
    - DSCR
    - Covenant compliance

**Asset Protection:**
- **Recovery SOP Visualization**:
  - Timeline flowchart (Hour 0-72)
  - Success rate metrics

---

### 8. **TEAM & LEADERSHIP** (`/team`)
**Sections:**

**Leadership Team:**
- Profile cards (3 columns):
  - Photo (placeholder or actual)
  - Name & Title
  - Bio & experience
  - LinkedIn link

  1. Tanveer Bhinder - President
  2. Arsh Puar - VP Market Development
  3. Mike Le Pore - VP Trailer Sales & Rentals

**Organizational Growth:**
- **Staffing Plan Chart**:
  - Stacked area chart showing headcount growth by function
  - 2025-2030 projection

- **Revenue per Employee**:
  - Efficiency metric over time

**Advisory Board** (if applicable):
- Grid layout with brief bios

---

### 9. **IMPLEMENTATION ROADMAP** (`/roadmap`)
**Interactive Timeline:**

**First 100 Days:**
- Gantt chart with milestones:
  - Days 1-30
  - Days 31-60
  - Days 61-100
- Status indicators (planned/in-progress/complete)

**Year 1 Milestones (2026):**
- Quarterly breakdown
- Fleet additions chart
- Location launch timeline
- Key initiatives cards

**5-Year Vision:**
- Visual roadmap 2025-2030
- Major milestones with icons
- Success metrics dashboard

---

### 10. **APPENDICES & DATA** (`/appendices`)
**Sections:**

**Detailed Tables:**
- All financial tables from PDF
- Exportable to Excel/CSV
- Sortable and filterable

**Document Library:**
- SOPs (Asset Recovery, Credit Screening)
- Technology specifications
- Insurance & compliance docs
- Market research links

---

### 11. **CONTACT / INVESTMENT INQUIRY** (`/contact`)
**Sections:**

**Investment Summary:**
- Quick overview card
- Key highlights (bullet points)

**Contact Form:**
- Name, Email, Company
- Investment Interest dropdown
- Message field
- Submit button

**Contact Information:**
- Email
- Phone
- Address
- Map (Google Maps embed)

---

## 🎨 Design System

### Color Palette:
- **Primary**: Deep Blue (#1a365d)
- **Secondary**: Steel Blue (#4a5568)
- **Accent**: Teal (#319795)
- **Success**: Green (#38a169)
- **Warning**: Orange (#dd6b20)
- **Construction Division**: Amber/Gold (#f59e0b) - for Northland Equipment
- **Transport Division**: Blue (#3b82f6) - for Mainland
- **SDLG Brand**: Dark Green (#047857)
- **CHL Brand**: Orange (#ea580c)
- **XCMG Brand**: Red (#dc2626)
- **Neutral**: Gray scale (#f7fafc to #1a202c)

### Typography:
- **Headings**: Inter, sans-serif (bold)
- **Body**: Inter, sans-serif (regular)
- **Numbers/Data**: 'Roboto Mono', monospace

### Components:
- **Cards**: White background, subtle shadow, rounded corners
- **Buttons**: Solid primary color, hover effects, rounded
- **Charts**: Chart.js library, consistent color scheme
- **Forms**: Clean inputs, validation, success states
- **Navigation**: Sticky header, smooth scroll, mobile hamburger

---

## 📊 Interactive Features

### 1. **Live Calculators:**
- Fleet growth calculator
- Revenue projections
- Capital deployment
- Returns calculator
- Stress test simulator

### 2. **Editable Inputs:**
- All projection values editable in "Custom" mode
- Real-time recalculation
- Save/export scenarios

### 3. **Dynamic Charts:**
- Chart.js for all visualizations
- Hover tooltips
- Clickable legends
- Responsive sizing

### 4. **Data Export:**
- Export charts as PNG
- Export tables as CSV/Excel
- Print-friendly views

---

## 🛠 Technology Stack

### Frontend:
- **HTML5**: Semantic markup
- **CSS3**: Flexbox/Grid layouts, animations
- **Tailwind CSS**: Utility-first styling (or custom CSS)
- **JavaScript**: ES6+, vanilla JS or Vue.js for interactivity
- **Chart.js**: Data visualization
- **Alpine.js** (optional): Lightweight interactivity

### Features:
- Responsive design (mobile-first)
- Progressive enhancement
- Accessibility (WCAG 2.1 AA)
- Fast loading (optimized assets)
- SEO-friendly structure

---

## 📦 Deliverables

### Phase 1: Core Pages
1. Homepage with hero and navigation
2. Company Overview
3. Basic Financial Dashboard

### Phase 2: Interactive Projections
4. Fleet Growth calculator
5. Revenue Projections with charts
6. Capital Deployment timeline

### Phase 3: Additional Pages
7. Market Opportunity
8. Technology & Operations
9. Risk Management
10. Team & Roadmap

### Phase 4: Polish & Deploy
11. Contact page
12. Appendices
13. Mobile optimization
14. Testing & deployment

---

## 🎯 Key Differentiators

1. **Interactive Projections**: Users can adjust assumptions and see real-time impact
2. **Visual Storytelling**: Heavy use of charts, graphs, timelines
3. **Data Transparency**: All underlying data accessible
4. **Professional Design**: Modern, clean, corporate aesthetic
5. **Responsive**: Works perfectly on phones, tablets, desktops
6. **Export Capabilities**: Download data and charts
7. **Scenario Comparison**: Side-by-side view of different growth scenarios

---

## Next Steps

1. ✅ Review and approve this layout plan
2. Create design mockups (optional)
3. Build HTML/CSS/JS files page by page
4. Implement interactive calculators
5. Integrate Chart.js visualizations
6. Test across devices and browsers
7. Deploy to hosting platform

---

*This layout plan creates a comprehensive, interactive pitch deck that transforms static PDF content into a dynamic, engaging web experience with editable projections and visual data presentation.*

---

## 🚜 NEW: Construction Equipment Division (Northland Equipment)

### Summary of Construction Equipment Additions

This updated plan incorporates **Northland Equipment**, a construction equipment division offering SDLG, CHL, and XCMG equipment through three revenue streams: rental, leasing, and sales.

### Key Features Added:

#### 1. **Company Structure Updates**
- Added Northland Equipment as second division
- Official SDLG dealership highlighted
- CHL and XCMG equipment availability
- Dual-division business model visualization

#### 2. **Interactive Projection Calculators**
All financial calculators now include construction equipment inputs:

**Fleet Growth Inputs:**
- Unit counts by brand (SDLG, CHL, XCMG)
- Equipment type breakdowns (excavators, loaders, dozers, cranes, etc.)
- Growth rates independent from transport division
- Revenue split controls (rent/lease/sale %)

**Revenue Inputs:**
- Rental rates by equipment type (default ranges provided)
- Lease payment calculations (term-based)
- Sales pricing by brand and equipment type
- Utilization rates (70-95% for construction vs 85-100% transport)
- Commission structures for dealer sales

**Capital Deployment Inputs:**
- Equipment costs by brand and type
  - SDLG: $100k-500k range
  - CHL: $60k-200k range
  - XCMG: $150k-2M range
- Dealer inventory requirements
- Parts inventory calculations
- Construction-specific facility costs

#### 3. **New Data Tables**
- **Construction Fleet Tables**: Separate projections for SDLG, CHL, XCMG
- **Combined Fleet Summary**: Transport + Construction totals
- **Revenue Breakdown**: Rental + Leasing + Sales by division
- **Capital Deployment**: Division-specific capex tracking
- **P&L by Division**: Separate margin analysis

#### 4. **New Visualizations**
- **Division Comparison Charts**:
  - Transport vs Construction fleet growth
  - Revenue split by division
  - Capital allocation pie charts

- **Brand-Specific Charts**:
  - SDLG vs CHL vs XCMG growth trajectories
  - Revenue per brand
  - Equipment type mix (stacked bars)

- **Combined Views**:
  - Dual-axis charts (both divisions)
  - Nested donut charts (division → stream → equipment type)
  - Comparative growth multiples

#### 5. **Market Data Integration**
- Canadian construction equipment market size (~US$3-4B)
- M&E investment data (C$132.3B)
- Growth drivers (infrastructure, housing, resource sector)
- Competitive landscape (rental houses, traditional dealers)
- Chinese equipment market share trends

#### 6. **User Input Flexibility**
All construction equipment projections are **fully customizable** in "Custom" mode:
- ✅ Adjust unit counts year-by-year
- ✅ Modify rental/lease rates by equipment type
- ✅ Set sales volumes and pricing
- ✅ Configure revenue split percentages
- ✅ Edit equipment costs and facility capex
- ✅ Real-time recalculation of all downstream metrics

#### 7. **Color Coding System**
- **Transport Division**: Blue (#3b82f6)
- **Construction Division**: Amber/Gold (#f59e0b)
- **SDLG**: Dark Green (#047857)
- **CHL**: Orange (#ea580c)
- **XCMG**: Red (#dc2626)

### Default Assumptions (Editable):

**Construction Equipment Rental Rates (Monthly):**
- Excavators (SDLG): $8,000-15,000
- Wheel Loaders (SDLG/CHL): $5,000-10,000
- Dozers (SDLG): $10,000-18,000
- Backhoes (CHL): $4,000-7,000
- Cranes (XCMG): $15,000-30,000
- Road Machinery (XCMG): $8,000-12,000

**Construction Equipment Purchase Costs:**
- Excavators: $150k-400k
- Loaders: $80k-250k
- Dozers: $200k-500k
- Backhoes: $60k-120k
- Cranes: $500k-2M
- Road Machinery: $150k-400k

**Utilization Assumptions:**
- Transport: 85-100%
- Construction: 70-95% (seasonal variability)

### Integration Points:
Every section of the website now accounts for both divisions:
- ✅ Homepage metrics include both divisions
- ✅ Company overview shows dual structure
- ✅ Financial dashboard toggles between divisions
- ✅ All charts support division filtering
- ✅ Market analysis covers both industries
- ✅ Geographic expansion includes construction deployment
- ✅ Risk management addresses construction-specific risks
- ✅ Capital returns calculated by division

---

**The website will provide a complete, dual-division pitch deck with full user control over assumptions and real-time financial modeling for both Mainland Truck & Trailer and Northland Equipment.**
