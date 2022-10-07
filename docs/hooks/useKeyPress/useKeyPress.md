| title                  | tags                     | firstSeen  | lastUpdated |
| ---------------------- | ------------------------ | ---------- | ----------- |
| React useKeyPress hook | hooks,state,effect,event | 2022/10/07 | 2022/10/07  |

Listens for changes in the pressed state of a given key.

- Use the useState() hook to create a state variable that holds the pressed state of the given key.
- Define two handler functions that update the state variable on key down or key up accordingly.
- Use the useEffect() hook and EventTarget.addEventListener() to handle the 'keydown' and 'keyup' events.
- Use EventTarget.removeEventListener() to perform cleanup after the component is unmounted.

#### useKeyPress.ts

```ts
import { useState, useEffect } from 'react';

const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);
  const onDownHandler = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };
  const onUpHandler = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onDownHandler);
    window.addEventListener('keyup', onUpHandler);
    return () => {
      window.removeEventListener('keydown', onDownHandler);
      window.removeEventListener('keyup', onUpHandler);
    };
  }, []);
  return keyPressed;
};

export default useKeyPress;
```

#### Demo

```tsx | pure
import React from 'react';
import useKeyPress from './useKeyPress';

const Demo = () => {
  const wPressed = useKeyPress('w');
  return <p>The "w" key is {!wPressed ? 'not ' : ''}pressed!</p>;
};

export default Demo;
```

#### useKeyPress.js

```js
import { useState, useEffect } from 'react';

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);
  const onDownHandler = (e) => {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };
  const onUpHandler = (e) => {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onDownHandler);
    window.addEventListener('keyup', onUpHandler);
    return () => {
      window.removeEventListener('keydown', onDownHandler);
      window.removeEventListener('keyup', onUpHandler);
    };
  }, []);
  return keyPressed;
};

export default useKeyPress;
```

#### js Demo

```jsx | pure
import React from 'react';
import useKeyPress from './useKeyPress';

const Demo = () => {
  const wPressed = useKeyPress('w');
  return <p>The "w" key is {!wPressed ? 'not ' : ''}pressed!</p>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
