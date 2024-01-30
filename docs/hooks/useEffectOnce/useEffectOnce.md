| title                    | tags         | firstSeen | lastUpdated |
| ------------------------ | ------------ | --------- | ----------- |
| React useEffectOnce hook | hooks,effect | 2022/9/16 | 2022/9/16   |

Runs a callback at most once when a condition becomes true.

- Use the useRef() hook to create a variable, hasRunOnce, to keep track of the execution status of the effect.
- Use the useEffect() that runs only when the when condition changes.
- Check if when is true and the effect has not executed before. If both are true, run callback and set hasRunOnce to true.

#### useEffectOnce.ts

```ts
import { useEffect, useRef } from 'react';

const useEffectOnce = <T, U>(callback: (...args: T[]) => void, when: U) => {
  const hasRunOnce = useRef(false);
  useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [when]);
};

export default useEffectOnce;
```

#### Demo

```tsx | pure
import React, { useState } from 'react';
import useEffectOnce from './useEffectOnce';
import { Button } from 'antd';

const Demo = () => {
  const [clicked, setClicked] = useState(false);
  useEffectOnce(() => {
    console.log('mounted');
  }, clicked);
  return <Button onClick={() => setClicked(true)}>Click me!</Button>;
};

export default Demo;
```

#### useEffectOnce.js

```js
import { useEffect, useRef } from 'react';

const useEffectOnce = (callback, when) => {
  const hasRunOnce = useRef(false);
  useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [when]);
};

export default useEffectOnce;
```

#### js Demo

```jsx | pure
import React, { useState } from 'react';
import useEffectOnce from './useEffectOnce';
import { Button } from 'antd';

const Demo = () => {
  const [clicked, setClicked] = useState(false);
  useEffectOnce(() => {
    console.log('mounted');
  }, clicked);
  return <Button onClick={() => setClicked(true)}>Click me!</Button>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="effectOnceTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="effectOnceJsDemo"></code>
