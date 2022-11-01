import React from 'react';
import { Button, Alert } from 'antd';
import useTitle from './useTitle';

const CustomAlert = () => {
  useTitle('警告');
  return <Alert message="警告!标题已经被修改。" type="info"></Alert>;
};

const Demo = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setAlertOpen(!alertOpen)}>切换警告</Button>
      {alertOpen && <CustomAlert />}
    </>
  );
};

export default Demo;
