import React from 'react';
import { Button } from 'antd';
import useError from './useError';
const Demo = () => {
  const dispatchError = useError('');
  const clickHandler = () => {
    dispatchError(new Error('错误!'));
  };
  return <Button onClick={clickHandler}>抛出错误</Button>;
};

export default Demo;
