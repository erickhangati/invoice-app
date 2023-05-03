import React, { useEffect, useState, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';

import { InvoiceContext } from '../context/InvoiceContext';
import FilterHeader from '../components/filter-header/FilterHeader';
import List from '../components/list/List';
import FormModal from '../components/ui/modal/FormModal';
import InvoiceForm from '../components/ui/form/InvoiceForm';
import NoData from '../components/no-data/NoData';
import { InvoiceValues } from '../data/form-data';
import { getConnection } from '../data/db';

interface Props {
  data: InvoiceValues[];
}

const HomePage: React.FC<Props> = ({ data }) => {
  const [formModal, setFormModal] = useState(false);
  const { invoices, setInvoices, setFilteredInvoice } =
    useContext(InvoiceContext);

  useEffect(() => {
    // LOAD DATA TO APP STATE
    if (data && invoices.length === 0) {
      setInvoices(() => data);
    }

    // CLEAR FILTERED INVOICE
    setFilteredInvoice(null);

    // HIDE VERTICAL SCROLL IF MODAL DISPLAY
    if (formModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [formModal, data]);

  // FORM MODAL HANDLER
  const modalOpenHandler = () => {
    setFormModal(() => true);
  };

  const modalCloseHandler = () => {
    setFormModal(() => false);
  };

  // IF NO DATA DISPLAY
  if (!invoices) {
    return <NoData heading='Failed to fetch data!' />;
  }

  return (
    <>
      <Head>
        <title>Home | Invoice List</title>
        <meta
          name='description'
          content='Find the list of invoices generated'
        />
      </Head>
      <AnimatePresence>
        {formModal && (
          <FormModal key={Math.random()} modalCloseHandler={modalCloseHandler}>
            <InvoiceForm
              key={Math.random()}
              modalCloseHandler={modalCloseHandler}
            />
          </FormModal>
        )}
      </AnimatePresence>

      <FilterHeader
        invoiceNum={invoices.length}
        modalOpenHandler={modalOpenHandler}
      />
      {invoices.length !== 0 && <List />}
      {invoices.length === 0 && (
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
  client.close();

  if (!res) {
    return {
      notFound: true,
    };
  }

  const data = res.map((item) => ({
    id: item.id,
    paymentDue: item.paymentDue,
    clientName: item.clientName,
    total: item.total,
    status: item.status,
  }));

  return {
    props: {
      data,
      data2: data,
    },
    revalidate: 60,
  };
};

export default HomePage;
