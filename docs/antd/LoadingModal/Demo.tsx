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
      onOk: (close) => close(),
    });
  };
  return (
    <Space>
      <Button onClick={onClickHandler}>点击我</Button>
      <LoadingModal
        onOk={() => setVisible(false)}
        duration={1000}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        测试打开的弹框
      </LoadingModal>
      <Button onClick={() => onOpenModalHandler()}>点击我</Button>
    </Space>
  );
};

export default Index;
