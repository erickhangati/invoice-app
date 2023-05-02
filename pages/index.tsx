import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import FilterHeader from '../components/filter-header/FilterHeader';
import List from '../components/list/List';
import FormModal from '../components/ui/modal/FormModal';
import InvoiceForm from '../components/ui/form/InvoiceForm';
import NoData from '../components/no-data/NoData';
import { FilteredInvoiceValues } from '../data/form-data';
import { getConnection } from '../data/db';

interface Props {
  data: FilteredInvoiceValues[];
}

const HomePage: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <NoData heading='Failed to fetch data!' />;
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
    <>
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
      </AnimatePresence>

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
    </>
  );
};

// export const getStaticProps = async () => {
//   const response = await fetch(`${process.env.DOMAIN}/api/invoice`);
//   const data = await response.json();
//   const filteredData = data.results.map((item: InvoiceValues) => ({
//     id: item.id,
//     paymentDue: item.paymentDue,
//     clientName: item.clientName,
//     total: item.total,
//     status: item.status,
//   }));

//   return {
//     props: {
//       data: filteredData,
//       error: null,
//     },
//   };
// };

export const getStaticProps = async () => {
  const { invoiceCollection, client } = await getConnection();
  const res = await invoiceCollection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const data = res.map((item) => ({
    id: item.id,
    paymentDue: item.paymentDue,
    clientName: item.clientName,
    total: item.total,
    status: item.status,
  }));

  client.close();

  return {
    props: {
      data,
    },
  };
};

export default HomePage;
