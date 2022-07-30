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
        <Button>默认按钮</Button>
        <Button type="link">链接按钮</Button>
        <Button type="link" href="https://www.eveningwater.com" target="_blank">
          超链接
        </Button>
        <Button ripple>波浪按钮</Button>
        <Button type="primary">基本按钮</Button>
        <Button type="dashed">虚线按钮</Button>
        <Button type="text">文本按钮</Button>
        <Button danger>危险按钮</Button>
        <Button danger disabled>
          禁用按钮
        </Button>
        <Button size="small">小按钮</Button>
        <Button size="large">大按钮</Button>
      </Space>
      <MarginTop>
        <Button block>块按钮</Button>
      </MarginTop>
    </>
  );
};

export default Demo;
