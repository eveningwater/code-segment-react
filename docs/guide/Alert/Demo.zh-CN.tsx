import React from 'react';
import { Space } from 'antd';
import 'antd/dist/antd.less';
import styled from '@emotion/styled';
import Alert from './Alert';
const SpaceBlock = styled(Space)`
  width: 100%;
`;
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
