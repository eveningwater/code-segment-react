import React from 'react';
import { Button, Alert } from 'antd';
import useTitle from './useTitle';

const CustomAlert = () => {
  useTitle('Alert');
  return <Alert message="Alert! Title has changed" type="info"></Alert>;
};

const Demo = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setAlertOpen(!alertOpen)}>Toggle alert</Button>
      {alertOpen && <CustomAlert />}
    </>
  );
};

export default Demo;
