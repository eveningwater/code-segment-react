| title                       | tags               | firstSeen | lastUpdated |
| --------------------------- | ------------------ | --------- | ----------- |
| React useEventListener hook | hooks,event,effect | 2022/9/24 | 2022/9/24   |

Adds an event listener for the specified event type on the given element.

- Use the useRef() hook to create a ref that will hold the handler.
- Use the useEffect() hook to update the value of the savedHandler ref any time the handler changes.
- Use the useEffect() hook to add an event listener to the given element and clean up when unmounting.
- Omit the last argument, el, to use the Window by default.

#### useEventListener.ts

```ts
import { useRef, useEffect } from 'react';

export type ELementType = HTMLElement | Element | Document | Window;
export type HandlerType = (...args: any[]) => any;

const useEventListener = (
  type: string,
  handler: HandlerType,
  el: ELementType = window,
) => {
  const saveHandler = useRef<HandlerType>();
  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e: Event | MouseEvent) => saveHandler.current?.(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
};

export default useEventListener;
```

#### Demo

```tsx | pure
import React, { useState, useCallback } from 'react';
import useEventListener from './useEventListener';

const Demo = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const updateCoords = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords],
  );

  useEventListener('mousemove', updateCoords);
  return (
    <p>
      Mouse coordinates: {coords.x},{coords.y}
    </p>
  );
};

export default Demo;
```

#### useEventListener.js

```js
import { useRef, useEffect } from 'react';

const useEventListener = (type, handler, el = window) => {
  const saveHandler = useRef();
  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e) => saveHandler.current?.(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
};

export default useEventListener;
```

#### js Demo

```jsx | pure
import React, { useState, useCallback } from 'react';
import useEventListener from './useEventListener';

const Demo = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const updateCoords = useCallback(
    (e) => {
      const { clientX, clientY } = e;
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords],
  );

  useEventListener('mousemove', updateCoords);
  return (
    <p>
      Mouse coordinates: {coords.x},{coords.y}
    </p>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
