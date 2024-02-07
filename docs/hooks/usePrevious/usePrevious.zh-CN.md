| 标题                 | 标签                  | 首次添加时间 | 更新时间   |
| -------------------- | --------------------- | ------------ | ---------- |
| 存储旧值状态钩子函数 | 钩子函数,副作用，状态 | 2022/10/24   | 2022/10/24 |

存储以前的状态或道具。

- 创建一个接受值的自定义钩子。
- 使用 useRef() 钩子为该值创建一个 ref。
- 使用 useEffect() 挂钩来记住最新的值。

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

#### 示例

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
          当前值: {value} - 之前值: {lastValue}
        </>
      </p>
      <Button onClick={() => setValue(value + 1)}>增加</Button>
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

#### js 示例

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
        <>
          当前值: {value} - 之前值: {lastValue}
        </>
      </p>
      <Button onClick={() => setValue(value + 1)}>增加</Button>
    </div>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
