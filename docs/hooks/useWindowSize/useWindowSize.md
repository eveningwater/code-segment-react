| title                    | tags               | firstSeen  | lastUpdated |
| ------------------------ | ------------------ | ---------- | ----------- |
| React useWindowSize hook | hooks,state,effect | 2022/11/05 | 2022/11/05  |

Tracks the dimensions of the browser window.

- Use the useState() hook to initialize a state variable that will hold the window's dimensions. Initialize with both values set to undefined to avoid mismatch between server and client renders.
- Create a function that uses Window.innerWidth and Window.innerHeight to update the state variable.
- Use the useEffect() hook to set an appropriate listener for the 'resize' event on mount and clean it up when unmounting.

#### useWindowSize.ts

```ts
import { useState, useEffect } from 'react';
const useWindowSize = (): { width: number; height: number } => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const onHandleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    onHandleResize();
    window.addEventListener('resize', onHandleResize);
    return () => {
      window.removeEventListener('resize', onHandleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
```

#### Demo

```tsx | pure
import React from 'react';
import useWindowSize from './useWindowSize';

const Demo = () => {
  const { width, height } = useWindowSize();

  return (
    <p>
      Window size: ({width} x {height})
    </p>
  );
};

export default Demo;
```

#### useWindowSize.js

```js
import { useState, useEffect } from 'react';
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const onHandleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    onHandleResize();
    window.addEventListener('resize', onHandleResize);
    return () => {
      window.removeEventListener('resize', onHandleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
```

#### js Demo

```jsx | pure
import React from 'react';
import useWindowSize from './useWindowSize';

const Demo = () => {
  const { width, height } = useWindowSize();

  return (
    <p>
      Window size: ({width} x {height})
    </p>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="windowSizeTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="windowSizeJsDemo"></code>
