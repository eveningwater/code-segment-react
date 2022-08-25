import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Space } from 'antd';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const onCreate = () => {
    Modal.confirm({
      title: 'The modal title',
      content: (
        <>
          <p>The modal content</p>
          <p>The modal content</p>
          <p>The modal content</p>
        </>
      ),
      cancelText: 'Cancel',
      okText: 'Sure',
    });
  };
  return (
    <Space>
      <Button onClick={() => setVisible(true)}>clicked me</Button>
      <Button onClick={onCreate}>clicked me</Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title="The modal title"
        showCancel
        onOk={() => setVisible(false)}
        cancelText="Cancel"
        okText="Sure"
      >
        <p>The modal content</p>
        <p>The modal content</p>
        <p>The modal content</p>
      </Modal>
    </Space>
  );
};

export default Demo;
