import React from 'react';
import { Button } from 'antd';
import useSet from './useSet';

const Demo = () => {
  const [set, { add, remove, clear }] = useSet(new Set(['apples']));

  return (
    <div>
      <Button onClick={() => add(String(Date.now()))}>Add</Button>
      <Button onClick={() => clear()}>Reset</Button>
      <Button onClick={() => remove('apples')} disabled={!set.has('apples')}>
        Remove apples
      </Button>
      <pre>{JSON.stringify([...set], null, 2)}</pre>
    </div>
  );
};

export default Demo;
