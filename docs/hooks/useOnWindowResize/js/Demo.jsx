import React from 'react';
import useOnWindowResize from './useOnWindowResize';

const Demo = () => {
  useOnWindowResize(() => {
    console.log(`window size: (${window.innerWidth}, ${window.innerHeight})`);
  });
  return <p>Resize the window and check the console.</p>;
};

export default Demo;
