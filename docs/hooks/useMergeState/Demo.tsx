import React from 'react';
import { Button, Input, Space } from 'antd';
import useMergeState from './useMergeState';

const Demo = () => {
  const [data, setData] = useMergeState({ name: 'eveningwater', age: 26 });
  return (
    <Space wrap>
      {data.name}
      <Input
        value={data.name}
        onChange={(e) => setData({ name: e.target.value })}
      />
      <Button onClick={() => setData(({ age }) => ({ age: age - 1 }))}>
        -
      </Button>
      {data.age}
      <Button onClick={() => setData(({ age }) => ({ age: age + 1 }))}>
        +
      </Button>
    </Space>
  );
};

export default Demo;
