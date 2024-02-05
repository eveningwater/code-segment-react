| title                           | tags         | firstSeen | lastUpdated |
| ------------------------------- | ------------ | --------- | ----------- |
| React useComponentDidMount hook | hooks,effect | 2022/8/5  | 2022/8/5    |

Executes a callback immediately after a component is mounted.

- Use the useEffect() hook with an empty array as the second argument. This will execute the provided callback only once when the component is mounted.
- Behaves like the componentDidMount() lifecycle method of class components.

#### useComponentDidMount.ts

```ts
import { useEffect } from 'react';
const useComponentDidMount = (onMountHandler: Function) => {
  useEffect(() => {
    onMountHandler();
  }, []);
};
export default useComponentDidMount;
```

#### ts demo

```tsx | pure
import React, { useRef } from 'react';
import useComponentDidMount from './useComponentDidMount';
const Mounter = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useComponentDidMount(() =>
    console.log(
      'Component did mount, get the element:',
      containerRef.current?.tagName.toLowerCase(),
    ),
  );
  return <div ref={containerRef}>Check the console!</div>;
};

const Demo = () => <Mounter />;

export default Demo;
```

#### useComponentDidMount.js

```js
import { useEffect } from 'react';
const useComponentDidMount = (onMountHandler) => {
  useEffect(() => {
    onMountHandler();
  }, []);
};
export default useComponentDidMount;
```

#### js Demo

```jsx | pure
import React, { useRef } from 'react';
import useComponentDidMount from './useComponentDidMount';
const Mounter = () => {
  const containerRef = useRef(null);
  useComponentDidMount(() =>
    console.log(
      'Component did mount, get the element:',
      containerRef.current?.tagName.toLowerCase(),
    ),
  );
  return <div ref={containerRef}>Check the console!</div>;
};

const Demo = () => <Mounter />;

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="componentDidMountTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="componentDidMountJsDemo"></code>
