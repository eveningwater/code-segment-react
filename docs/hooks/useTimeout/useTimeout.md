| title                 | tags         | firstSeen  | lastUpdated |
| --------------------- | ------------ | ---------- | ----------- |
| React useTimeout hook | hooks,effect | 2022/10/31 | 2022/10/31  |

Implements setTimeout() in a declarative manner.

- Create a custom hook that takes a callback and a delay.
- Use the useRef() hook to create a ref for the callback function.
- Use the useEffect() hook to remember the latest callback.
- Use the useEffect() hook to set up the timeout and clean up.

#### useTimeout.ts

```ts
import { useRef, useEffect } from 'react';

export type AnyFunc = (...args: any[]) => any;

const useTimeout = (callback: AnyFunc, delay: number) => {
  const savedCallback = useRef<AnyFunc>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current?.();
    if (typeof delay === 'number') {
      let id = setTimeout(tick, delay);
      return () => {
        clearTimeout(id);
      };
    }
  }, [delay]);
};

export default useTimeout;
```

#### Demo

```tsx | pure
import React from 'react';
import useTimeout from './useTimeout';

const Demo = () => {
  const [seconds, setSeconds] = React.useState(0);
  useTimeout(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

export default Demo;
```

#### useTimeout.js

```js
import { useRef, useEffect } from 'react';

const useTimeout = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current?.();
    if (typeof delay === 'number') {
      let id = setTimeout(tick, delay);
      return () => {
        clearTimeout(id);
      };
    }
  }, [delay]);
};

export default useTimeout;
```

#### js Demo

```jsx | pure
import React from 'react';
import useTimeout from './useTimeout';

const Demo = () => {
  const [seconds, setSeconds] = React.useState(0);
  useTimeout(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="timeoutTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="timeoutJsDemo"></code>
