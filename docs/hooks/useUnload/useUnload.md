| title                | tags               | firstSeen  | lastUpdated |
| -------------------- | ------------------ | ---------- | ----------- |
| React useUnload hook | hooks,effect,event | 2022/11/03 | 2022/11/03  |

Handles the beforeunload window event.

- Use the useRef() hook to create a ref for the callback function, fn.
- Use the useEffect() hook and EventTarget.addEventListener() to handle the 'beforeunload' (when the user is about to close the window).
- Use EventTarget.removeEventListener() to perform cleanup after the component is unmounted.

#### useUnload.ts

```ts
import { useRef, useEffect } from 'react';

const useUnload = (handler: (...args: any[]) => any) => {
  const cb = useRef(handler);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};

export default useUnload;
```

#### Demo

```tsx | pure
import React from 'react';
import useUnload from './useUnload';

const Demo = () => {
  useUnload((e) => {
    e.preventDefault();
    const exit = confirm('Are you sure you want to leave?');
    if (exit) window.close();
  });
  return <div>Try closing the window.</div>;
};
export default Demo;
```

#### useUnload.js

```js
import { useRef, useEffect } from 'react';

const useUnload = (handler) => {
  const cb = useRef(handler);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};

export default useUnload;
```

#### js Demo

```jsx | pure
import React from 'react';
import useUnload from './useUnload';

const Demo = () => {
  useUnload((e) => {
    e.preventDefault();
    const exit = confirm('Are you sure you want to leave?');
    if (exit) window.close();
  });
  return <div>Try closing the window.</div>;
};
export default Demo;
```

Demo:

<code src="./Demo.tsx" id="unloadTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="unloadJsDemo"></code>
