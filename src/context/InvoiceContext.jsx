import { createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { dummyInvoices } from "../data/dummyInvoices";

export const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useLocalStorage(
    "invoices",
    dummyInvoices
  );

  const value = useMemo(
    () => ({ invoices, setInvoices }),
    [invoices]
  );

  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
}
