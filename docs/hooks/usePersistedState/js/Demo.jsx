import React, { useState } from 'react';
import usePersistedState from './usePersistedState';
import { Input } from 'antd';

const MyComponent = (props) => {
  const { name } = props;
  const [value, setValue] = usePersistedState(name, '10');

  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
};

const Demo = () => {
  const [name, setName] = useState('my-value');
  return (
    <>
      <MyComponent name={name} />
      <Input value={name} onChange={(e) => setName(e.target.name)} />
    </>
  );
};

export default Demo;
