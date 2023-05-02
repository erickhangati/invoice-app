import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';

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
  if (!filteredData) {
    return <NoData heading='Failed to fetch data!' />;
  }

  const [invoice, setInvoice] = useState(filteredData);
  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isDeleting || showEditInvoice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDeleting, showEditInvoice]);

  const formModalHandler = () => {
    setShowEditInvoice((prev) => !prev);
  };

  const deleteModalHandler = () => {
    setshowDelete((prev) => !prev);
    setIsDeleting((prev) => !prev);
  };

  const markPaidHandler = async () => {
    setIsUpdating(() => true);
    const response = await toast.promise(
      fetch(`/api/invoice/${invoice.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'paid', objectId: invoice._id }),
      }),
      {
        pending: 'Updating status',
        success: 'Marked as paid successfully',
        error: 'Something went wrong',
      }
    );

    const result = await response.json();
    console.log(result);

    setInvoice((prev) => ({ ...prev, status: 'paid' }));
    setIsUpdating(() => false);
  };

  const deleteHandler = async () => {
    setIsUpdating(() => true);
    const response = await toast.promise(
      fetch(`/api/invoice/${invoice.id}`, {
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

    setshowDelete(() => false);

    router.events.on('routeChangeStart', (url: string) => {
      if (url === '/') {
        NProgress.remove();
      }
    });

    setTimeout(() => {
      router.push('/');
    }, 2500);
  };

  const setData = (updatedData: InvoiceValues) => {
    setInvoice(() => updatedData);
  };

  return (
    <>
      <Head>
        <title>{`Invoice No. ${invoice.id}`}</title>
        <meta
          name='description'
          content={`Details for Invoice No. ${invoice.id}`}
        />
      </Head>
      <AnimatePresence>
        {showEditInvoice && (
          <FormModal formModalHandler={formModalHandler}>
            <InvoiceForm
              formModalHandler={formModalHandler}
              data={invoice}
              setData={setData}
            />
          </FormModal>
        )}
      </AnimatePresence>

      {showDelete && (
        <DeleteModal
          deleteModalHandler={deleteModalHandler}
          isUpdating={isUpdating}
        >
          <DeleteItem
            id={invoice.id}
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
        status={invoice.status}
        formModalHandler={formModalHandler}
        deleteModalHandler={deleteModalHandler}
        markPaidHandler={markPaidHandler}
      />
      <InvoiceDetails invoice={invoice} />
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
