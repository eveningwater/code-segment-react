| title                          | tags         | firstSeen  | lastUpdated |
| ------------------------------ | ------------ | ---------- | ----------- |
| React useIsomorphicEffect hook | hooks,effect | 2022/10/06 | 2022/10/06  |

Resolves to useEffect() on the server and useLayoutEffect() on the client.

- Use typeof to check if the Window object is defined. If it is, return the useLayoutEffect(). Otherwise return useEffect().

#### useIsomorphicEffect.ts

```ts
import { useEffect, useLayoutEffect } from 'react';
import type { EffectCallback, DependencyList } from 'react';
const useIsomorphicEffect = (
  effect: EffectCallback,
  deps?: DependencyList | undefined,
): void => {
  const handler = typeof window === 'undefined' ? useEffect : useLayoutEffect;
  return handler(effect, deps);
};

export default useIsomorphicEffect;
```

#### Demo

```tsx | pure
import useIsomorphicEffect from './useIsomorphicEffect';
import React from 'react';

const Demo = () => {
  useIsomorphicEffect(() => {
    window.console.log('hello');
  }, []);
  return <div>Please open the console to see!</div>;
};

export default Demo;
```

#### useIsomorphicEffect.js

```js
import { useEffect, useLayoutEffect } from 'react';

const useIsomorphicEffect = (effect, deps) => {
  const handler = typeof window === 'undefined' ? useEffect : useLayoutEffect;
  return handler(effect, deps);
};

export default useIsomorphicEffect;
```

#### js Demo

```jsx | pure
import useIsomorphicEffect from './useIsomorphicEffect';
import React from 'react';

const Demo = () => {
  useIsomorphicEffect(() => {
    window.console.log('hello');
  }, []);
  return <div>Please open the console to see!</div>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
