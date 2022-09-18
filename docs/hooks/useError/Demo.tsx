import React from 'react';
import { Button } from 'antd';
import useError from './useError';
const Demo = () => {
  const dispatchError = useError('');
  const clickHandler = () => {
    dispatchError(new Error('Error!'));
  };
  return <Button onClick={clickHandler}>Throw error</Button>;
};

export default Demo;
