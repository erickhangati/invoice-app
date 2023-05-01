import React from 'react';
import IllustrationEmpty from '../icons/IllustrationEmpty';
import styles from './NoData.module.scss';

interface Props {
  heading: string;
  text?: string;
}

const NoData: React.FC<Props> = ({ heading, text }) => {
  return (
    <>
      <div className={styles['no-data']}>
        <IllustrationEmpty />
        <div className={styles['no-data__text']}>
          <h2>{heading}</h2>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default NoData;
