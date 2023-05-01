import React, { useState } from 'react';

import ChevronDown from '../../icons/ChevronDown';
import styles from './Filter.module.scss';

const STATUS = ['All', 'Paid', 'Pending', 'Draft'];

interface Props {
  className: string;
  filterHandler: (filter: string) => void;
}

const Filter: React.FC<Props> = ({ className, filterHandler }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [status, setStatus] = useState('');

  const statusClickHandler = (status: string) => {
    setStatus(() => status);
    setShowFilters((prev) => !prev);
    filterHandler(status);
  };

  const showFiltersHandler = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div className={`${styles['filter-label']} ${className}`}>
      <span className={styles['filter-label__label']}>
        {status ? status : 'Filter by status'}
      </span>
      <ChevronDown
        className={styles['filter__icon']}
        onClick={showFiltersHandler}
      />

      {showFilters && (
        <ul className={styles.filters}>
          {STATUS.map((item, index) => (
            <li key={index} onClick={statusClickHandler.bind(null, item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
