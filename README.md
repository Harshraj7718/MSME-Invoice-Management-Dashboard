# 📊 MSME Invoice Management Dashboard

A simplified Invoice Management Dashboard built for MSMEs (Micro, Small & Medium Enterprises) to track invoices, payments, and cash flow at a glance. This project demonstrates strong React.js fundamentals, business logic implementation, and performance optimization techniques.

![Dashboard Preview](/image%20copy.png) 

## 🚀 Live Demo

**Live URL:** [https://msme-invoice-management-dashboard.netlify.app/]

**GitHub Repository:** [https://github.com/Harshraj7718/MSME-Invoice-Management-Dashboard]

---

## 🛠️ Tech Stack

- **Frontend Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **State Management:** React Context API
- **Data Persistence:** localStorage
- **Deployment:** Netlify / Vercel

---

## 🎯 Business Problem

MSMEs often struggle to efficiently track:
- Outstanding invoices
- Overdue payments
- Cash flow health
- Payment delays

This dashboard provides business owners with:
- Instant visibility of invoice status
- Clear identification of overdue risks
- Payment tracking and delay analysis
- Efficient invoice management without backend complexity

---

## ✅ Features Implemented

### 1️⃣ Invoice List View
- **Display Fields:** Invoice Number, Customer Name, Invoice Date, Due Date, Amount, Status
- **Status Indicators:** Paid / Pending / Overdue with color-coded badges
- **Days Tracking:** Shows days until due or overdue by count
- **Search:** Filter by invoice number or customer name
- **Filter:** By status (All / Paid / Pending / Overdue)
- **Sort:** By Invoice Date, Due Date, or Amount
- **Pagination:** 10 invoices per page (handles 500+ records efficiently)
- **Bulk Actions:** Select multiple invoices and mark as paid

### 2️⃣ Real-Time Summary Cards
Displayed at the top of the dashboard with live updates:
- **Total Outstanding:** Sum of Pending + Overdue invoices
- **Total Overdue:** Sum of all overdue amounts
- **Total Paid (This Month):** Monthly paid invoice total
- **Average Payment Delay:** Tracks payment timeliness

All metrics update automatically when:
- New invoices are added
- Invoices are marked as paid
- Bulk actions are performed
- Filters are applied

### 3️⃣ Add New Invoice
- Modal-based invoice creation form
- **Required Fields:**
  - Customer Name
  - Invoice Amount
  - Invoice Date
  - Payment Terms (7 / 15 / 30 / 45 / 60 days)
- Auto-calculated due date based on payment terms
- **Form Validation:**
  - No empty fields allowed
  - Amount must be positive
  - Valid date formats

### 4️⃣ Payment Actions
- Mark individual or multiple invoices as Paid
- Capture payment date (defaults to current date)
- Bulk payment processing support
- Automatic recalculation of:
  - Invoice status
  - Summary metrics
  - Chart data

### 5️⃣ Interactive Charts (Bonus)
- Pie chart visualization showing distribution of:
  - Paid invoices
  - Pending invoices
  - Overdue invoices
- Built with Recharts library
- Updates dynamically with data changes

### 6️⃣ Dark / Light Mode (Bonus)
- Day/Night theme toggle
- Implemented using Tailwind's class-based dark mode
- Smooth UI transitions
- Persistent theme preference

---

## ⚙️ Logic Implementation

### Status Calculation
```javascript
- Paid: payment date exists
- Overdue: no payment date AND due date < today
- Pending: no payment date AND due date ≥ today
```
*All dates are normalized to midnight to avoid time-based calculation bugs.*

### Days Calculation
- **Pending:** "Due in X days"
- **Overdue:** "Overdue by X days"
- **Paid:** "Paid X days early/late/on time"

---

## ⚡ Performance Optimizations

### Implemented Techniques:
1. **useMemo for Expensive Calculations**
   - Filtered invoice lists
   - Sorted data arrays
   - Summary metric calculations
   - Prevents unnecessary re-computations

2. **Pagination**
   - Limits DOM rendering to 10 items per page
   - Handles large datasets (500+ invoices) efficiently
   - Reduces initial render time

3. **React Context API**
   - Avoids prop drilling
   - Centralized state management
   - Efficient re-renders through proper context splitting

4. **Optimized Re-renders**
   - Component memoization where needed
   - Minimal state updates
   - Batched state changes

5. **localStorage Strategy**
   - Debounced writes to reduce I/O operations
   - Efficient data serialization

### Testing:
- Tested with 100+ auto-generated invoices
- Smooth performance maintained across all operations
- No lag in search, filter, or sort operations

---

## 💾 Data Management

- **Persistence:** localStorage for client-side data storage
- **Initial Load:** Auto-generates dummy invoices on first visit
- **Data Survival:** Persists across page refreshes and sessions
- **Edge Cases Handled:**
  - Empty invoice list state
  - No search results found
  - No paid invoices (monthly)
  - Invalid data scenarios

---

## 📦 Project Structure

```
src/
 ├── components/
 │   ├── Header.jsx                 # App header with theme toggle
 │   ├── SummaryCards.jsx           # Real-time metric cards
 │   ├── InvoiceChart.jsx           # Pie chart visualization
 │   ├── Filters.jsx                # Search, filter, sort controls
 │   ├── InvoiceTable.jsx           # Main table component
 │   ├── InvoiceRow.jsx             # Individual invoice row
 │   └── AddInvoiceModal.jsx        # Invoice creation modal
 ├── context/
 │   └── InvoiceContext.jsx         # Global state management
 ├── data/
 │   └── dummyInvoices.js           # Sample invoice data
 ├── hooks/
 │   └── useLocalStorage.js         # localStorage abstraction
 ├── utils/
 │   └── invoiceUtils.js            # Business logic utilities
 └── App.jsx                        # Root component
```

---

## 🧪 Setup & Run

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd invoice-dashboard
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run Development Server
```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

### 4️⃣ Build for Production
```bash
npm run build
```

### 5️⃣ Preview Production Build
```bash
npm run preview
```

---

## 🧠 Approach

### Component Architecture
- **Modular Design:** Each component has a single responsibility
- **Context-Based State:** Centralized invoice data management
- **Presentational vs Container:** Clear separation of concerns
- **Reusable Components:** DRY principle applied throughout

### Business Logic Focus
- Prioritized accurate calculations over visual complexity
- Implemented real-world invoice management rules
- Date handling with proper timezone normalization
- Edge case handling for empty states and invalid data

### Technology Choices
- **Context API over Redux:** Simpler setup for this scale
- **Vite over CRA:** Faster development experience
- **Tailwind CSS:** Rapid UI development with consistency
- **Recharts:** Lightweight charting solution
- **No Backend:** Intentionally avoided to meet assignment requirements

### Optimization Strategy
- Used `useMemo` for expensive filtering/sorting operations
- Implemented pagination instead of virtualization for clarity
- Auto-generated invoices for realistic performance testing
- Debounced search input to reduce re-renders

---

## 🎯 Challenges Faced & Solutions

### Challenge 1: Date Handling Across Timezones
**Problem:** Date comparisons were inconsistent due to time components  
**Solution:** Normalized all dates to midnight UTC for accurate status calculation

### Challenge 2: Real-Time Summary Updates
**Problem:** Summary cards not updating after bulk actions  
**Solution:** Implemented derived state using useMemo that recalculates on invoice data changes

### Challenge 3: Performance with Large Datasets
**Problem:** Sluggish UI with 500+ invoices  
**Solution:** Implemented pagination and memoized expensive calculations

### Challenge 4: localStorage Size Limits
**Problem:** Risk of exceeding storage quota  
**Solution:** Implemented data compression and periodic cleanup of old paid invoices

---

## ⏱️ Time Breakdown

| Task                              | Time    |
|-----------------------------------|---------|
| **Design & Planning**             | 2 hours |
| - Wireframing                     |         |
| - Component structure planning    |         |
| **Core Development**              | 8 hours |
| - Component implementation        |         |
| - State management setup          |         |
| - Form and validation logic       |         |
| **Logic & Optimization**          | 4 hours |
| - Business logic implementation   |         |
| - Performance optimizations       |         |
| - useMemo integration             |         |
| **Testing & Debugging**           | 3 hours |
| - Edge case testing               |         |
| - Cross-browser testing           |         |
| - Bug fixes                       |         |
| **UI Polish & Bonus Features**    | 2 hours |
| - Dark mode implementation        |         |
| - Chart integration               |         |
| - Final styling touches           |         |
| **Total**                         | **19 hours** |

---

## 👨‍💻 Developer

**Harsh Raj**  
📧 Email: rajharsh71018@gmail.com  
🔗 LinkedIn: [https://www.linkedin.com/in/harsh-raj-4b803125a/]  
🐙 GitHub: [@Harshraj7718](https://github.com/Harshraj7718)


---
