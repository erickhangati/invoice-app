import React from 'react';
import { useRouter } from 'next/router';
import Button1 from '../components/ui/buttons/button-1/Button1';

const DeleteDataPage = () => {
  const router = useRouter();

  const deletDataHanlder = async () => {
    const response = await fetch('/api/delete-data', {
      method: 'DELETE',
    });
    const results = await response.json();
    console.log(results);
    router.push('/');
  };

  return (
    <>
      <Button1 modalOpenHandler={deletDataHanlder}>Delete Data</Button1>
    </>
  );
};

export default DeleteDataPage;
