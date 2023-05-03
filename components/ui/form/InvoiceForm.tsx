import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import { InvoiceContext } from '../../../context/InvoiceContext';
import FormControl from './form-components/FormControl';
import Button2 from '../buttons/button-2/Button2';
import Button3 from '../buttons/button-3/Button3';
import Button4 from '../buttons/button-4/Button4';
import Button6 from '../buttons/button-6/Button6';
import DeleteIcon from '../../icons/DeleteIcon';

import {
  paymentOptions,
  InvoiceValues,
  initialValues,
  validationSchema,
  getPaymentDue,
  generateInvoiceNumber,
} from '../../../data/form-data';

import styles from './InvoiceForm.module.scss';

interface Props {
  modalCloseHandler: () => void;
}

const InvoiceForm: React.FC<Props> = ({ modalCloseHandler }) => {
  const [isDraft, setIsDraft] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const { invoices, setInvoices, filteredInvoice, setFilteredInvoice } =
    useContext(InvoiceContext);

  useEffect(() => {
    if (filteredInvoice) {
      setisEdit(() => true);
    }
  }, [filteredInvoice]);

  const setDraft = () => {
    setIsDraft(() => true);
  };

  const setComplete = () => {
    setIsDraft(() => false);
  };

  const onSubmit = async (
    values: InvoiceValues,
    { setSubmitting, resetForm }: FormikHelpers<InvoiceValues>
  ) => {
    // ACCUMULATED TOTAL
    const total = values.items.reduce(
      (acc, currValue) => acc + currValue.total,
      0
    );

    // PAYMENT DUE
    const paymentDue = getPaymentDue(values.createdAt, +values.paymentTerms);

    if (!isEdit) {
      // TRANSFORMED DATA
      const transformedData = {
        ...values,
        paymentTerms: +values.paymentTerms,
        total,
        status: isDraft ? 'draft' : 'pending',
        paymentDue,
        id: generateInvoiceNumber(),
      };

      const response = await toast.promise(
        fetch('/api/invoice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transformedData),
        }),
        {
          pending: 'Creating invoice',
          success: 'Invoice created successfully',
          error: 'Something went wrong',
        }
      );

      await response.json();

      // UPDATE INVOICES STATE
      setInvoices((prev) => [transformedData, ...prev]);

      // CLEAN UP AFTER SUBMISSION
      setSubmitting(false);
      resetForm();
      modalCloseHandler();
      return;
    }

    const transformedData = {
      ...filteredInvoice,
      ...values,
      total,
      status: 'pending',
      paymentDue,
    };

    const response = await toast.promise(
      fetch(`/api/invoice/${transformedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      }),
      {
        pending: 'Updating invoice',
        success: 'Updated invoice successfully',
        error: 'Something went wrong',
      }
    );

    await response.json();

    // UPDATE FILTERED INVOICE STATE
    setFilteredInvoice(() => transformedData);

    // UPDATE INVOICES STATE
    const invoiceIndex = invoices.findIndex(
      (item) => item.id === transformedData.id
    );
    const invoicesCopy = [...invoices];
    invoicesCopy.splice(invoiceIndex, 1, transformedData);
    setInvoices(() => invoicesCopy);

    // CLEAN UP AFTER SUBMISSION
    setSubmitting(false);
    resetForm();
    modalCloseHandler();
  };

  return (
    <div className={styles.form}>
      {!filteredInvoice && <h1>New Invoice</h1>}
      {filteredInvoice && (
        <h1>
          Edit <span>#</span>
          {filteredInvoice.id}
        </h1>
      )}

      <Formik
        initialValues={filteredInvoice || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              {/* BILL FROM */}

              <div className={styles['form-column']}>
                <h2>Bill From</h2>
                <FormControl
                  control='input'
                  name='senderAddress.street'
                  label='Street Address'
                  error={
                    formik.errors.senderAddress?.street &&
                    formik.touched.senderAddress?.street
                  }
                />
                <div className={styles['form-row']}>
                  <FormControl
                    control='input'
                    name='senderAddress.city'
                    label='City'
                    error={
                      formik.errors.senderAddress?.city &&
                      formik.touched.senderAddress?.city
                    }
                  />
                  <FormControl
                    control='input'
                    name='senderAddress.postCode'
                    label='Postal Code'
                    error={
                      formik.errors.senderAddress?.postCode &&
                      formik.touched.senderAddress?.postCode
                    }
                  />
                  <FormControl
                    control='input'
                    name='senderAddress.country'
                    label='Country'
                    error={
                      formik.errors.senderAddress?.country &&
                      formik.touched.senderAddress?.country
                    }
                  />
                </div>
              </div>

              {/* BILL TO */}

              <div className={styles['form-column']}>
                <h2>Bill To</h2>
                <FormControl
                  control='input'
                  name='clientName'
                  label="Client's name"
                  error={formik.errors.clientName && formik.touched.clientName}
                />

                <FormControl
                  control='input'
                  name='clientEmail'
                  label="Client's Email"
                  type='email'
                  error={
                    formik.errors.clientEmail && formik.touched.clientEmail
                  }
                />

                <FormControl
                  control='input'
                  name='clientAddress.street'
                  label='Street Address'
                  error={
                    formik.errors.clientAddress?.street &&
                    formik.touched.clientAddress?.street
                  }
                />
                <div className={styles['form-row']}>
                  <FormControl
                    control='input'
                    name='clientAddress.city'
                    label='City'
                    error={
                      formik.errors.clientAddress?.city &&
                      formik.touched.clientAddress?.city
                    }
                  />
                  <FormControl
                    control='input'
                    name='clientAddress.postCode'
                    label='Postal Code'
                    error={
                      formik.errors.clientAddress?.postCode &&
                      formik.touched.clientAddress?.postCode
                    }
                  />
                  <FormControl
                    control='input'
                    name='clientAddress.country'
                    label='Country'
                    error={
                      formik.errors.clientAddress?.country &&
                      formik.touched.clientAddress?.country
                    }
                  />
                </div>
                <div className={styles['form-row']}>
                  <FormControl
                    control='input'
                    name='createdAt'
                    label='Invoice Date'
                    type='date'
                    error={formik.errors.createdAt && formik.touched.createdAt}
                  />

                  <FormControl
                    control='select'
                    name='paymentTerms'
                    label='Payment Terms'
                    options={paymentOptions}
                    error={
                      formik.errors.paymentTerms && formik.touched.paymentTerms
                    }
                  />
                </div>
                <FormControl
                  control='input'
                  name='description'
                  label='Description'
                  placeholder='e.g. Graphic Design Service'
                  error={
                    formik.errors.description && formik.touched.description
                  }
                />
              </div>

              {/* ITEM LIST */}

              <div className={styles['form-column']}>
                <div className={styles['form-column__labels']}>
                  <h3>Item List</h3>
                  {formik.errors.items && (
                    <span>
                      {typeof formik.errors.items === 'string'
                        ? `${formik.errors.items}`
                        : ''}
                    </span>
                  )}
                </div>
                <div className={styles['item-list']}>
                  <div className={styles['item-list__header']}>
                    <span>Item Name</span>
                    <span>Qty.</span>
                    <span>Price</span>
                    <span>Total</span>
                  </div>
                  <FieldArray name='items'>
                    {(fieldArrayProps) => {
                      const { form, push, remove } = fieldArrayProps;
                      const { items } = form.values;

                      return (
                        <>
                          {items.map((item: any, index: number) => {
                            item.total = +item.quantity * +item.price;
                            return (
                              <div
                                key={Math.random()}
                                className={styles['item-list__item']}
                              >
                                <FormControl
                                  control='item'
                                  name={`items[${index}].name`}
                                />
                                <FormControl
                                  control='item'
                                  name={`items[${index}].quantity`}
                                  type='number'
                                />
                                <FormControl
                                  control='item'
                                  name={`items[${index}].price`}
                                  type='number'
                                />
                                <span>
                                  {item.quantity &&
                                  item.price &&
                                  item.quantity > 0 &&
                                  item.price > 0
                                    ? (
                                        +item.quantity * +item.price
                                      ).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                      })
                                    : ''}
                                </span>
                                <DeleteIcon
                                  className=''
                                  onClick={() => remove(index)}
                                />
                              </div>
                            );
                          })}

                          <Button6
                            onClick={() =>
                              push({
                                name: '',
                                quantity: '',
                                price: '',
                              })
                            }
                          >
                            + Add Items
                          </Button6>
                        </>
                      );
                    }}
                  </FieldArray>
                </div>
              </div>

              {/* ERRORS */}
              {Object.keys(formik.errors).length !== 0 && (
                <span className={styles['form-errors']}>
                  All highlighted fields must be filled.
                </span>
              )}

              {/* SUBMIT BUTTONS */}

              {!isEdit && (
                <div className={styles['form-buttons']}>
                  <Button3 type='button' onClick={modalCloseHandler}>
                    Discard
                  </Button3>

                  <div className={styles['form-buttons__save']}>
                    <Button4
                      type='submit'
                      onClick={setDraft}
                      disabled={formik.isSubmitting}
                    >
                      Save as Draft
                    </Button4>
                    <Button2
                      type='submit'
                      onClick={setComplete}
                      disabled={formik.isSubmitting}
                    >
                      Save and Send
                    </Button2>
                  </div>
                </div>
              )}

              {isEdit && (
                <div
                  className={`${styles['form-buttons']} ${styles['form-buttons--edit']}`}
                >
                  <div className={styles['form-buttons__save']}>
                    <Button3 type='button' onClick={modalCloseHandler}>
                      Cancel
                    </Button3>
                    <Button2 type='submit' disabled={formik.isSubmitting}>
                      Save Changes
                    </Button2>
                  </div>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default InvoiceForm;
