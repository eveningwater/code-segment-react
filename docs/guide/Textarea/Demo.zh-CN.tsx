import React from 'react';
import Textarea from './Textarea';

const Demo = () => (
  <Textarea
    placeholder="在这里输入一些文本..."
    onChange={(val) => console.log(val)}
  />
);

export default Demo;
