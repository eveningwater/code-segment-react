import React, { useState, useEffect } from 'react';
import './alert.less';
import { Space } from 'antd';
import 'antd/dist/antd.less';
import styled from '@emotion/styled';

interface AlertPropType {
  isDefaultShown: boolean;
  timeout: number;
  type: string;
  message: string;
  showClose: boolean;
  block: boolean;
}

const SpaceBlock = styled(Space)`
  width: 100%;
`;

const Alert = (props: Partial<AlertPropType>) => {
  const {
    isDefaultShown,
    timeout = 250,
    type,
    message,
    showClose,
    block,
  } = props;
  const [isShown, setIsShown] = useState(isDefaultShown);
  const [isLeaving, setIsLeaving] = useState(false);

  let timer: number | null = null;
  useEffect(() => {
    setIsShown(true);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeout, timer, isDefaultShown]);

  const closeAlert = () => {
    setIsLeaving(true);
    timer = setTimeout(() => {
      setIsLeaving(false);
      setIsShown(false);
    }, timeout);
  };

  return isShown ? (
    <div
      className={`alert ${'alert-' + type}${isLeaving ? ' leaving' : ''}${
        block ? ' alert-block' : ''
      }`}
      role="alert"
    >
      <button
        className="alert-close"
        onClick={closeAlert}
        style={{ display: showClose ? 'block' : 'none' }}
      >
        &times;
      </button>
      {message}
    </div>
  ) : null;
};

const Demo = () => {
  return (
    <SpaceBlock direction="vertical">
      <Alert type="info" message="This is info" block />
      <Alert type="success" message="This is success" showClose />
      <Alert type="warning" message="This is warning" />
      <Alert type="error" message="This is error" />
    </SpaceBlock>
  );
};

export default Demo;
