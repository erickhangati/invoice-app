import React from 'react';
import NoData from '../components/no-data/NoData';

const NotFoundPage = () => {
  return (
    <NoData
      heading='404'
      text='Sorry the page that you requested was not found!'
    />
  );
};

export default NotFoundPage;
