import React from 'react';
import ListItem from '../list-item/ListItem';

interface Props {
  data: {
    id: string;
    paymentDue: string;
    clientName: string;
    total: number;
    status: string;
  }[];
}

const List: React.FC<Props> = ({ data }) => {
  return (
    <ul>
      {data.map((item, index) => (
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
