import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button1 from '../components/ui/buttons/button-1/Button1';

const LoadDataPage = () => {
  const router = useRouter();
  const [move, setMove] = useState(false);

  const loadDataHanlder = async () => {
    const response = await fetch('/api/load-data', {
      method: 'POST',
    });
    const results = await response.json();
    console.log(results);
    router.push('/');
  };

  return (
    <>
      <Button1 modalHandler={loadDataHanlder}>Load Sample Data</Button1>
    </>
  );
};

export default LoadDataPage;
