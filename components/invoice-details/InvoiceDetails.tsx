import React from 'react';
import { InvoiceValues } from '../../data/form-data';
import styles from './InvoiceDetails.module.scss';

interface Props {
  invoice: InvoiceValues;
}

const InvoiceDetails: React.FC<Props> = ({ invoice }) => {
  const getDate = (date: any) => {
    const theDate = new Date(date);
    const transformedDate = new Intl.DateTimeFormat('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(theDate);
    return transformedDate;
  };

  const getAmount = (amount: number) => {
    const formatedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KSh',
    }).format(amount);

    return formatedAmount;
  };

  const invoiceDate = getDate(invoice.createdAt);
  const paymentDue = getDate(invoice.paymentDue);
  const formatedTotal = getAmount(invoice.total ? invoice.total : 0);

  return (
    <div className={styles.invoice}>
      <div className={styles['invoice-header']}>
        <div className={styles['invoice-description']}>
          <p className={styles['invoice-description__id']}>
            #<span>{invoice.id}</span>
          </p>
          <p className={styles['invoice-description__title']}>
            {invoice.description}
          </p>
        </div>
        <div className={styles['invoice-address']}>
          <p>{invoice.senderAddress.street}</p>
          <p>{invoice.senderAddress.city}</p>
          <p>{invoice.senderAddress.postCode}</p>
          <p>{invoice.senderAddress.country}</p>
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
            <span>{invoice.clientName}</span>
            <div
              className={`${styles['invoice-address']} ${styles['invoice-address--client']}`}
            >
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>
        </div>
        <div className={styles['client-details__column']}>
          <div className={styles['client-details__row']}>
            <h2>Sent To</h2>
            <span>{invoice.clientEmail}</span>
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
            {invoice.items.map((item, index) => (
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
