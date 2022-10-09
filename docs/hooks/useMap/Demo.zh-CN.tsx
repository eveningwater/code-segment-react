import React from 'react';
import useMap from './useMap';
import { Button } from 'antd';

const Demo = () => {
  const [map, { clear, remove, set }] = useMap([['apples', 10]]);

  return (
    <div>
      <Button onClick={() => set(Date.now(), new Date().toJSON())}>添加</Button>
      <Button onClick={() => clear()}>重置</Button>
      <Button onClick={() => remove('apples')} disabled={!map.has('apples')}>
        移除
      </Button>
      <pre>
        {JSON.stringify(
          [...map.entries()].reduce(
            (acc, [key, value]) => ({ ...acc, [key]: value }),
            {},
          ),
          null,
          2,
        )}
      </pre>
    </div>
  );
};

export default Demo;
