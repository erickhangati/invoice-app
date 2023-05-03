import React, { useContext } from 'react';
import { InvoiceContext } from '../../context/InvoiceContext';
import styles from './InvoiceDetails.module.scss';

const InvoiceDetails = () => {
  const { filteredInvoice } = useContext(InvoiceContext);

  const getDate = (date: string | undefined) => {
    if (date === undefined || date === '') return;

    const theDate = new Date(date);
    const transformedDate = new Intl.DateTimeFormat('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(theDate);
    return transformedDate;
  };

  const getAmount = (amount: number | undefined) => {
    if (amount === undefined) return;

    const formatedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KSh',
    }).format(amount);

    return formatedAmount;
  };

  const invoiceDate = getDate(filteredInvoice?.createdAt);
  const paymentDue = getDate(filteredInvoice?.paymentDue);
  const formatedTotal = getAmount(filteredInvoice?.total);

  return (
    <div className={styles.invoice}>
      <div className={styles['invoice-header']}>
        <div className={styles['invoice-description']}>
          <p className={styles['invoice-description__id']}>
            #<span>{filteredInvoice?.id}</span>
          </p>
          <p className={styles['invoice-description__title']}>
            {filteredInvoice?.description}
          </p>
        </div>
        <div className={styles['invoice-address']}>
          <p>{filteredInvoice?.senderAddress.street}</p>
          <p>{filteredInvoice?.senderAddress.city}</p>
          <p>{filteredInvoice?.senderAddress.postCode}</p>
          <p>{filteredInvoice?.senderAddress.country}</p>
        </div>
      </div>

      <div className={styles['client-details']}>
        <div className={styles['client-details__column']}>
          <div className={styles['client-details__row']}>
            <h2>Invoice Date</h2>
            <span>{invoiceDate}</span>
          </div>
          <div className={styles['client-details__row']}>
            <h2>Payment Due</h2>
            <span>{paymentDue}</span>
          </div>
        </div>
        <div className={styles['client-details__column']}>
          <div className={styles['client-details__row']}>
            <h2>Bill To</h2>
            <span>{filteredInvoice?.clientName}</span>
            <div
              className={`${styles['invoice-address']} ${styles['invoice-address--client']}`}
            >
              <p>{filteredInvoice?.clientAddress.street}</p>
              <p>{filteredInvoice?.clientAddress.city}</p>
              <p>{filteredInvoice?.clientAddress.postCode}</p>
              <p>{filteredInvoice?.clientAddress.country}</p>
            </div>
          </div>
        </div>
        <div className={styles['client-details__column']}>
          <div className={styles['client-details__row']}>
            <h2>Sent To</h2>
            <span>{filteredInvoice?.clientEmail}</span>
          </div>
        </div>
      </div>

      <div className={styles['invoice-summary']}>
        <div className={styles['invoice-table']}>
          <div className={styles['invoice-table__header']}>
            <span className={styles['table-header-name']}>Item Name</span>
            <span className={styles['table-header-qty']}>Qty</span>
            <span className={styles['table-header-price']}>Price</span>
            <span className={styles['table-header-total']}>Total</span>
          </div>
          <ul className={styles['invoice-table__list']}>
            {filteredInvoice?.items.map((item, index) => (
              <li key={Math.random()} className={styles['invoice-table__item']}>
                <span className={styles['item-name']}>{item.name}</span>
                <span className={styles['item-qty']}>{item.quantity}</span>
                <span className={styles['item-price']}>
                  {getAmount(+item.price)}
                </span>
                <span className={styles['item-price--mobile']}>
                  {`${item.quantity} x ${getAmount(+item.price)}`}
                </span>
                <span className={styles['item-total']}>
                  {getAmount(+item.total)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['invoice-totals']}>
          <span className={styles['invoice-totals__label']}>Amount Due</span>
          <span className={styles['invoice-totals__amount']}>
            {formatedTotal}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
