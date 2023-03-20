import React from 'react';
import Tooltip from './Tooltip';
import Button from '../../Button/Button';
const Demo = () => {
  return (
    <Tooltip text="Simple tooltip">
      <Button>Hover me!</Button>
    </Tooltip>
  );
};
export default Demo;
