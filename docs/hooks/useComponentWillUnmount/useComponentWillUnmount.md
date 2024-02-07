| title                              | tags         | firstSeen | lastUpdated |
| ---------------------------------- | ------------ | --------- | ----------- |
| React useComponentWillUnmount hook | hooks,effect | 2022/8/7  | 2022/8/7    |

Executes a callback immediately before a component is unmounted and destroyed.

- Use the useEffect() hook with an empty array as the second argument. Return the provided callback to be executed only once before cleanup.
- Behaves like the componentWillUnmount() lifecycle method of class components.

#### useComponentWillUnmount.ts

```ts
import { useEffect } from 'react';

const useComponentWillUnmount = (onUnmountHandler) => {
  useEffect(() => () => onUnmountHandler?.(), []);
};

export default useComponentWillUnmount;
```

#### ts demo

```tsx | pure
import React from 'react';
import useComponentWillUnmount from './useComponentWillUnmount';

const UnMounter = () => {
  useComponentWillUnmount(() => console.log('Component will unmount'));
  return <div>Check the console</div>;
};

const Demo = () => <UnMounter />;

export default Demo;
```

#### useComponentWillUnmount.js

```js
import { useEffect } from 'react';

const useComponentWillUnmount = (onUnmountHandler) => {
  useEffect(() => () => onUnmountHandler?.(), []);
};

export default useComponentWillUnmount;
```

#### js demo

```jsx | pure
import React from 'react';
import useComponentWillUnmount from './useComponentWillUnmount';

const UnMounter = () => {
  useComponentWillUnmount(() => console.log('Component will unmount'));
  return <div>Check the console</div>;
};

const Demo = () => <UnMounter />;

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
