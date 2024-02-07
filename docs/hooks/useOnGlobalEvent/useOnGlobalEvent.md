| title                       | tags               | firstSeen  | lastUpdated |
| --------------------------- | ------------------ | ---------- | ----------- |
| React useOnGlobalEvent hook | hooks,effect,event | 2022/10/15 | 2022/10/15  |

Executes a callback whenever an event occurs on the global object.

- Use the useRef() hook to create a variable, listener, which will hold the listener reference.
- Use the useRef() hook to create a variable that will hold the previous values of the type and options arguments.
- Use the useEffect() hook and EventTarget.addEventListener() to listen to the given event type on the Window global object.
- Use EventTarget.removeEventListener() to remove any existing listeners and clean up when the component unmounts.

#### useOnGlobalEvent.ts

```ts
import { useEffect, useRef } from 'react';

const useOnGlobalEvent = (
  type: string,
  callback: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) => {
  const listener = useRef<void | null>(null);
  const previousProps = useRef({ type, options });
  useEffect(() => {
    const { type: previousType, options: previousOptions } =
      previousProps.current;
    if (listener.current) {
      window.removeEventListener(
        previousType,
        listener.current,
        previousOptions,
      );
    }
    listener.current = window.addEventListener(type, callback);
    previousProps.current = { type, options };

    return () => {
      window.removeEventListener(
        type,
        listener.current as unknown as EventListenerOrEventListenerObject,
        options,
      );
    };
  }, [type, callback, options]);
};

export default useOnGlobalEvent;
```

#### Demo

```tsx | pure
import React from 'react';
import useOnGlobalEvent from './useOnGlobalEvent';

const Demo = () => {
  useOnGlobalEvent('mousemove', (e: Event) => {
    const { x, y } = e as MouseEvent;
    console.log(`(${x}, ${y})`);
  });
  return <p>Move your mouse around</p>;
};

export default Demo;
```

#### useOnGlobalEvent.js

```js
import { useEffect, useRef } from 'react';

const useOnGlobalEvent = (type, callback, options) => {
  const listener = useRef(null);
  const previousProps = useRef({ type, options });
  useEffect(() => {
    const { type: previousType, options: previousOptions } =
      previousProps.current;
    if (listener.current) {
      window.removeEventListener(
        previousType,
        listener.current,
        previousOptions,
      );
    }
    listener.current = window.addEventListener(type, callback);
    previousProps.current = { type, options };
    return () => {
      window.removeEventListener(type, listener.current, options);
    };
  }, [type, callback, options]);
};

export default useOnGlobalEvent;
```

#### js Demo

```jsx | pure
import React from 'react';
import useOnGlobalEvent from './useOnGlobalEvent';

const Demo = () => {
  useOnGlobalEvent('mousemove', (e) => {
    const { x, y } = e;
    console.log(`(${x}, ${y})`);
  });
  return <p>Move your mouse around</p>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
