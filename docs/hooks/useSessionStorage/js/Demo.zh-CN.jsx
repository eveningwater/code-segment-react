import React from 'react';
import { Input } from 'antd';
import useSessionStorage from './useSessionStorage';

const Demo = () => {
  const [name, setName] = useSessionStorage('name', 'John');
  return <Input value={name} onChange={(e) => setName(e.target.value)} />;
};

export default Demo;
