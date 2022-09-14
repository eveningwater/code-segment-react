import React from 'react';
import { Input, Button } from 'antd';
import useDefault from './useDefault';

const Demo = () => {
  const [user, setUser] = useDefault({ name: '夕水1' }, { name: '夕水2' });
  return (
    <>
      <div>用户名: {user.name}</div>
      <Input onChange={(e) => setUser({ name: e.target.value })}></Input>
      <Button onClick={() => setUser(null)}>清空</Button>
    </>
  );
};

export default Demo;
