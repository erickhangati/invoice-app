import React from 'react';

import TextField from '../../inputs/text-field/TextField';
import DropDown from '../../inputs/dropdown/DropDown';
import Calender from '../../calender/Calender';
import Button6 from '../../buttons/button-6/Button6';
import styles from './Form.module.scss';

const DROP_DOWN_OPTIONS = [
  'Net 1 Day',
  'Net 7 Days',
  'Net 14 Days',
  'Net 30 Days',
];

const Form = () => {
  return (
    <form className={styles.form}>
      <h1>New Invoice</h1>

      <div className={styles['form-group--column']}>
        <h2>Bill From</h2>
        <TextField
          id='street-address'
          type='text'
          label='Street Address'
          placeholder=''
        />

        <div className={styles['form-group--row']}>
          <TextField id='city' type='text' label='City' placeholder='' />
          <TextField
            id='postal-code'
            type='text'
            label='Postal Code'
            placeholder=''
          />
          <TextField id='country' type='text' label='Country' placeholder='' />
        </div>
      </div>

      <div className={styles['form-group--column']}>
        <h2>Bill To</h2>
        <TextField id='name' type='text' label="Client's Name" placeholder='' />
        <TextField
          id='email'
          type='text'
          label="Client's Email"
          placeholder='e.g. email@example.com'
        />
        <TextField
          id='street-address'
          type='text'
          label='Street Address'
          placeholder=''
        />

        <div className={styles['form-group--row']}>
          <TextField id='city' type='text' label='City' placeholder='' />
          <TextField
            id='postal-code'
            type='text'
            label='Postal Code'
            placeholder=''
          />
          <TextField id='country' type='text' label='Country' placeholder='' />
        </div>
      </div>

      <div className={styles['form-group--column']}>
        <div className={styles['form-group--row']}>
          <Calender id='calender' label='Issue Date' />
          <DropDown
            id='payment-terms'
            options={DROP_DOWN_OPTIONS}
            label='Payment Terms'
          />
        </div>

        <TextField
          id='product-description'
          type='text'
          label='Product Description'
          placeholder='e.g. Graphic Design Service'
        />
      </div>

      <div className={styles['form-group--column']}>
        <h2 className={styles['form-items__heading']}>Item List</h2>
        <div className={styles['form-items__heading-items']}>
          <span>Item Name</span>
          <span>Qty</span>
          <span>Price</span>
          <span className={styles['form-items__heading-items--total']}>
            Total
          </span>
        </div>
        <div className={styles['form-items__list']}>
          <TextField
            id='product-description'
            type='text'
            label=''
            placeholder=''
          />
          <TextField
            id='product-description'
            type='text'
            label=''
            placeholder=''
          />
          <TextField
            id='product-description'
            type='text'
            label=''
            placeholder=''
          />
          <span>15000</span>
        </div>
        <Button6>+ Add New Item</Button6>
      </div>
    </form>
  );
};

export default Form;
