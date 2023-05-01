import React, { useEffect, useState } from 'react';
import Filter from '../ui/filter/Filter';
import Button1 from '../ui/buttons/button-1/Button1';

import styles from './FilterHeader.module.scss';

interface Props {
  invoiceNum: number;
  filterHandler: (filter: string) => void;
  formModalHandler: () => void;
}

const FilterHeader: React.FC<Props> = ({
  invoiceNum,
  filterHandler,
  formModalHandler,
}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const deviceWidth = window.innerWidth;
    setScreenWidth(() => deviceWidth);
  }, []);

  return (
    <div className={styles['filter-header']}>
      <div className={styles['filter-header__invoices']}>
        <h1>Invoices</h1>
        <span>
          {invoiceNum === 0
            ? 'No invoices'
            : `There are ${invoiceNum} total invoice${
                invoiceNum > 1 ? 's' : ''
              }`}
        </span>
      </div>
      {invoiceNum !== 0 && (
        <Filter
          className={styles['filter-header__filter']}
          filterHandler={filterHandler}
        />
      )}
      <Button1 modalHandler={formModalHandler}>
        {screenWidth > 578 ? 'New Invoice' : 'New'}
      </Button1>
    </div>
  );
};

export default FilterHeader;
