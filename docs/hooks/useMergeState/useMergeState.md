| title                    | tags        | firstSeen  | lastUpdated |
| ------------------------ | ----------- | ---------- | ----------- |
| React useMergeState hook | hooks,state | 2022/10/11 | 2022/10/11  |

Creates a stateful value, and a function to update it by merging the new state provided.

- Use the useState() hook to create a state variable, initializing it to initialState.
- Create a function that will update the state variable by merging the new state provided with the existing one. If the new state is a function, call it with the previous state as the argument and use the result.
- Omit the argument, to initialize the state variable with an empty object ({}).

#### useMergeState.ts

```ts
import { useState } from 'react';

const useMergeState = <T>(
  initialState: Record<string, T> = {},
): [
  Record<string, T>,
  (v: Record<string, T> | ((...args: any) => any)) => void,
] => {
  const [value, setValue] = useState(initialState);

  const mergeState = (
    newState: Record<string, T> | ((...args: any) => any),
  ) => {
    if (typeof newState === 'function') {
      newState = newState(value);
    }
    setValue({
      ...value,
      ...newState,
    });
  };

  return [value, mergeState];
};

export default useMergeState;
```

#### Demo

```tsx | pure
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
```

#### useMergeState.js

```js
import { useState } from 'react';

const useMergeState = (initialState = {}) => {
  const [value, setValue] = useState(initialState);

  const mergeState = (newState) => {
    if (typeof newState === 'function') {
      newState = newState(value);
    }
    setValue({
      ...value,
      ...newState,
    });
  };

  return [value, mergeState];
};

export default useMergeState;
```

#### js Demo

```jsx | pure
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
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
