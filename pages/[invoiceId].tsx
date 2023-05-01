import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import BackButton from '../components/ui/buttons/back-button/BackButton';
import EditHeader from '../components/edit-header/EditHeader';
import FormModal from '../components/ui/modal/FormModal';
import DeleteModal from '../components/ui/modal/DeleteModal';
import InvoiceForm from '../components/ui/form/InvoiceForm';
import DeleteItem from '../components/delete-item/DeleteItem';
import InvoiceDetails from '../components/invoice-details/InvoiceDetails';
import { InvoiceValues } from '../data/form-data';
import { AnimatePresence } from 'framer-motion';

interface Props {
  filteredData: InvoiceValues;
}

const InvoicePage: React.FC<Props> = ({ filteredData }) => {
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

  try {
    const response = await fetch(`${process.env.domain}/${invoiceId}`);
    const data = await response.json();

    return {
      props: {
        filteredData: data.results,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: null,
      error: 'Could not fetch data!',
    };
  }
};

export const getStaticPaths = async () => {
  const response = await fetch(`${process.env.domain}/api/invoice`);
  const data = await response.json();
  const paths = data.results.map((item: InvoiceValues) => ({
    params: { invoiceId: item.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default InvoicePage;
