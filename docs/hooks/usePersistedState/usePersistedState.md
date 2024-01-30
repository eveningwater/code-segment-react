| title                        | tags               | firstSeen  | lastUpdated |
| ---------------------------- | ------------------ | ---------- | ----------- |
| React usePersistedState hook | hooks,effect,state | 2022/10/18 | 2022/10/18  |

Returns a stateful value, persisted in localStorage, and a function to update it.

- Use the useState() hook to initialize the value to defaultValue.
- Use the useRef() hook to create a ref that will hold the name of the value in Window.localStorage.
- Use 3 instances of the useEffect() hook for initialization, value change and name change respectively.
- When the component is first mounted, use Storage.getItem() to update value if there's a stored value or Storage.setItem() to persist the current value.
- When value is updated, use Storage.setItem() to store the new value.
- When name is updated, use Storage.setItem() to create the new key, update the nameRef and use Storage.removeItem() to remove the previous key from Window.localStorage.
- Note: The hook is meant for use with primitive values (i.e. not objects) and doesn't account for changes to Window.localStorage due to other code. Both of these issues can be easily \* handled (e.g. JSON serialization and handling the 'storage' event).

#### usePersistedState.ts

```ts
import { useEffect, useState, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const usePersistedState = (
  name: string,
  defaultValue: string,
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState(defaultValue);
  const nameRef = useRef<string>(name);

  useEffect(() => {
    try {
      const storeValue = localStorage.getItem(name);
      if (storeValue !== null) {
        setValue(storeValue);
      } else {
        localStorage.setItem(name, defaultValue);
      }
    } catch {
      setValue(defaultValue);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(nameRef.current, value);
    } catch {}
  }, [value]);

  useEffect(() => {
    const lastName = nameRef.current;
    if (name !== lastName) {
      try {
        localStorage.setItem(name, value);
        nameRef.current = name;
        localStorage.removeItem(lastName);
      } catch {}
    }
  }, [name]);

  return [value, setValue];
};

export default usePersistedState;
```

#### Demo

```tsx | pure
import React, { useState } from 'react';
import usePersistedState from './usePersistedState';
import { Input } from 'antd';

const MyComponent = (props: { name: string }) => {
  const { name } = props;
  const [value, setValue] = usePersistedState(name, '10');

  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
};

const Demo = () => {
  const [name, setName] = useState('my-value');
  return (
    <>
      <MyComponent name={name} />
      <Input value={name} onChange={(e) => setName(e.target.name)} />
    </>
  );
};

export default Demo;
```

#### usePersistedState.js

```js
import { useEffect, useState, useRef } from 'react';

const usePersistedState = (name, defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const nameRef = useRef(name);

  useEffect(() => {
    try {
      const storeValue = localStorage.getItem(name);
      if (storeValue !== null) {
        setValue(storeValue);
      } else {
        localStorage.setItem(name, defaultValue);
      }
    } catch {
      setValue(defaultValue);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(nameRef.current, value);
    } catch {}
  }, [value]);

  useEffect(() => {
    const lastName = nameRef.current;
    if (name !== lastName) {
      try {
        localStorage.setItem(name, value);
        nameRef.current = name;
        localStorage.removeItem(lastName);
      } catch {}
    }
  }, [name]);

  return [value, setValue];
};

export default usePersistedState;
```

#### js Demo

```jsx | pure
import React, { useState } from 'react';
import usePersistedState from './usePersistedState';
import { Input } from 'antd';

const MyComponent = (props) => {
  const { name } = props;
  const [value, setValue] = usePersistedState(name, '10');

  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
};

const Demo = () => {
  const [name, setName] = useState('my-value');
  return (
    <>
      <MyComponent name={name} />
      <Input value={name} onChange={(e) => setName(e.target.name)} />
    </>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="persistedStateTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="persistedStateJsDemo"></code>
