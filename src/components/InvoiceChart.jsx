import { useContext, useMemo } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import { calculateStatus } from "../utils/invoiceUtils";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = {
  paid: "#10b981",
  pending: "#f59e0b",
  overdue: "#ef4444",
};

const STATUS_CONFIG = {
  paid: {
    color: "#10b981",
    lightColor: "#d1fae5",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  pending: {
    color: "#f59e0b",
    lightColor: "#fef3c7",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  overdue: {
    color: "#ef4444",
    lightColor: "#fee2e2",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

export default function InvoiceChart() {
  const { invoices } = useContext(InvoiceContext);

  const data = useMemo(() => {
    const counts = { paid: 0, pending: 0, overdue: 0 };

    invoices.forEach((inv) => {
      counts[calculateStatus(inv)]++;
    });

    return [
      { name: "Paid", value: counts.paid, status: "paid" },
      { name: "Pending", value: counts.pending, status: "pending" },
      { name: "Overdue", value: counts.overdue, status: "overdue" },
    ];
  }, [invoices]);

  const totalInvoices = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = totalInvoices > 0 
        ? ((data.value / totalInvoices) * 100).toFixed(1) 
        : 0;
      
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-1">{data.name}</p>
          <p className="text-sm text-gray-600">
            Count: <span className="font-medium">{data.value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Percentage: <span className="font-medium">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Hide label if slice is too small

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-semibold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Invoice Status Overview</h2>
              <p className="text-sm text-gray-500">Distribution of invoice statuses</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Invoices</p>
            <p className="text-2xl font-bold text-gray-900">{totalInvoices}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Chart */}
          <div className="relative">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={100}
                  innerRadius={60}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {data.map((entry) => (
                    <Cell 
                      key={entry.status} 
                      fill={COLORS[entry.status]}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-xs text-gray-500 font-medium">Total</p>
                <p className="text-xl font-bold text-gray-900">{totalInvoices}</p>
              </div>
            </div>
          </div>

          {/* Legend with Stats */}
          <div className="space-y-3">
            {data.map((entry) => {
              const percentage = totalInvoices > 0 
                ? ((entry.value / totalInvoices) * 100).toFixed(1) 
                : 0;
              const config = STATUS_CONFIG[entry.status];
              
              return (
                <div
                  key={entry.status}
                  className="group p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                  style={{ backgroundColor: config.lightColor }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-2 rounded-lg shadow-sm"
                        style={{ 
                          backgroundColor: config.color,
                          color: 'white'
                        }}
                      >
                        {config.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 capitalize">
                          {entry.name}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {entry.value} invoice{entry.value !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold" style={{ color: config.color }}>
                        {percentage}%
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 group-hover:shadow-lg"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: config.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}