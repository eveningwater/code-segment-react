| 标题         | 标签                   | 首次添加时间 | 更新时间  |
| ------------ | ---------------------- | ------------ | --------- |
| 防抖钩子函数 | 钩子函数，状态，折叠器 | 2022/9/13    | 2022/9/13 |

消除给定值的抖动。

- 创建一个接受值和延迟的自定义挂钩。
- 使用 useState() 挂钩来存储去抖值。
- 每次更新值时，使用 useEffect() 挂钩更新去抖动值。
- 使用 setTimeout() 创建一个超时，以延迟 ms 延迟调用前一个状态变量的设置器。
- 卸载组件时使用 clearTimeout() 进行清理。
- 这在处理用户输入时特别有用。

#### useDebounce.ts

```ts
import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debounceValue;
};

export default useDebounce;
```

#### Demo

```tsx | pure
import React, { useState } from 'react';
import Button from '../../guide/Button/Button';
import useDebounce from './useDebounce';

const Demo = () => {
  const [value, setValue] = useState(0);
  const lastValue = useDebounce(value, 500);
  return (
    <div>
      <p>
        当前值: {value} - 防抖值: {lastValue}
      </p>
      <Button type="primary" onClick={() => setValue(value + 1)}>
        增加
      </Button>
    </div>
  );
};

export default Demo;
```

#### useDebounce.js

```js
import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debounceValue;
};

export default useDebounce;
```

#### js Demo

```jsx | pure
import React, { useState } from 'react';
import Button from '../../../guide/Button/jsx/Button';
import useDebounce from './useDebounce';

const Demo = () => {
  const [value, setValue] = useState(0);
  const lastValue = useDebounce(value, 500);
  return (
    <div>
      <p>
        当前值: {value} - 防抖值: {lastValue}
      </p>
      <Button type="primary" onClick={() => setValue(value + 1)}>
        增加
      </Button>
    </div>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.zh-CN.tsx"></code>

js Demo:

<code src="./js/Demo.zh-CN.jsx"></code>
