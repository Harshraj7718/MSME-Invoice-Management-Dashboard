export const exportCSV = (invoices) => {
  if (!invoices || invoices.length === 0) {
    alert("No invoices to export");
    return;
  }

  const headers = [
    "Invoice ID",
    "Customer Name",
    "Amount",
    "Invoice Date",
    "Due Date",
    "Payment Date",
    "Status",
  ];

  const rows = invoices.map((inv) => [
    inv.id,
    inv.customerName,
    inv.amount,
    inv.invoiceDate,
    inv.dueDate,
    inv.paymentDate || "",
    inv.paymentDate
      ? "Paid"
      : new Date(inv.dueDate) < new Date()
      ? "Overdue"
      : "Pending",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "invoices.csv");
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
