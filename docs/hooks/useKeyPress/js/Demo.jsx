import React from 'react';
import useKeyPress from './useKeyPress';

const Demo = () => {
  const wPressed = useKeyPress('w');
  return <p>The "w" key is {!wPressed ? 'not ' : ''}pressed!</p>;
};

export default Demo;
