---
title: 定时器钩子函数
nav: 钩子函数
---

| 标题           | 标签            | 首次添加时间 | 更新时间   |
| -------------- | --------------- | ------------ | ---------- |
| 定时器钩子函数 | 钩子函数,副作用 | 2022/10/05   | 2022/10/05 |

以声明方式实现 setInterval()。

- 创建一个接受回调和延迟的自定义钩子。
- 使用 useRef() 钩子为回调函数创建一个引用。
- 使用 useEffect() 挂钩来记住最新的回调，只要它发生变化。
- 使用依赖于延迟的 useEffect() 挂钩来设置间隔并进行清理。

#### useInterval.ts

```ts
import { useEffect, useRef } from 'react';
export type CallbackType = (...args: any) => any;
const useInterval = (callback: CallbackType, delay: number) => {
  const savedCallback = useRef<CallbackType>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current?.();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
```

#### 示例

```tsx | pure
import React, { useState } from 'react';
import useInterval from './useInterval';
const Demo = () => {
  const [seconds, setSeconds] = useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

export default Demo;
```

#### useInterval.js

```js
import { useEffect, useRef } from 'react';
const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current?.();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
```

#### js 示例

```jsx | pure
import React, { useState } from 'react';
import useInterval from './useInterval';
const Demo = () => {
  const [seconds, setSeconds] = useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="intervalTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="intervalJsDemoZH"></code>
