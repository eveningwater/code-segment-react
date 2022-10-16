| title                        | tags               | firstSeen  | lastUpdated |
| ---------------------------- | ------------------ | ---------- | ----------- |
| React useOnWindowResize hook | hooks,effect,event | 2022/10/16 | 2022/10/16  |

Executes a callback whenever the window is resized.

- Use the useRef() hook to create a variable, listener, which will hold the listener reference.
- Use the useEffect() hook and EventTarget.addEventListener() to listen to the 'resize' event of the Window global object.
- Use EventTarget.removeEventListener() to remove any existing listeners and clean up when the component unmounts.

#### useOnWindowResize.ts

```ts
import { useRef, useEffect } from 'react';

const useOnWindowResize = (callback: EventListenerOrEventListenerObject) => {
  const listener = useRef<void | null>(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('resize', listener.current);
    }
    listener.current = window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener(
        'resize',
        listener.current as unknown as EventListenerOrEventListenerObject,
      );
    };
  }, [callback]);
};

export default useOnWindowResize;
```

#### Demo

```tsx | pure

```

#### useOnWindowResize.js

```js
import { useRef, useEffect } from 'react';

const useOnWindowResize = (callback) => {
  const listener = useRef(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('resize', listener.current);
    }
    listener.current = window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', listener.current);
    };
  }, [callback]);
};

export default useOnWindowResize;
```

#### js Demo

```jsx | pure

```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
