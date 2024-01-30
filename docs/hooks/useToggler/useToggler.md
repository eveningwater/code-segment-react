| title                 | tags                 | firstSeen  | lastUpdated |
| --------------------- | -------------------- | ---------- | ----------- |
| React useToggler hook | hooks,state,callback | 2022/11/02 | 2022/11/02  |

Provides a boolean state variable that can be toggled between its two states.

- Use the useState() hook to create the value state variable and its setter.
- Create a function that toggles the value of the value state variable and memoize it, using the useCallback() hook.
- Return the value state variable and the memoized toggler function.

#### useToggler.ts

```ts
import { useState, useCallback } from 'react';

const useToggler = (initialState: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initialState);
  const toggleValue = useCallback(() => setValue((prev: boolean) => !prev), []);
  return [value, toggleValue];
};

export default useToggler;
```

#### Demo

```tsx | pure
import React from 'react';
import { Button } from 'antd';
import useToggler from './useToggler';

const Demo = () => {
  const [val, toggleVal] = useToggler(false);
  return <Button onClick={toggleVal}>{val ? 'ON' : 'OFF'}</Button>;
};
export default Demo;
```

#### useToggler.js

```js
import { useState, useCallback } from 'react';

const useToggler = (initialState) => {
  const [value, setValue] = useState(initialState);
  const toggleValue = useCallback(() => setValue((prev) => !prev), []);
  return [value, toggleValue];
};

export default useToggler;
```

#### js Demo

```jsx | pure
import React from 'react';
import { Button } from 'antd';
import useToggler from './useToggler';

const Demo = () => {
  const [val, toggleVal] = useToggler(false);
  return <Button onClick={toggleVal}>{val ? 'ON' : 'OFF'}</Button>;
};
export default Demo;
```

Demo:

<code src="./Demo.tsx" id="togglerTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="togglerJsDemo"></code>
