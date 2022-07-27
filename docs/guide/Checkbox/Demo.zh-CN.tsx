import React from 'react';
import Checkbox from './Checkbox';

const Demo = () => {
  const onChange = (v: boolean) => {
    console.log(v);
  };
  return <Checkbox onChange={onChange}>复选框</Checkbox>;
};

export default Demo;
