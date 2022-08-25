import React, { useState } from 'react';
import Modal from '../../../guide/Modal/jsx/Modal';
import Button from '../../../guide/Button/jsx/Button';
import useBodyScrollLock from './useBodyScrollLock';
import styled from '@emotion/styled';

const ScrollModal = (props) => {
  const { visible, onCancel, onOk } = props;

  useBodyScrollLock();

  return (
    <Modal
      title="scrollModal"
      visible={visible}
      showCancel
      cancelText="Cancel"
      okText="Ok"
      onCancel={onCancel}
      onOk={onOk}
    >
      滚动被锁定! <br />
      <Button onClick={onCancel}>点击我解除锁定</Button>
    </Modal>
  );
};

const DemoContainer = styled.div`
  height: 400vh;
  text-align: center;
  padding-top: 100px;
  overflow: auto;
`;

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const handleClose = () => setVisible(false);
  return (
    <DemoContainer>
      <Button onClick={() => setVisible(true)}>打开弹出框</Button>
      {visible && (
        <ScrollModal
          visible={visible}
          onCancel={handleClose}
          onOk={handleClose}
        ></ScrollModal>
      )}
    </DemoContainer>
  );
};

export default Demo;
