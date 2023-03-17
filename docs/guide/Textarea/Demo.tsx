import React from 'react';
import Textarea from './Textarea';

const Demo = () => (
  <Textarea
    placeholder="Insert some text here..."
    onChange={(val) => console.log(val)}
  />
);

export default Demo;
