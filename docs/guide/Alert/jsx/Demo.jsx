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
      <Alert type="info" message="This is info" block />
      <Alert type="success" message="This is success" showClose />
      <Alert type="warning" message="This is warning" />
      <Alert type="error" message="This is error" />
    </SpaceBlock>
  );
};

export default Demo;
