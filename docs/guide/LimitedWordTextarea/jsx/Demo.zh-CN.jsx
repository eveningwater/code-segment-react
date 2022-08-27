import React from 'react';
import LimitedWordTextarea from './LimitedWordTextarea';

const Demo = () => {
  return (
    <LimitedWordTextarea
      limit={6}
      value="你好啊,这里的世界!"
    ></LimitedWordTextarea>
  );
};

export default Demo;
