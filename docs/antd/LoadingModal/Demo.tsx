import { Button, Space } from 'antd';
import React, { useState } from 'react';
import LoadingModal, { onLoadingModal } from './LoadingModal';

const Index = () => {
  const [visible, setVisible] = useState(false);
  const onClickHandler = () => {
    setVisible(true);
  };
  const onOpenModalHandler = () => {
    onLoadingModal({
      content: 'Open the modal of test',
      duration: 2000,
      isUseDuration: true,
      onOk: (close) => close(),
    });
  };
  //模拟调用接口的方法
  const handler = async () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('success');
      }, 2000);
    });
  const onOpenModalHandler2 = () => {
    onLoadingModal({
      content: 'Open the modal of test',
      onOk: async (close) => {
        await handler();
        close();
      },
    });
  };
  return (
    <Space>
      <Button onClick={onClickHandler}>clicked me</Button>
      <LoadingModal
        onOk={() => setVisible(false)}
        duration={1000}
        isUseDuration
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        the modal of test
      </LoadingModal>
      <Button onClick={() => onOpenModalHandler()}>clicked me</Button>
      <Button onClick={() => onOpenModalHandler2()}>apply interface</Button>
    </Space>
  );
};

export default Index;
