| title                  | tags         | firstSeen  | lastUpdated |
| ---------------------- | ------------ | ---------- | ----------- |
| React useInterval hook | hooks,effect | 2022/10/05 | 2022/10/05  |

Implements setInterval() in a declarative manner.

- Create a custom hook that takes a callback and a delay.
- Use the useRef() hook to create a ref for the callback function.
- Use a useEffect() hook to remember the latest callback whenever it changes.
- Use a useEffect() hook dependent on delay to set up the interval and clean up.

#### useInterval.ts

```ts
import { useEffect, useRef } from 'react';
export type CallbackType = (...args: any) => any;
const useInterval = (callback: CallbackType, delay: number) => {
  const savedCallback = useRef<CallbackType>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current?.();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
```

#### Demo

```tsx | pure
import React, { useState } from 'react';
import useInterval from './useInterval';
const Demo = () => {
  const [seconds, setSeconds] = useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

export default Demo;
```

#### useInterval.js

```js
import { useEffect, useRef } from 'react';
const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current?.();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
```

#### js Demo

```jsx | pure
import React, { useState } from 'react';
import useInterval from './useInterval';
const Demo = () => {
  const [seconds, setSeconds] = useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="intervalTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="intervalJsDemo"></code>
