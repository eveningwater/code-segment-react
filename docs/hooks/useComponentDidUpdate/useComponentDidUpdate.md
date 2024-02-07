| title                            | tags         | firstSeen | lastUpdated |
| -------------------------------- | ------------ | --------- | ----------- |
| React useComponentDidUpdate hook | hooks,effect | 2022/8/6  | 2022/8/6    |

Executes a callback immediately after a component is updated.

- Use the useRef() hook to create a variable, mounted, that tracks if the component has been mounted.
- Use the useEffect() hook to set the value of mounted to true the first time the hook is executed.
- Run the provided callback on subsequent hook executions.
- Providing a dependency array for the second argument, condition, will only execute the hook if any of the dependencies change.
- Behaves like the componentDidUpdate() lifecycle method of class components.

#### useComponentDidUpdate.ts

```ts
import { useEffect, DependencyList, useRef } from 'react';
const useComponentDidUpdate = (
  handler: (...args: any[]) => any,
  deps: DependencyList,
) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      handler?.();
    } else {
      mounted.current = true;
    }
  }, deps);
};

export default useComponentDidUpdate;
```

#### ts demo

```tsx | pure
import React, { useState } from 'react';
import Button from '../../guide/Button/Button';
import useComponentDidUpdate from './useComponentDidUpdate';

const Demo = () => {
  const [value, setValue] = useState(0);
  const [otherValue, setOtherValue] = useState(1);

  useComponentDidUpdate(() => {
    console.log('Current value is:' + value + '.');
  }, [value]);
  return (
    <>
      <p>
        Value:{value},otherValue: {otherValue}
      </p>
      <Button type="primary" onClick={() => setValue(value + 1)}>
        Increment value
      </Button>
      <Button type="primary" onClick={() => setOtherValue(otherValue + 1)}>
        Increment other value
      </Button>
    </>
  );
};

export default Demo;
```

#### useComponentDidUpdate.js

```js
import { useEffect, useRef } from 'react';
const useComponentDidUpdate = (handler, deps) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      handler?.();
    } else {
      mounted.current = true;
    }
  }, deps);
};

export default useComponentDidUpdate;
```

#### js demo

```jsx | pure
import React, { useState } from 'react';
import Button from '../../../guide/Button/jsx/Button';
import useComponentDidUpdate from './useComponentDidUpdate';
import { Space } from 'antd';
const Demo = () => {
  const [value, setValue] = useState(0);
  const [otherValue, setOtherValue] = useState(1);

  useComponentDidUpdate(() => {
    console.log('Current value is:' + value + '.');
  }, [value]);
  return (
    <>
      <p>
        Value:{value},otherValue: {otherValue}
      </p>
      <Space>
        <Button type="primary" onClick={() => setValue(value + 1)}>
          Increment value
        </Button>
        <Button type="primary" onClick={() => setOtherValue(otherValue + 1)}>
          Increment other value
        </Button>
      </Space>
    </>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
