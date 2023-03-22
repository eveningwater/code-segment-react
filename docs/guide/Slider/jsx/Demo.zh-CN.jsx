import React from 'react';
import Slider from './Slider';

const Demo = () => {
  return (
    <Slider min={1} max={1000} onChange={(v) => console.log('值:', v)}></Slider>
  );
};

export default Demo;
