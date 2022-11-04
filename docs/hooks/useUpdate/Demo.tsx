import React from 'react';
import useUpdate from './useUpdate';
import { Button } from 'antd';

const Demo = () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <Button onClick={update}>Update</Button>
    </>
  );
};

export default Demo;
