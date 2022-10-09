import React from 'react';
import useMap from './useMap';
import { Button } from 'antd';

const Demo = () => {
  const [map, { clear, remove, set }] = useMap([['apples', 10]]);

  return (
    <div>
      <Button onClick={() => set(Date.now(), new Date().toJSON())}>Add</Button>
      <Button onClick={() => clear()}>Reset</Button>
      <Button onClick={() => remove('apples')} disabled={!map.has('apples')}>
        Remove apples
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
