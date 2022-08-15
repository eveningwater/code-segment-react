import React from 'react';
import Button from './Button';
import { Space } from 'antd';
import styled from '@emotion/styled';

const MarginTop = styled.div`
  margin-top: 10px;
`;
const Demo = () => {
  return (
    <>
      <Space wrap>
        <Button>default button</Button>
        <Button type="link">link button</Button>
        <Button type="link" href="https://www.eveningwater.com" target="_blank">
          Hyperlink
        </Button>
        <Button ripple>ripple button</Button>
        <Button type="primary">primary button</Button>
        <Button type="dashed">dashed button</Button>
        <Button type="text">text button</Button>
        <Button danger>danger button</Button>
        <Button danger disabled>
          disabled button
        </Button>
      </Space>
      <MarginTop>
        <Button block>block button</Button>
      </MarginTop>
    </>
  );
};

export default Demo;
