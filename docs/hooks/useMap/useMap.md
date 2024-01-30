| title             | tags        | firstSeen  | lastUpdated |
| ----------------- | ----------- | ---------- | ----------- |
| React useMap hook | hooks,state | 2022/10/09 | 2022/10/09  |

Creates a stateful Map object, and a set of functions to manipulate it.

- Use the useState() hook and the Map constructor to create a new Map from the initialValue.
- Use the useMemo() hook to create a set of non-mutating actions that manipulate the map state variable, using the state setter to create a new Map every time.
- Return the map state variable and the created actions.

#### useMap.ts

```ts
import { useState, useMemo } from 'react';

const useMap = (
  initialValue: Iterable<[any, any]>,
): [
  Map<any, any>,
  {
    set: (key: any, value: any) => void;
    remove: (key: any) => void;
    clear: () => void;
  },
] => {
  const [map, setMap] = useState(new Map(initialValue));

  const actions = useMemo(
    () => ({
      set: (key: any, value: any) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.set(key, value);
          return nextMap;
        }),
      remove: (key: any) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.delete(key);
          return nextMap;
        }),
      clear: () => setMap(new Map()),
    }),
    [setMap],
  );

  return [map, actions];
};

export default useMap;
```

#### Demo

```tsx | pure
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
```

#### useMap.js

```js
import { useState, useMemo } from 'react';

const useMap = (initialValue) => {
  const [map, setMap] = useState(new Map(initialValue));

  const actions = useMemo(
    () => ({
      set: (key, value) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.set(key, value);
          return nextMap;
        }),
      remove: (key) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.delete(key);
          return nextMap;
        }),
      clear: () => setMap(new Map()),
    }),
    [setMap],
  );

  return [map, actions];
};

export default useMap;
```

#### js Demo

```jsx | pure
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
```

Demo:

<code src="./Demo.tsx" id="mapTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="mapJsDemo"></code>
