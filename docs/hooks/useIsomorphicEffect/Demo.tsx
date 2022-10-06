import useIsomorphicEffect from './useIsomorphicEffect';
import React, { useLayoutEffect } from 'react';

const Demo = () => {
  useIsomorphicEffect(() => {
    window.console.log('hello');
  }, []);

  return <div>Please open the console to see!</div>;
};

export default Demo;
