import React from 'react';
import Mailto from './Mailto';

const Demo = () => {
  return (
    <Mailto
      email="854806732@qq.com"
      subject="hello & welcome"
      body="hello,world"
    >
      Mail me!
    </Mailto>
  );
};

export default Demo;
