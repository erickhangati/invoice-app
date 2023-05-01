import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import FilterHeader from '../components/filter-header/FilterHeader';
import List from '../components/list/List';
import FormModal from '../components/ui/modal/FormModal';
import InvoiceForm from '../components/ui/form/InvoiceForm';
import NoData from '../components/no-data/NoData';
import { InvoiceValues, FilteredInvoiceValues } from '../data/form-data';

interface Props {
  data: FilteredInvoiceValues[];
  error: string;
}

const HomePage: React.FC<Props> = ({ data, error }) => {
  if (error) {
    return <NoData heading={error} />;
  }

  const [filteredData, setFilteredData] = useState(data);
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  useEffect(() => {
    if (showNewInvoice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showNewInvoice]);

  const filterHandler = (filter: string) => {
    if (filter === 'All') {
      setFilteredData(() => data);
      return;
    }

    if (filter === 'Paid') {
      const paid = data.filter((item) => item.status === 'paid');
      setFilteredData(() => paid);
      return;
    }

    if (filter === 'Pending') {
      const pending = data.filter((item) => item.status === 'pending');
      setFilteredData(() => pending);
      return;
    }

    if (filter === 'Draft') {
      const draft = data.filter((item) => item.status === 'draft');
      setFilteredData(() => draft);
      return;
    }
  };

  const formModalHandler = () => {
    setShowNewInvoice(!showNewInvoice);
  };

  const updateFilteredData = (newItem: FilteredInvoiceValues) => {
    const copiedData = filteredData.slice();
    copiedData.unshift(newItem);
    setFilteredData(copiedData);
  };

  return (
    <AnimatePresence>
      {showNewInvoice && (
        <FormModal formModalHandler={formModalHandler} key={Math.random()}>
          <InvoiceForm
            formModalHandler={formModalHandler}
            updateFilteredData={updateFilteredData}
            key={Math.random()}
          />
        </FormModal>
      )}

      <FilterHeader
        invoiceNum={filteredData.length}
        filterHandler={filterHandler}
        formModalHandler={formModalHandler}
      />
      {filteredData.length !== 0 && <List data={filteredData} />}
      {filteredData.length === 0 && (
        <NoData
          heading='There is nothing here'
          text='Create an invoice by clicking the New button and get started'
        />
      )}
    </AnimatePresence>
  );
};

export const getStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.domain}/api/invoice`);

    const data = await response.json();
    const filteredData = data.results.map((item: InvoiceValues) => ({
      id: item.id,
      paymentDue: item.paymentDue,
      clientName: item.clientName,
      total: item.total,
      status: item.status,
    }));

    return {
      props: {
        data: filteredData,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: 'Failed to fetch data!',
      },
    };
  }
};

export default HomePage;
