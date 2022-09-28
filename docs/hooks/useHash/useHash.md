| title              | tags               | firstSeen | lastUpdated |
| ------------------ | ------------------ | --------- | ----------- |
| React useHash hook | hooks,state,effect | 2022/9/28 | 2022/9/28   |

Tracks the browser's location hash value, and allows changing it.

- Use the useState() hook to lazily get the hash property of the Location object.
- Use the useCallback() hook to create a handler that updates the state.
- Use the useEffect() hook to add a listener for the 'hashchange' event when mounting and clean it up when unmounting.
- Use the useCallback() hook to create a function that updates the hash property of the Location object with the given value.

#### useHash.ts

```ts
import { useState, useCallback, useEffect } from 'react';
const useHash = (): [string, (v: string) => void] => {
  const [hash, setHash] = useState(() => window.location.hash);
  const onHashChangeHandler = useCallback(() => {
    setHash(window.location.hash);
  }, []);
  useEffect(() => {
    window.addEventListener('hashchange', onHashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', onHashChangeHandler);
    };
  }, []);

  const updateHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash],
  );

  return [hash, updateHash];
};

export default useHash;
```

#### Demo

```tsx | pure
import React, { useEffect } from 'react';
import { Input } from 'antd';
import useHash from './useHash';
const Demo = () => {
  const [hash, setHash] = useHash();
  useEffect(() => {
    setHash('#list');
  }, []);
  return (
    <>
      <p>window.location.href: {window.location.href}</p>
      <p>Edit hash:</p>
      <Input value={hash} onChange={(e) => setHash(e.target.value)}></Input>
    </>
  );
};

export default Demo;
```

#### useHash.js

```js
import { useState, useCallback, useEffect } from 'react';
const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);
  const onHashChangeHandler = useCallback(() => {
    setHash(window.location.hash);
  }, []);
  useEffect(() => {
    window.addEventListener('hashchange', onHashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', onHashChangeHandler);
    };
  }, []);

  const updateHash = useCallback(
    (newHash) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash],
  );

  return [hash, updateHash];
};

export default useHash;
```

#### js Demo

```jsx | pure
import React, { useEffect } from 'react';
import { Input } from 'antd';
import useHash from './useHash';
const Demo = () => {
  const [hash, setHash] = useHash();
  useEffect(() => {
    setHash('#list');
  }, []);
  return (
    <>
      <p>window.location.href: {window.location.href}</p>
      <p>Edit hash:</p>
      <Input value={hash} onChange={(e) => setHash(e.target.value)}></Input>
    </>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
