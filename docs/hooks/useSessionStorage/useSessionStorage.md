| title                        | tags        | firstSeen  | lastUpdated |
| ---------------------------- | ----------- | ---------- | ----------- |
| React useSessionStorage hook | hooks,state | 2022/10/29 | 2022/10/29  |

Creates a stateful value that is persisted to sessionStorage, and a function to update it.

- Use the useState() hook with a function to initialize its value lazily.
- Use a try...catch block and Storage.getItem() to try and get the value from Window.sessionStorage. If no value is found, use Storage.setItem() to store the defaultValue and use it as the initial state. If an error occurs, use defaultValue as the initial state.
- Define a function that will update the state variable with the passed value and use Storage.setItem() to store it.

#### useSessionStorage.ts

```ts
import { useState } from 'react';

const useSessionStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (v: T) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
```

#### Demo

```tsx | pure
import React from 'react';
import { Input } from 'antd';
import useSessionStorage from './useSessionStorage';

const Demo = () => {
  const [name, setName] = useSessionStorage('name', 'John');
  return <Input value={name} onChange={(e) => setName(e.target.value)} />;
};

export default Demo;
```

#### useSessionStorage.js

```js
import { useState } from 'react';

const useSessionStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
```

#### js Demo

```jsx | pure
import React from 'react';
import { Input } from 'antd';
import useSessionStorage from './useSessionStorage';

const Demo = () => {
  const [name, setName] = useSessionStorage('name', 'John');
  return <Input value={name} onChange={(e) => setName(e.target.value)} />;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="sessionTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="sessionJsDemo"></code>
