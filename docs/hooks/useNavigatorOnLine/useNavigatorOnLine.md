| title                         | tags               | firstSeen  | lastUpdated |
| ----------------------------- | ------------------ | ---------- | ----------- |
| React useNavigatorOnLine hook | hooks,state,effect | 2022/10/13 | 2022/10/13  |

Checks if the client is online or offline.

- Create a function, getOnLineStatus, that uses the Navigator.onLine web API to get the online status of the client.
- Use the useState() hook to create an appropriate state variable, status, and setter.
- Use the useEffect() hook to add listeners for appropriate events, updating state, and cleanup those listeners when unmounting.
- Finally return the status state variable.

#### useNavigatorOnLine.ts

```ts
import { useEffect, useState } from 'react';
const getOnLineStatus = (): boolean =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
const useNavigatorOnLine = (): boolean => {
  const [status, setStatus] = useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return status;
};

export default useNavigatorOnLine;
```

#### Demo

```tsx | pure
import React from 'react';
import useNavigatorOnLine from './useNavigatorOnLine';

const Demo = () => {
  const isOnline = useNavigatorOnLine();
  return <span>You are {isOnline ? 'online' : 'offline'}</span>;
};

export default Demo;
```

#### useNavigatorOnLine.js

```js
import { useEffect, useState } from 'react';
const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
const useNavigatorOnLine = () => {
  const [status, setStatus] = useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return status;
};

export default useNavigatorOnLine;
```

#### js Demo

```jsx | pure
import React from 'react';
import useNavigatorOnLine from './useNavigatorOnLine';

const Demo = () => {
  const isOnline = useNavigatorOnLine();
  return <span>You are {isOnline ? 'online' : 'offline'}</span>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
