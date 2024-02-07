| title               | tags               | firstSeen | lastUpdated |
| ------------------- | ------------------ | --------- | ----------- |
| React useError hook | hooks,state,effect | 2022/9/18 | 2022/9/18   |

Creates an error dispatcher.

- Use the useState() hook to create a state variable that holds the error.
- Use the useEffect() hook to throw the error whenever it's truthy.
- Use the useCallback() hook to update the state and return the cached function.

#### useError.ts

```ts
import { useState, useEffect, useCallback } from 'react';
const useError = <T>(err: T): ((...args: any) => void) => {
  const [error, setError] = useState(err);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const dispatchError = useCallback((err: T) => {
    setError(err);
  }, []);

  return dispatchError;
};

export default useError;
```

#### Demo

```tsx | pure
import React from 'react';
import { Button } from 'antd';
import useError from './useError';
const Demo = () => {
  const dispatchError = useError('');
  const clickHandler = () => {
    dispatchError(new Error('Error!'));
  };
  return <Button onClick={clickHandler}>Throw error</Button>;
};

export default Demo;
```

#### useError.js

```js
import { useState, useEffect, useCallback } from 'react';
const useError = (err) => {
  const [error, setError] = useState(err);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const dispatchError = useCallback((err) => {
    setError(err);
  }, []);

  return dispatchError;
};

export default useError;
```

#### js Demo

```jsx | pure
import React from 'react';
import { Button } from 'antd';
import useError from './useError';
const Demo = () => {
  const dispatchError = useError('');
  const clickHandler = () => {
    dispatchError(new Error('Error!'));
  };
  return <Button onClick={clickHandler}>Throw error</Button>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
