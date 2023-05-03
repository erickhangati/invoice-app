import * as Yup from 'yup';
import { ReactNode } from 'react';

export const paymentOptions = [
  { key: 'Select option', value: '' },
  { key: 'Next 1 Day', value: '1' },
  { key: 'Next 7 Day', value: '7' },
  { key: 'Next 14 Day', value: '14' },
  { key: 'Next 30 Day', value: '30' },
];

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  modalHandler?: () => void;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
}

export interface FilteredInvoiceValues {
  id: string;
  paymentDue: string;
  clientName: string;
  total: number;
  _id?: string;
  status?: string;
  createdAt?: string;
  description?: string;
  senderAddress?: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientEmail?: string;
  clientAddress?: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  paymentTerms?: string;
  items?: { name: string; quantity: string; price: string; total: number }[];
}

export interface InvoiceValues {
  _id?: string;
  id?: string;
  status?: string;
  createdAt: string;
  paymentDue?: string;
  description: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientName: string;
  clientEmail: string;
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  paymentTerms: string | number;
  items: {
    name: string;
    quantity: string | number;
    price: string | number;
    total: number;
  }[];
  total?: number;
}

export const initialValues: InvoiceValues = {
  createdAt: '',
  description: '',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  clientName: '',
  clientEmail: '',
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  paymentTerms: '',
  items: [],
};

export const validationSchema = Yup.object({
  createdAt: Yup.string().required('Required!'),
  senderAddress: Yup.object({
    street: Yup.string().required('Required!'),
    city: Yup.string().required('Required!'),
    postCode: Yup.string().required('Required!'),
    country: Yup.string().required('Required!'),
  }),
  clientName: Yup.string().required('Required!'),
  clientEmail: Yup.string()
    .required('Required!')
    .email('Invalid email format!'),
  clientAddress: Yup.object({
    street: Yup.string().required('Required!'),
    city: Yup.string().required('Required!'),
    postCode: Yup.string().required('Required!'),
    country: Yup.string().required('Required!'),
  }),
  description: Yup.string().required('Required!'),
  paymentTerms: Yup.string().required('Required!'),
  items: Yup.array()
    .min(1, 'Add at least one item!')
    .of(
      Yup.object().shape({
        name: Yup.string().required(),
        quantity: Yup.number()
          .required('Required!')
          .positive('Quantity must be positive')
          .integer('Quantity must be an integer'),
        price: Yup.number()
          .required('Required!')
          .positive('Price must be positive'),
      })
    ),
});

export const getPaymentDue = (date: string, numOfDays: number) => {
  const initialDate = new Date(date);
  const newDate = new Date(
    initialDate.getTime() + numOfDays * 24 * 60 * 60 * 1000
  );

  const transformedDate = newDate.toISOString().slice(0, 10);

  return transformedDate;
};

let currentPrefix = 'AA';

export const generateInvoiceNumber = () => {
  const prefix = currentPrefix;
  let suffix = Math.floor(Math.random() * 9000) + 1000;

  if (currentPrefix === 'ZZ999') {
    currentPrefix = 'AAA';
  } else if (currentPrefix[currentPrefix.length - 1] === 'Z') {
    let lastLetter = currentPrefix[currentPrefix.length - 2];
    currentPrefix =
      currentPrefix.slice(0, -2) +
      String.fromCharCode(lastLetter.charCodeAt(0) + 1) +
      'A';
  } else {
    currentPrefix =
      currentPrefix.slice(0, -1) +
      String.fromCharCode(
        currentPrefix.charCodeAt(currentPrefix.length - 1) + 1
      );
  }

  return prefix + suffix;
};
