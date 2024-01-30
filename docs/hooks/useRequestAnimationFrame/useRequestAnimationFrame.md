| title                               | tags         | firstSeen  | lastUpdated |
| ----------------------------------- | ------------ | ---------- | ----------- |
| React useRequestAnimationFrame hook | hooks,effect | 2022/10/25 | 2022/10/25  |

Runs an animating function, calling it before every repaint.

- Use the useRef() hook to create two variables. requestRef will hold the last request id and previousTimeRef will hold the last timestamp.
- Define a function, animate, which handles updating these variables, runs the callback and calls Window.requestAnimationFrame() perpetually.
- Use the useEffect() hook with an empty array to initialize the value of requestRef using Window.requestAnimationFrame(). Use the returned value and Window.cancelAnimationFrame() to clean up when the component unmounts.

#### useRequestAnimationFrame.ts

```ts
import { useRef, useEffect } from 'react';

export type requestAnimationReturnValue = ReturnType<
  typeof requestAnimationFrame
>;
const useRequestAnimationFrame = (callback: (...args: any) => any) => {
  const requestRef = useRef<requestAnimationReturnValue>();
  const previousRef = useRef<requestAnimationReturnValue>();

  const animate = (time: number) => {
    if (previousRef.current) {
      callback(time - previousRef.current);
    }
    previousRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current!);
    };
  }, []);
};

export default useRequestAnimationFrame;
```

#### Demo

```tsx | pure
import React, { useState } from 'react';
import useRequestAnimationFrame from './useRequestAnimationFrame';

const Demo = () => {
  const [count, setCount] = useState(0);

  useRequestAnimationFrame((deltaTime) => {
    setCount((prevCount) => (prevCount + deltaTime * 0.01) % 100);
  });

  return <p>{Math.round(count)}</p>;
};

export default Demo;
```

#### useRequestAnimationFrame.js

```js
import { useRef, useEffect } from 'react';

const useRequestAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousRef = useRef();

  const animate = (time) => {
    if (previousRef.current) {
      callback(time - previousRef.current);
    }
    previousRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
};

export default useRequestAnimationFrame;
```

#### js Demo

```jsx | pure
import React, { useState } from 'react';
import useRequestAnimationFrame from './useRequestAnimationFrame';

const Demo = () => {
  const [count, setCount] = useState(0);

  useRequestAnimationFrame((deltaTime) => {
    setCount((prevCount) => (prevCount + deltaTime * 0.01) % 100);
  });

  return <p>{Math.round(count)}</p>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="requestAnimationFrameTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="requestAnimationFrameJsDemo"></code>
