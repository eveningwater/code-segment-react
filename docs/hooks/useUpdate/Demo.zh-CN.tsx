import React from 'react';
import useUpdate from './useUpdate';
import { Button } from 'antd';

const Demo = () => {
  const update = useUpdate();

  return (
    <>
      <div>当前时间: {Date.now()}</div>
      <Button onClick={update}>更新</Button>
    </>
  );
};

export default Demo;
