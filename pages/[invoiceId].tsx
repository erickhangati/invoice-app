import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';

import { InvoiceContext } from '../context/InvoiceContext';
import BackButton from '../components/ui/buttons/back-button/BackButton';
import EditHeader from '../components/edit-header/EditHeader';
import FormModal from '../components/ui/modal/FormModal';
import DeleteModal from '../components/ui/modal/DeleteModal';
import InvoiceForm from '../components/ui/form/InvoiceForm';
import DeleteItem from '../components/delete-item/DeleteItem';
import InvoiceDetails from '../components/invoice-details/InvoiceDetails';
import { InvoiceValues } from '../data/form-data';
import NoData from '../components/no-data/NoData';
import { getConnection } from '../data/db';

interface Props {
  filteredData: InvoiceValues;
}

const InvoicePage: React.FC<Props> = ({ filteredData }) => {
  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { invoices, setInvoices, filteredInvoice, setFilteredInvoice } =
    useContext(InvoiceContext);

  const router = useRouter();

  useEffect(() => {
    // UPDATE FILTERED INVOICE
    if (filteredData && filteredInvoice === null) {
      setFilteredInvoice(() => filteredData);
    }

    // HIDE VERTICAL SCROLL ON MODAL DISPLAY
    if (isDeleting || showEditInvoice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDeleting, filteredData, showEditInvoice, filteredInvoice]);

  const modalOpenHandler = () => {
    setShowEditInvoice(() => true);
  };

  const modalCloseHandler = () => {
    setShowEditInvoice(() => false);
  };

  const deleteModalHandler = () => {
    setshowDelete((prev) => !prev);
    setIsDeleting((prev) => !prev);
  };

  const markPaidHandler = async () => {
    if (filteredInvoice && setFilteredInvoice) {
      setIsUpdating(() => true);
      const response = await toast.promise(
        fetch(`/api/invoice/${filteredInvoice.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'paid',
            objectId: filteredInvoice._id,
          }),
        }),
        {
          pending: 'Updating status',
          success: 'Marked as paid successfully',
          error: 'Something went wrong',
        }
      );

      const result = await response.json();
      console.log(result);

      // UPDATE FILTERED INVOICE STATE
      const updatedInvoice = { ...filteredInvoice, status: 'paid' };
      setFilteredInvoice(() => updatedInvoice);

      // UPDATE INVOICES STATE
      const invoiceIndex = invoices.findIndex(
        (item) => item.id === filteredInvoice.id
      );
      const invoicesCopy = [...invoices];
      invoicesCopy.splice(invoiceIndex, 1, updatedInvoice);
      setInvoices(() => invoicesCopy);

      setIsUpdating(() => false);
    }
  };

  const deleteHandler = async () => {
    if (filteredInvoice) {
      setIsUpdating(() => true);
      const response = await toast.promise(
        fetch(`/api/invoice/${filteredInvoice.id}`, {
          method: 'DELETE',
        }),
        {
          pending: 'Deleting invoice',
          success: 'Deleted successfully. Updating...',
          error: 'Something went wrong',
        }
      );

      const result = await response.json();
      console.log(result);

      // UPDATE STATE
      const newInvoices = invoices.filter(
        (item) => item.id !== filteredInvoice.id
      );
      setInvoices(() => newInvoices);

      setshowDelete(() => false);

      router.events.on('routeChangeStart', (url: string) => {
        if (url === '/') {
          NProgress.remove();
        }
      });

      setTimeout(() => {
        router.push('/');
      }, 2500);
    }
  };

  if (!filteredInvoice) {
    return <NoData heading='Failed to fetch data!' />;
  }

  return (
    <>
      <Head>
        <title>{`Invoice No. ${
          filteredInvoice ? filteredInvoice.id : ''
        }`}</title>
        <meta
          name='description'
          content={`Details for Invoice No. ${
            filteredInvoice ? filteredInvoice.id : ''
          }`}
        />
      </Head>
      <AnimatePresence>
        {showEditInvoice && (
          <FormModal modalCloseHandler={modalCloseHandler}>
            <InvoiceForm modalCloseHandler={modalCloseHandler} />
          </FormModal>
        )}
      </AnimatePresence>

      {showDelete && (
        <DeleteModal
          deleteModalHandler={deleteModalHandler}
          isUpdating={isUpdating}
          modalCloseHandler={modalCloseHandler}
        >
          <DeleteItem
            id={filteredInvoice ? filteredInvoice.id : ''}
            deleteModalHandler={deleteModalHandler}
            deleteHandler={deleteHandler}
            isUpdating={isUpdating}
          />
        </DeleteModal>
      )}

      <Link href='/'>
        <BackButton label='Go back' />
      </Link>
      <EditHeader
        isUpdating={isUpdating}
        status={filteredInvoice ? filteredInvoice.status : ''}
        modalOpenHandler={modalOpenHandler}
        deleteModalHandler={deleteModalHandler}
        markPaidHandler={markPaidHandler}
      />
      <InvoiceDetails />
    </>
  );
};

interface MyContent {
  params: {
    invoiceId: string;
  };
}

export const getStaticProps = async (context: MyContent) => {
  const { invoiceId } = context.params;
  const { client, invoiceCollection } = await getConnection();
  const results = await invoiceCollection.findOne({ id: invoiceId });
  client.close();

  if (!results) {
    return {
      notFound: true,
    };
  }

  const filteredData = {
    _id: results?._id.toString(),
    id: results?.id,
    createdAt: results?.createdAt,
    paymentDue: results?.paymentDue,
    description: results?.description,
    paymentTerms: results?.paymentTerms,
    clientName: results?.clientName,
    clientEmail: results?.clientEmail,
    status: results?.status,
    senderAddress: {
      street: results?.senderAddress.street,
      city: results?.senderAddress.city,
      postCode: results?.senderAddress.postCode,
      country: results?.senderAddress.country,
    },
    clientAddress: {
      street: results?.clientAddress.street,
      city: results?.clientAddress.city,
      postCode: results?.clientAddress.postCode,
      country: results?.clientAddress.country,
    },
    items: results?.items.map((item: any) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.total,
    })),
    total: results?.total,
  };

  return {
    props: {
      filteredData,
    },
  };
};

export const getStaticPaths = async () => {
  const { invoiceCollection, client } = await getConnection();
  const res = await invoiceCollection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  const paths = res.map((item) => ({
    params: { invoiceId: item.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

// export const getStaticProps = async (context: MyContent) => {
//   const { invoiceId } = context.params;
//   const response = await fetch(
//     `${process.env.DOMAIN}/api/invoice/${invoiceId}`
//   );
//   const data = await response.json();

//   return {
//     props: {
//       filteredData: data.results,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const response = await fetch(`${process.env.DOMAIN}/api/invoice`);
//   const data = await response.json();
//   const paths = data.results.map((item: InvoiceValues) => ({
//     params: { invoiceId: item.id },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

export default InvoicePage;
