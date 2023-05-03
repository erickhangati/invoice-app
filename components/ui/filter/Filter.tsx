import React, { useState, useContext, useEffect } from 'react';
import { InvoiceContext } from '../../../context/InvoiceContext';
import { InvoiceValues } from '../../../data/form-data';
import ChevronDown from '../../icons/ChevronDown';
import styles from './Filter.module.scss';

const STATUS = ['All', 'Paid', 'Pending', 'Draft'];

interface Props {
  className: string;
}

const Filter: React.FC<Props> = ({ className }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [status, setStatus] = useState('');
  const [initialInvoices, setInitialInvoices] = useState<InvoiceValues[]>([]);
  const { invoices, setInvoices } = useContext(InvoiceContext);

  useEffect(() => {
    if (invoices && initialInvoices.length === 0)
      setInitialInvoices(() => invoices);
  }, [invoices, initialInvoices]);

  // FILTER HANLDER
  const filterHandler = (filter: string) => {
    setInvoices(initialInvoices);

    // // ALL FILTER
    // if (filter === 'All') {
    //   setInvoices(() => invoices);
    //   return;
    // }

    // PAID FILTER
    if (filter === 'Paid') {
      const paid = initialInvoices.filter((item) => item.status === 'paid');
      setInvoices(() => paid);
      return;
    }

    // PENDING FILTER
    if (filter === 'Pending') {
      const pending = initialInvoices.filter(
        (item) => item.status === 'pending'
      );
      setInvoices(() => pending);
      return;
    }

    // DRAFT FILTER
    if (filter === 'Draft') {
      const draft = initialInvoices.filter((item) => item.status === 'draft');
      setInvoices(() => draft);
      return;
    }
  };

  const statusClickHandler = (status: string) => {
    setStatus(() => status);
    setShowFilters((prev) => !prev);
    filterHandler(status);
  };

  const showFiltersHandler = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div className={`${styles['filter-label']} ${className}`}>
      <span className={styles['filter-label__label']}>
        {status ? `Filtered by ${status}` : 'Filter by status'}
      </span>
      <ChevronDown
        className={styles['filter__icon']}
        onClick={showFiltersHandler}
      />

      {showFilters && (
        <ul className={styles.filters}>
          {STATUS.map((item, index) => (
            <li key={index} onClick={statusClickHandler.bind(null, item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
