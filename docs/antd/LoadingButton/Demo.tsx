import { Space } from 'antd';
import React from 'react';
import LoadingButton from './LoadingButton';

const Index = () => {
  const handler = async () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('success');
      }, 2000);
    });

  const onClickHandler = async () => {
    await handler();
  };
  const onClickHandler2 = () => {
    console.log('设置时间');
  };
  const onClickHandler3 = () => {
    console.log('加载中时间的最大值为:10000');
  };
  const onClickHandler4 = () => {
    console.log('默认值是1000');
  };
  return (
    <Space>
      <LoadingButton onClick={onClickHandler} duration={1000}>
        点击我
      </LoadingButton>
      <LoadingButton onClick={onClickHandler2} duration={500}>
        点击我
      </LoadingButton>
      <LoadingButton onClick={onClickHandler3} duration={100000}>
        点击我
      </LoadingButton>
      <LoadingButton onClick={onClickHandler4}>点击我</LoadingButton>
    </Space>
  );
};

export default Index;
