---
title: 延迟定时器钩子函数
nav: 钩子函数
---

| 标题         | 标签            | 首次添加时间 | 更新时间   |
| ------------ | --------------- | ------------ | ---------- |
| 延迟钩子函数 | 钩子函数,副作用 | 2022/10/31   | 2022/10/31 |

以声明方式实现 setTimeout()。

- 创建一个接受回调和延迟的自定义钩子。
- 使用 useRef() 钩子为回调函数创建一个引用。
- 使用 useEffect() 挂钩来记住最新的回调。
- 使用 useEffect() 挂钩设置超时并进行清理。

#### useTimeout.ts

```ts
import { useRef, useEffect } from 'react';

export type AnyFunc = (...args: any[]) => any;

const useTimeout = (callback: AnyFunc, delay: number) => {
  const savedCallback = useRef<AnyFunc>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current?.();
    if (typeof delay === 'number') {
      let id = setTimeout(tick, delay);
      return () => {
        clearTimeout(id);
      };
    }
  }, [delay]);
};

export default useTimeout;
```

#### 示例

```tsx | pure
import React from 'react';
import useTimeout from './useTimeout';

const Demo = () => {
  const [seconds, setSeconds] = React.useState(0);
  useTimeout(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

export default Demo;
```

#### useTimeout.js

```js
import { useRef, useEffect } from 'react';

const useTimeout = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current?.();
    if (typeof delay === 'number') {
      let id = setTimeout(tick, delay);
      return () => {
        clearTimeout(id);
      };
    }
  }, [delay]);
};

export default useTimeout;
```

#### js 示例

```jsx | pure
import React from 'react';
import useTimeout from './useTimeout';

const Demo = () => {
  const [seconds, setSeconds] = React.useState(0);
  useTimeout(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="timeoutTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="timeoutTsDemoZH"></code>
