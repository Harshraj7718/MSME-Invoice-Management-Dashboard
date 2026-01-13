export const dummyInvoices = Array.from({ length: 120 }, (_, i) => {
  const index = i + 1;
  const terms = [7, 15, 30, 45, 60][i % 5];

  // Spread dates around TODAY (important)
  const today = new Date();
  const invoiceDate = new Date(today);
  invoiceDate.setDate(today.getDate() - (i % 40));

  const dueDate = new Date(invoiceDate);
  dueDate.setDate(invoiceDate.getDate() + terms);

  const isPaid = i % 4 === 0;
  const paymentDate = isPaid
    ? new Date(dueDate.getTime() + 2 * 86400000)
    : null;

  return {
    id: `INV-${String(index).padStart(4, "0")}`,
    customerName: `Customer ${index}`,
    amount: 10000 + (i % 10) * 5000,
    invoiceDate: invoiceDate.toISOString().slice(0, 10),
    paymentTerms: terms,
    dueDate: dueDate.toISOString().slice(0, 10),
    paymentDate: paymentDate
      ? paymentDate.toISOString().slice(0, 10)
      : null,
  };
});
