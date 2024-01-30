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
import React from 'react';
import useOnWindowResize from './useOnWindowResize';

const Demo = () => {
  useOnWindowResize(() => {
    console.log(`window size: (${window.innerWidth}, ${window.innerHeight})`);
  });
  return <p>Resize the window and check the console.</p>;
};

export default Demo;
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
import React from 'react';
import useOnWindowResize from './useOnWindowResize';

const Demo = () => {
  useOnWindowResize(() => {
    console.log(`window size: (${window.innerWidth}, ${window.innerHeight})`);
  });
  return <p>Resize the window and check the console.</p>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="windowResizeTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="windowResizeJsDemo"></code>
