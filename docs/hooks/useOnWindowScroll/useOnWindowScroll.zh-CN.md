---
title: 窗口滚动事件监听钩子函数
nav: 钩子函数
---

| 标题                 | 标签                  | 首次添加时间 | 更新时间   |
| -------------------- | --------------------- | ------------ | ---------- |
| 窗口滚动事件钩子函数 | 钩子函数,副作用，事件 | 2022/10/17   | 2022/10/17 |

每当滚动窗口时执行回调。

- 使用 useRef() 挂钩创建一个变量 listener，它将保存 listener 引用。
- 使用 useEffect() 钩子和 EventTarget.addEventListener() 来监听 Window 全局对象的“滚动”事件。
- 使用 EventTarget.removeEventListener() 删除任何现有的侦听器并在组件卸载时进行清理。

#### useOnWindowScroll.ts

```ts
import { useRef, useEffect } from 'react';

const useOnWindowScroll = (callback: EventListenerOrEventListenerObject) => {
  const listener = useRef<void | null>(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('scroll', listener.current);
    }
    listener.current = window.addEventListener('scroll', callback);
    return () => {
      window.removeEventListener(
        'scroll',
        listener.current as unknown as EventListenerOrEventListenerObject,
      );
    };
  }, [callback]);
};

export default useOnWindowScroll;
```

#### 示例

```tsx | pure
import React from 'react';
import useOnWindowScroll from './useOnWindowScroll';

const Demo = () => {
  useOnWindowScroll(() => console.log(`scroll Y: ${window.pageYOffset}`));
  return <p style={{ height: '300vh' }}>滚动并检查控制台</p>;
};

export default Demo;
```

#### useOnWindowScroll.js

```js
import { useRef, useEffect } from 'react';

const useOnWindowScroll = (callback) => {
  const listener = useRef(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('scroll', listener.current);
    }
    listener.current = window.addEventListener('scroll', callback);
    return () => {
      window.removeEventListener('scroll', listener.current);
    };
  }, [callback]);
};

export default useOnWindowScroll;
```

#### js 示例

```jsx | pure
import React from 'react';
import useOnWindowScroll from './useOnWindowScroll';

const Demo = () => {
  useOnWindowScroll(() => console.log(`scroll Y: ${window.pageYOffset}`));
  return <p style={{ height: '300vh' }}>滚动并检查控制台</p>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="windowScrollTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="windowScrollJsDemoZH"></code>
