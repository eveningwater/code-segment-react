| title             | tags                    | firstSeen  | lastUpdated |
| ----------------- | ----------------------- | ---------- | ----------- |
| React useSSR hook | hooks,effect,state,memo | 2022/10/26 | 2022/10/26  |

Checks if the code is running on the browser or the server.

- Create a custom hook that returns an appropriate object.
- Use typeof, Window, Window.document and Document.createElement() to check if the code is running on the browser.
- Use the useState() hook to define the inBrowser state variable.
- Use the useEffect() hook to update the inBrowser state variable and clean up at the end.
- Use the useMemo() hook to memoize the return values of the custom hook.

#### useSSR.ts

```ts
import { useState, useEffect, useMemo } from 'react';

const isDOMavailable = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
export type ssrReturnType = {
  isBrowser: boolean;
  isServer: boolean;
  canUseWorkers: boolean;
  canUseEventListeners: boolean;
  canUseViewport: boolean;
};
const useSSR = (): ssrReturnType => {
  const [inBrowser, setInBrowser] = useState(isDOMavailable);

  useEffect(() => {
    setInBrowser(isDOMavailable);
    return () => {
      setInBrowser(false);
    };
  }, []);

  const useSSRObject = useMemo(
    () => ({
      isBrowser: inBrowser,
      isServer: !inBrowser,
      canUseWorkers: typeof Worker !== 'undefined',
      canUseEventListeners: inBrowser && !!window.addEventListener,
      canUseViewport: inBrowser && !!window.screen,
    }),
    [inBrowser],
  );

  return useMemo(
    () => Object.assign(Object.values(useSSRObject), useSSRObject),
    [inBrowser],
  );
};

export default useSSR;
```

#### Demo

```tsx | pure
import React from 'react';
import useSSR from './useSSR';
const Demo = () => {
  const { isBrowser } = useSSR();
  return <p>{isBrowser ? 'Running on browser' : 'Running on server'}</p>;
};

export default Demo;
```

#### useSSR.js

```js
import { useState, useEffect, useMemo } from 'react';

const isDOMavailable = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const useSSR = () => {
  const [inBrowser, setInBrowser] = useState(isDOMavailable);

  useEffect(() => {
    setInBrowser(isDOMavailable);
    return () => {
      setInBrowser(false);
    };
  }, []);

  const useSSRObject = useMemo(
    () => ({
      isBrowser: inBrowser,
      isServer: !inBrowser,
      canUseWorkers: typeof Worker !== 'undefined',
      canUseEventListeners: inBrowser && !!window.addEventListener,
      canUseViewport: inBrowser && !!window.screen,
    }),
    [inBrowser],
  );

  return useMemo(
    () => Object.assign(Object.values(useSSRObject), useSSRObject),
    [inBrowser],
  );
};

export default useSSR;
```

#### js Demo

```jsx | pure
import React from 'react';
import useSSR from './useSSR';
const Demo = () => {
  const { isBrowser } = useSSR();
  return <p>{isBrowser ? 'Running on browser' : 'Running on server'}</p>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="ssrTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="ssrJsDemo"></code>
