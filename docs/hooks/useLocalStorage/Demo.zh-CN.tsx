import React from 'react';
import { Input } from 'antd';
import useLocalStorage from './useLocalStorage';

const Demo = () => {
  const [name, setName] = useLocalStorage('name', '夕水');
  return <Input value={name} onChange={(e) => setName(e.target.value)}></Input>;
};

export default Demo;
