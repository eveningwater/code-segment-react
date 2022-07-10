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
      <Alert type="info" message="这是信息提示，并占满空间" block />
      <Alert type="success" message="这是成功提示，并显示关闭按钮" showClose />
      <Alert
        type="warning"
        message="这是警告提示，不占满空间，不显示关闭按钮"
      />
      <Alert type="error" message="这是错误提示，不占满空间，不显示关闭按钮" />
    </SpaceBlock>
  );
};

export default Demo;
