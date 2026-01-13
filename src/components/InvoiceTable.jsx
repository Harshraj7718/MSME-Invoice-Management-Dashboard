import { useContext, useMemo, useState, useEffect } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import InvoiceRow from "./InvoiceRow";
import { calculateStatus } from "../utils/invoiceUtils";
import { exportCSV } from "../utils/exportCSV";

export default function InvoiceTable({ statusFilter, search, sortBy }) {
  const { invoices, setInvoices } = useContext(InvoiceContext);

  // Pagination
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter + Search + Sort
  const processedInvoices = useMemo(() => {
    let data = [...invoices];

    if (statusFilter !== "all") {
      data = data.filter(
        (inv) => calculateStatus(inv) === statusFilter
      );
    }

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (inv) =>
          inv.id.toLowerCase().includes(q) ||
          inv.customerName.toLowerCase().includes(q)
      );
    }

    data.sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "dueDate")
        return new Date(a.dueDate) - new Date(b.dueDate);
      return new Date(a.invoiceDate) - new Date(b.invoiceDate);
    });

    return data;
  }, [invoices, statusFilter, search, sortBy]);

  useEffect(() => {
    setPage(1);
    setSelectedIds([]);
  }, [statusFilter, search, sortBy]);

  const paginatedInvoices = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return processedInvoices.slice(start, start + PAGE_SIZE);
  }, [processedInvoices, page]);

  const totalPages = Math.ceil(processedInvoices.length / PAGE_SIZE);

  const markSelectedAsPaid = () => {
    setInvoices((prev) =>
      prev.map((inv) =>
        selectedIds.includes(inv.id)
          ? {
              ...inv,
              paymentDate: new Date().toISOString().slice(0, 10),
            }
          : inv
      )
    );
    setSelectedIds([]);
  };

  // Empty state
  if (processedInvoices.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No invoices found</h3>
          <p className="text-sm text-gray-500">Try adjusting your filters or search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">

      {/* Header Actions */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <>
              <span className="text-sm font-medium text-gray-700">
                {selectedIds.length} selected
              </span>
              <button
                onClick={markSelectedAsPaid}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Mark as Paid
              </button>
            </>
          )}
        </div>
        
        <button
          onClick={() => exportCSV(processedInvoices)}
          className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 w-12">
                <input
                  type="checkbox"
                  checked={
                    paginatedInvoices.length > 0 &&
                    paginatedInvoices.every((inv) =>
                      selectedIds.includes(inv.id)
                    )
                  }
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked
                        ? paginatedInvoices.map((inv) => inv.id)
                        : []
                    )
                  }
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Invoice #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Invoice Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Days
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedInvoices.map((inv) => (
              <InvoiceRow
                key={inv.id}
                invoice={inv}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page - 1) * PAGE_SIZE + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(page * PAGE_SIZE, processedInvoices.length)}
            </span> of{" "}
            <span className="font-medium">{processedInvoices.length}</span> results
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="hidden sm:flex gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (page <= 4) {
                pageNum = i + 1;
              } else if (page >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = page - 3 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                    page === pageNum
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <div className="sm:hidden">
            <span className="px-4 py-2 text-sm font-medium text-gray-700">
              Page {page} of {totalPages}
            </span>
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}