| title                      | tags        | firstSeen  | lastUpdated |
| -------------------------- | ----------- | ---------- | ----------- |
| React useLocalStorage hook | hooks,state | 2022/10/08 | 2022/10/08  |

Creates a stateful value that is persisted to localStorage, and a function to update it.

- Use the useState() hook with a function to initialize its value lazily.
- Use a try...catch block and Storage.getItem() to try and get the value from Window.localStorage. If no value is found, use Storage.setItem() to store the defaultValue and use it as the initial state. If an error occurs, use defaultValue as the initial state.
- Define a function that will update the state variable with the passed value and use Storage.setItem() to store it.

#### useLocalStorage.ts

```ts
import { useState } from 'react';

const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (val: T) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
```

#### Demo

```tsx | pure
import React from 'react';
import { Input } from 'antd';
import useLocalStorage from './useLocalStorage';

const Demo = () => {
  const [name, setName] = useLocalStorage('name', 'eveningwater');
  return <Input value={name} onChange={(e) => setName(e.target.value)}></Input>;
};

export default Demo;
```

#### useLocalStorage.js

```js
import { useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
```

#### js Demo

```jsx | pure
import React from 'react';
import { Input } from 'antd';
import useLocalStorage from './useLocalStorage';

const Demo = () => {
  const [name, setName] = useLocalStorage('name', 'eveningwater');
  return <Input value={name} onChange={(e) => setName(e.target.value)}></Input>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
