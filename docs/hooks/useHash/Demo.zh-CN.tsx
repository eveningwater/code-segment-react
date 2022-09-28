import React, { useEffect } from 'react';
import { Input } from 'antd';
import useHash from './useHash';
const Demo = () => {
  const [hash, setHash] = useHash();
  useEffect(() => {
    setHash('#list');
  }, []);
  return (
    <>
      <p>当前地址: {window.location.href}</p>
      <p>编辑哈希值:</p>
      <Input value={hash} onChange={(e) => setHash(e.target.value)}></Input>
    </>
  );
};

export default Demo;
