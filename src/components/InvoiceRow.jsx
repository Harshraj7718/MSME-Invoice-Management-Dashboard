import {
  calculateStatus,
  calculateDaysText,
} from "../utils/invoiceUtils";

export default function InvoiceRow({
  invoice,
  selectedIds,
  setSelectedIds,
}) {
  const status = calculateStatus(invoice);

  const toggleSelect = () => {
    setSelectedIds((prev) =>
      prev.includes(invoice.id)
        ? prev.filter((id) => id !== invoice.id)
        : [...prev, invoice.id]
    );
  };

  // Status badge configuration
  const getStatusConfig = (status) => {
    switch (status) {
      case "paid":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case "overdue":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          border: "border-red-200",
          icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      default: // pending
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          border: "border-amber-200",
          icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const isSelected = selectedIds.includes(invoice.id);

  return (
    <tr 
      className={`
        group hover:bg-gray-50 transition-colors duration-150
        ${isSelected ? 'bg-blue-50 hover:bg-blue-100' : ''}
      `}
    >
      {/* Checkbox */}
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={toggleSelect}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer transition-all"
        />
      </td>

      {/* Invoice Number */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {invoice.id}
          </span>
          
        </div>
      </td>

      {/* Customer Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
            {invoice.customerName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-900">
            {invoice.customerName}
          </span>
        </div>
      </td>

      {/* Invoice Date */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {invoice.invoiceDate}
        </div>
      </td>

      {/* Due Date */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {invoice.dueDate}
        </div>
      </td>

      {/* Amount */}
      <td className="px-6 py-4">
        <span className="text-sm font-semibold text-gray-900">
          ₹{invoice.amount.toLocaleString()}
        </span>
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4">
        <span 
          className={`
            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
            border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}
            transition-all duration-200 group-hover:shadow-sm
          `}
        >
          {statusConfig.icon}
          <span className="capitalize">{status}</span>
        </span>
      </td>

      {/* Days */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className={`
            text-sm font-medium
            ${status === 'overdue' ? 'text-red-600' : 'text-gray-600'}
          `}>
            {calculateDaysText(invoice)}
          </span>
          {status === 'overdue' && (
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </div>
      </td>
    </tr>
  );
}