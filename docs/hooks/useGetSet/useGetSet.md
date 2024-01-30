| title                | tags        | firstSeen | lastUpdated |
| -------------------- | ----------- | --------- | ----------- |
| React useGetSet hook | hooks,state | 2022/9/27 | 2022/9/27   |

Creates a stateful value, returning a getter and a setter function.

- Use the useRef() hook to create a ref that holds the stateful value, initializing it with initialState.
- Use the useReducer() hook that creates a new object every time it's updated and return its dispatch.
- Use the useMemo() hook to memoize a pair of functions. The first one will return the current value of the state ref and the second one will update it and force a re-render.

#### useGetSet.ts

```ts
import { useRef, useReducer, useMemo } from 'react';

const useGetSet = <T>(initialState?: T) => {
  const state = useRef(initialState);
  const [, update] = useReducer(() => ({}), {});
  return useMemo(
    () => [
      () => state.current,
      (newState?: T) => {
        state.current = newState;
        update();
      },
    ],
    [],
  );
};

export default useGetSet;
```

#### Demo

```tsx | pure
import React from 'react';
import useGetSet from './useGetSet';
import { Button } from 'antd';

const Demo = () => {
  const [count, setCount] = useGetSet(0);

  const onClickHandler = () => {
    setTimeout(() => {
      setCount((count() as unknown as number) + 1);
    }, 1_000);
  };

  return (
    <Button onClick={onClickHandler}>
      Count: {count() as unknown as number}
    </Button>
  );
};

export default Demo;
```

#### useGetSet.js

```js
import { useRef, useReducer, useMemo } from 'react';

const useGetSet = (initialState) => {
  const state = useRef(initialState);
  const [, update] = useReducer(() => ({}));
  return useMemo(
    () => [
      () => state.current,
      (newState) => {
        state.current = newState;
        update?.();
      },
    ],
    [],
  );
};

export default useGetSet;
```

#### js Demo

```jsx | pure
import React from 'react';
import useGetSet from './useGetSet';
import { Button } from 'antd';

const Demo = () => {
  const [count, setCount] = useGetSet(0);

  const onClickHandler = () => {
    setTimeout(() => {
      setCount(count() + 1);
    }, 1_000);
  };

  return <Button onClick={onClickHandler}>Count: {count()}</Button>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="getSetTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="getSetJsDemo"></code>
