| title                        | tags               | firstSeen  | lastUpdated |
| ---------------------------- | ------------------ | ---------- | ----------- |
| React useOnWindowScroll hook | hooks,effect,event | 2022/10/17 | 2022/10/17  |

Executes a callback whenever the window is scrolled.

- Use the useRef() hook to create a variable, listener, which will hold the listener reference.
- Use the useEffect() hook and EventTarget.addEventListener() to listen to the 'scroll' event of the Window global object.
- Use EventTarget.removeEventListener() to remove any existing listeners and clean up when the component unmounts.

#### useOnWindowScroll.ts

```ts
import { useRef, useEffect } from 'react';

const useOnWindowScroll = (callback: EventListenerOrEventListenerObject) => {
  const listener = useRef<void | null>(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('scroll', listener.current);
    }
    listener.current = window.addEventListener('scroll', callback);
    return () => {
      window.removeEventListener(
        'scroll',
        listener.current as unknown as EventListenerOrEventListenerObject,
      );
    };
  }, [callback]);
};

export default useOnWindowScroll;
```

#### Demo

```tsx | pure
import React from 'react';
import useOnWindowScroll from './useOnWindowScroll';

const Demo = () => {
  useOnWindowScroll(() => console.log(`scroll Y: ${window.pageYOffset}`));
  return <p style={{ height: '300vh' }}>Scroll and check the console</p>;
};

export default Demo;
```

#### useOnWindowScroll.js

```js
import { useRef, useEffect } from 'react';

const useOnWindowScroll = (callback) => {
  const listener = useRef(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('scroll', listener.current);
    }
    listener.current = window.addEventListener('scroll', callback);
    return () => {
      window.removeEventListener('scroll', listener.current);
    };
  }, [callback]);
};

export default useOnWindowScroll;
```

#### js Demo

```jsx | pure
import React from 'react';
import useOnWindowScroll from './useOnWindowScroll';

const Demo = () => {
  useOnWindowScroll(() => console.log(`scroll Y: ${window.pageYOffset}`));
  return <p style={{ height: '300vh' }}>Scroll and check the console</p>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
