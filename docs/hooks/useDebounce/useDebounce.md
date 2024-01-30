| title                  | tags               | firstSeen | lastUpdated |
| ---------------------- | ------------------ | --------- | ----------- |
| React useDebounce hook | hooks,effect,state | 2022/9/13 | 2022/9/13   |

Debounces the given value.

- Create a custom hook that takes a value and a delay.
- Use the useState() hook to store the debounced value.
- Use the useEffect() hook to update the debounced value every time value is updated.
- Use setTimeout() to create a timeout that delays invoking the setter of the previous state variable by delay ms.
- Use clearTimeout() to clean up when dismounting the component.
- This is particularly useful when dealing with user input.

#### useDebounce.ts

```ts
import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debounceValue;
};

export default useDebounce;
```

#### Demo

```tsx | pure
import React, { useState } from 'react';
import Button from '../../guide/Button/Button';
import useDebounce from './useDebounce';

const Demo = () => {
  const [value, setValue] = useState(0);
  const lastValue = useDebounce(value, 500);
  return (
    <div>
      <p>
        Current: {value} - Debounced: {lastValue}
      </p>
      <Button type="primary" onClick={() => setValue(value + 1)}>
        Increment
      </Button>
    </div>
  );
};

export default Demo;
```

#### useDebounce.js

```js
import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debounceValue;
};

export default useDebounce;
```

#### js Demo

```jsx | pure
import React, { useState } from 'react';
import Button from '../../../guide/Button/jsx/Button';
import useDebounce from './useDebounce';

const Demo = () => {
  const [value, setValue] = useState(0);
  const lastValue = useDebounce(value, 500);
  return (
    <div>
      <p>
        Current: {value} - Debounced: {lastValue}
      </p>
      <Button type="primary" onClick={() => setValue(value + 1)}>
        Increment
      </Button>
    </div>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="debounceTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="debounceJsDemo"></code>
