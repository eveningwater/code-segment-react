import { Space } from 'antd';
import React from 'react';
import LoadingButton from './LoadingButton';

const Index = () => {
  // 如果是使用的接口，请不要传isUseDuration,并且无需设置duration
  //模拟调用接口的方法
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
  const onClickHandler5 = async () => {
    await handler();
  };
  return (
    <Space>
      <LoadingButton onClick={onClickHandler} duration={1000} isUseDuration>
        点击我
      </LoadingButton>
      <LoadingButton onClick={onClickHandler2} duration={500} isUseDuration>
        点击我
      </LoadingButton>
      <LoadingButton onClick={onClickHandler3} duration={100000} isUseDuration>
        点击我
      </LoadingButton>
      <LoadingButton onClick={onClickHandler4} isUseDuration>
        点击我
      </LoadingButton>
      <LoadingButton onClick={onClickHandler5}>调用接口</LoadingButton>
    </Space>
  );
};

export default Index;
