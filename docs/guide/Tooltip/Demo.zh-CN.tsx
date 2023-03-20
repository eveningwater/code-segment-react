import React from 'react';
import Tooltip from './Tooltip';
import Button from '../Button/Button';
const Demo = () => {
  return (
    <Tooltip text="简单的工具提示">
      <Button>悬浮!</Button>
    </Tooltip>
  );
};
export default Demo;
