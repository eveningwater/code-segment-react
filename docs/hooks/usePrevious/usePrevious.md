| title                  | tags               | firstSeen  | lastUpdated |
| ---------------------- | ------------------ | ---------- | ----------- |
| React usePrevious hook | hooks,effect,state | 2022/10/24 | 2022/10/24  |

Stores the previous state or props.

- Create a custom hook that takes a value.
- Use the useRef() hook to create a ref for the value.
- Use the useEffect() hook to remember the latest value.

#### usePrevious.ts

```ts
import { useRef, useEffect } from 'react';

const usePrevious = <T>(value: T): T | void => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
```

#### Demo

```tsx | pure
import React, { useState } from 'react';
import usePrevious from './usePrevious';
import { Button } from 'antd';

const Demo = () => {
  const [value, setValue] = useState(0);
  const lastValue = usePrevious(value);

  return (
    <div>
      <p>
        <>
          Current: {value} - Previous: {lastValue}
        </>
      </p>
      <Button onClick={() => setValue(value + 1)}>Increment</Button>
    </div>
  );
};

export default Demo;
```

#### usePrevious.js

```js
import { useRef, useEffect } from 'react';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
```

#### js Demo

```jsx | pure
import React, { useState } from 'react';
import usePrevious from './usePrevious';
import { Button } from 'antd';

const Demo = () => {
  const [value, setValue] = useState(0);
  const lastValue = usePrevious(value);

  return (
    <div>
      <p>
        Current: {value} - Previous: {lastValue}
      </p>
      <Button onClick={() => setValue(value + 1)}>Increment</Button>
    </div>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
