import React from 'react';
import LimitedWordTextarea from './LimitedWordTextarea';

const Demo = () => {
  return (
    <LimitedWordTextarea limit={5} value="hello,there!"></LimitedWordTextarea>
  );
};

export default Demo;
