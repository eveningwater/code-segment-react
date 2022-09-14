| title                 | tags        | firstSeen | lastUpdated |
| --------------------- | ----------- | --------- | ----------- |
| React useDefault hook | hooks,state | 2022/9/14 | 2022/9/14   |

Creates a stateful value with a default fallback if it's null or undefined, and a function to update it.

- Use the useState() hook to create stateful value.
- Check if the value is either null or undefined.
- Return the defaultState if it is, otherwise return the actual value state, alongside the setValue function.

#### useDefault.ts

```ts
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const useDefault = <T, U>(
  defaultState: T,
  initialState: U,
): [T | U, Dispatch<SetStateAction<U | null | undefined>>] => {
  const [value, setValue] = useState<null | undefined | U>(initialState);

  const isEmptyValue = value === undefined || value === null;

  return [isEmptyValue ? defaultState : value, setValue];
};

export default useDefault;
```

#### Demo

```tsx | pure
import React from 'react';
import { Input, Button } from 'antd';
import useDefault from './useDefault';

const Demo = () => {
  const [user, setUser] = useDefault({ name: 'Adam' }, { name: 'john' });
  return (
    <>
      <div>User: {user.name}</div>
      <Input onChange={(e) => setUser({ name: e.target.value })}></Input>
      <Button onClick={() => setUser(null)}>clear</Button>
    </>
  );
};

export default Demo;
```

#### useDefault.js

```js
import { useState } from 'react';

const useDefault = (defaultState, initialState) => {
  const [value, setValue] = useState(initialState);

  const isEmptyValue = value === undefined || value === null;

  return [isEmptyValue ? defaultState : value, setValue];
};

export default useDefault;
```

#### js Demo

```jsx | pure
import React from 'react';
import { Input, Button } from 'antd';
import useDefault from './useDefault';

const Demo = () => {
  const [user, setUser] = useDefault({ name: 'Adam' }, { name: 'john' });
  return (
    <>
      <div>User: {user.name}</div>
      <Input onChange={(e) => setUser({ name: e.target.value })}></Input>
      <Button onClick={() => setUser(null)}>clear</Button>
    </>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
