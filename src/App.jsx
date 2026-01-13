import { useState } from "react";
import { InvoiceProvider } from "./context/InvoiceContext";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import InvoiceTable from "./components/InvoiceTable";
import Filters from "./components/Filters";
import InvoiceChart from "./components/InvoiceChart";
import AddInvoiceModal from "./components/AddInvoiceModal";

export default function App() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [showModal, setShowModal] = useState(false);

  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        
        {/* 🔹 TOP HEADER BAR */}
        <Header />

        {/* 🔹 MAIN CONTENT */}
        <div className="p-6">
          <SummaryCards />
          <InvoiceChart />

          {/* ✅ Add Invoice Button */}
      <div className="flex justify-end mb-6">
        <button
        onClick={() => setShowModal(true)}
        className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
        >
        {/* Animated background effect */}
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></span>
    
        {/* Plus icon with animation */}
        <svg 
        className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
        </svg>
    
        {/* Button text */}
        <span className="relative">Add New Invoice</span>
    
        {/* Shine effect */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></span>
        </button>
      </div>

          <Filters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <InvoiceTable
            statusFilter={statusFilter}
            search={search}
            sortBy={sortBy}
          />
        </div>

        {/* 🔹 ADD INVOICE MODAL */}
        {showModal && (
          <AddInvoiceModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </InvoiceProvider>
  );
}
