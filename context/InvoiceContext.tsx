import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { InvoiceValues } from '../data/form-data';

export interface InvoiceInterface {
  invoices: InvoiceValues[];
  setInvoices: Dispatch<SetStateAction<InvoiceValues[]>>;
  filteredInvoice: InvoiceValues | null;
  setFilteredInvoice: Dispatch<SetStateAction<InvoiceValues | null>>;
}

const defaultState = {
  invoices: [] as InvoiceValues[],
  setInvoices: (invoices: InvoiceValues[]) => {},
  filteredInvoice: null as InvoiceValues | null,
  setFilteredInvoice: (invoice: InvoiceValues | null) => {},
} as InvoiceInterface;

export const InvoiceContext = createContext<InvoiceInterface>(defaultState);

type InvoiceProviderProps = {
  children: ReactNode;
};

const InvoiceProvider = ({ children }: InvoiceProviderProps) => {
  const [invoices, setInvoices] = useState<InvoiceValues[]>([]);
  const [filteredInvoice, setFilteredInvoice] = useState<InvoiceValues | null>(
    null
  );

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        setInvoices,
        filteredInvoice,
        setFilteredInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
