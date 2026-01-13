// Normalize a date to remove time (00:00:00)
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const calculateStatus = (invoice) => {
  const today = normalizeDate(new Date());
  const dueDate = normalizeDate(invoice.dueDate);

  // ✅ Paid has highest priority
  if (invoice.paymentDate) return "paid";

  // ✅ Overdue only if due date is BEFORE today
  if (dueDate < today) return "overdue";

  // ✅ Otherwise pending
  return "pending";
};

export const calculateDaysText = (invoice) => {
  const today = normalizeDate(new Date());
  const dueDate = normalizeDate(invoice.dueDate);

  // ✅ Paid invoices
  if (invoice.paymentDate) {
    const paidDate = normalizeDate(invoice.paymentDate);
    const diff =
      (paidDate - dueDate) / (1000 * 60 * 60 * 24);

    return diff > 0
      ? `Paid ${diff} days late`
      : diff < 0
      ? `Paid ${Math.abs(diff)} days early`
      : "Paid on time";
  }

  // ✅ Pending / Overdue
  const diff =
    (dueDate - today) / (1000 * 60 * 60 * 24);

  return diff >= 0
    ? `Due in ${diff} days`
    : `Overdue by ${Math.abs(diff)} days`;
};
