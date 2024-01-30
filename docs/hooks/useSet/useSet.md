| title             | tags        | firstSeen  | lastUpdated |
| ----------------- | ----------- | ---------- | ----------- |
| React useSet hook | hooks,state | 2022/10/30 | 2022/10/30  |

Creates a stateful Set object, and a set of functions to manipulate it.

- Use the useState() hook and the Set constructor to create a new Set from the initialValue.
- Use the useMemo() hook to create a set of non-mutating actions that manipulate the set state variable, using the state setter to create a new Set every time.
- Return the set state variable and the created actions.

#### useSet.ts

```ts
import { useState, useMemo } from 'react';

export interface ReturnValue {
  add: (i: Iterable<any>) => void;
  remove: (i: Iterable<any>) => void;
  clear: () => void;
}
const useSet = <T>(initialValue: Iterable<T>): [Set<T>, ReturnValue] => {
  const [set, setSet] = useState(new Set(initialValue));
  const actions = useMemo(
    () => ({
      add: (item: Iterable<any>) =>
        setSet((prevSet: Iterable<any>) => new Set([...prevSet, item])),
      remove: (item: Iterable<any>) =>
        setSet(
          (prevSet: Iterable<any>) =>
            new Set([...prevSet].filter((i) => i !== item)),
        ),
      clear: () => setSet(new Set()),
    }),
    [setSet],
  );

  return [set, actions];
};

export default useSet;
```

#### Demo

```tsx | pure
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
```

#### useSet.js

```js
import { useState, useMemo } from 'react';

const useSet = (initialValue) => {
  const [set, setSet] = useState(new Set(initialValue));
  const actions = useMemo(
    () => ({
      add: (item) => setSet((prevSet) => new Set([...prevSet, item])),
      remove: (item) =>
        setSet((prevSet) => new Set([...prevSet].filter((i) => i !== item))),
      clear: () => setSet(new Set()),
    }),
    [setSet],
  );

  return [set, actions];
};

export default useSet;
```

#### js Demo

```jsx | pure
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
```

Demo:

<code src="./Demo.tsx" id="setTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="setJsDemo"></code>
