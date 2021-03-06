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
    console.log('Set the duration');
  };
  const onClickHandler3 = () => {
    console.log('The max value is 10000');
  };
  const onClickHandler4 = () => {
    console.log('The default value is 1000');
  };
  const onClickHandler5 = async () => {
    await handler();
  };
  return (
    <Space>
      <LoadingButton onClick={onClickHandler} duration={1000} isUseDuration>
        clicked me
      </LoadingButton>
      <LoadingButton onClick={onClickHandler2} duration={500} isUseDuration>
        clicked me
      </LoadingButton>
      <LoadingButton onClick={onClickHandler3} duration={100000} isUseDuration>
        clicked me
      </LoadingButton>
      <LoadingButton onClick={onClickHandler4} isUseDuration>
        clicked me
      </LoadingButton>
      <LoadingButton onClick={onClickHandler5}>apply interface</LoadingButton>
    </Space>
  );
};

export default Index;
