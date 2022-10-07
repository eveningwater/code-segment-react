import React from 'react';
import useKeyPress from './useKeyPress';

const Demo = () => {
  const wPressed = useKeyPress('w');
  return <p>w键{!wPressed ? '没 ' : ''}有被按下!</p>;
};

export default Demo;
