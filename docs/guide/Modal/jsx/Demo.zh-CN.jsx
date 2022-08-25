import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Space } from 'antd';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const onCreate = () => {
    Modal.confirm({
      title: '这是弹框的标题',
      content: (
        <>
          <p>这是弹框的内容</p>
          <p>这是弹框的内容</p>
          <p>这是弹框的内容</p>
        </>
      ),
    });
  };
  return (
    <Space>
      <Button onClick={() => setVisible(true)}>clicked me</Button>
      <Button onClick={onCreate}>clicked me</Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title="这是弹框的标题"
        showCancel
        onOk={() => setVisible(false)}
      >
        <p>这是弹框的内容</p>
        <p>这是弹框的内容</p>
        <p>这是弹框的内容</p>
      </Modal>
    </Space>
  );
};

export default Demo;
