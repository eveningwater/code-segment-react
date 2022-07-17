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
      content: '测试打开的弹框',
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
      content: '测试打开的弹框',
      onOk: async (close) => {
        await handler();
        close();
      },
    });
  };
  return (
    <Space>
      <Button onClick={onClickHandler}>点击我</Button>
      <LoadingModal
        onOk={() => setVisible(false)}
        duration={1000}
        isUseDuration
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        测试打开的弹框
      </LoadingModal>
      <Button onClick={() => onOpenModalHandler()}>点击我</Button>
      <Button onClick={() => onOpenModalHandler2()}>调用接口</Button>
    </Space>
  );
};

export default Index;
