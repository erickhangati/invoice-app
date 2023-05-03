import React, { useContext } from 'react';
import ListItem from '../list-item/ListItem';
import { InvoiceContext } from '../../context/InvoiceContext';

const List = () => {
  const { invoices } = useContext(InvoiceContext);

  return (
    <ul>
      {invoices.map((item) => (
        <ListItem
          key={Math.random()}
          id={item.id}
          dueDate={item.paymentDue}
          clientName={item.clientName}
          amount={item.total}
          status={item.status}
        />
      ))}
    </ul>
  );
};

export default List;
