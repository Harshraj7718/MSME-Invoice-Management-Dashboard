import { useContext, useMemo } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import { calculateStatus } from "../utils/invoiceUtils";

export default function SummaryCards() {
  const { invoices } = useContext(InvoiceContext);

  const summary = useMemo(() => {
    let totalOutstanding = 0;
    let totalOverdue = 0;
    let totalPaidThisMonth = 0;
    let totalDelayDays = 0;
    let paidCount = 0;

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    invoices.forEach((inv) => {
      const status = calculateStatus(inv);

      if (status === "pending" || status === "overdue") {
        totalOutstanding += inv.amount;
      }

      if (status === "overdue") {
        totalOverdue += inv.amount;
      }

      if (status === "paid" && inv.paymentDate) {
        const paymentDate = new Date(inv.paymentDate);
        const dueDate = new Date(inv.dueDate);

        if (
          paymentDate.getMonth() === currentMonth &&
          paymentDate.getFullYear() === currentYear
        ) {
          totalPaidThisMonth += inv.amount;
        }

        const diffDays = Math.ceil(
          (paymentDate - dueDate) / (1000 * 60 * 60 * 24)
        );

        totalDelayDays += diffDays;
        paidCount++;
      }
    });

    return {
      totalOutstanding,
      totalOverdue,
      totalPaidThisMonth,
      avgPaymentDelay:
        paidCount > 0
          ? Math.round(totalDelayDays / paidCount)
          : 0,
    };
  }, [invoices]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card 
        title="Total Outstanding" 
        value={`₹${summary.totalOutstanding.toLocaleString()}`}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        gradient="from-blue-500 to-blue-600"
        bgGradient="from-blue-50 to-blue-100"
      />
      <Card 
        title="Total Overdue" 
        value={`₹${summary.totalOverdue.toLocaleString()}`}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        gradient="from-red-500 to-red-600"
        bgGradient="from-red-50 to-red-100"
      />
      <Card
        title="Paid (This Month)"
        value={`₹${summary.totalPaidThisMonth.toLocaleString()}`}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        gradient="from-emerald-500 to-emerald-600"
        bgGradient="from-emerald-50 to-emerald-100"
      />
      <Card
        title="Avg Payment Delay"
        value={`${summary.avgPaymentDelay} days`}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        gradient="from-amber-500 to-amber-600"
        bgGradient="from-amber-50 to-amber-100"
      />
    </div>
  );
}

function Card({ title, value, icon, gradient, bgGradient }) {
  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
      
      {/* Animated background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
            {icon}
          </div>
          
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1 group-hover:text-gray-700 transition-colors">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300 inline-block">
            {value}
          </p>
        </div>

        {/* Decorative corner accent */}
        <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${gradient} rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
    </div>
  );
}