import React from 'react';
import { Button } from 'antd';
import useToggler from './useToggler';

const Demo = () => {
  const [val, toggleVal] = useToggler(false);
  return <Button onClick={toggleVal}>{val ? '开' : '关'}</Button>;
};
export default Demo;
