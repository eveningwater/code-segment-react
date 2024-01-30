---
title: 全局事件钩子函数
nav: 钩子函数
---

| 标题             | 标签                  | 首次添加时间 | 更新时间   |
| ---------------- | --------------------- | ------------ | ---------- |
| 全局事件钩子函数 | 钩子函数,副作用，事件 | 2022/10/15   | 2022/10/15 |

每当全局对象上发生事件时执行回调。

- 使用 useRef() 挂钩创建一个变量 listener，它将保存 listener 引用。
- 使用 useRef() 挂钩创建一个变量，该变量将保存类型和选项参数的先前值。
- 使用 useEffect() 钩子和 EventTarget.addEventListener() 来侦听 Window 全局对象上的给定事件类型。
- 使用 EventTarget.removeEventListener() 删除任何现有的侦听器并在组件卸载时进行清理。

#### useOnGlobalEvent.ts

```ts
import { useEffect, useRef } from 'react';

const useOnGlobalEvent = (
  type: string,
  callback: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) => {
  const listener = useRef<void | null>(null);
  const previousProps = useRef({ type, options });
  useEffect(() => {
    const { type: previousType, options: previousOptions } =
      previousProps.current;
    if (listener.current) {
      window.removeEventListener(
        previousType,
        listener.current,
        previousOptions,
      );
    }
    listener.current = window.addEventListener(type, callback);
    previousProps.current = { type, options };

    return () => {
      window.removeEventListener(
        type,
        listener.current as unknown as EventListenerOrEventListenerObject,
        options,
      );
    };
  }, [type, callback, options]);
};

export default useOnGlobalEvent;
```

#### 示例

```tsx | pure
import React from 'react';
import useOnGlobalEvent from './useOnGlobalEvent';

const Demo = () => {
  useOnGlobalEvent('mousemove', (e: Event) => {
    const { x, y } = e as MouseEvent;
    console.log(`(${x}, ${y})`);
  });
  return <p>移动你的鼠标</p>;
};

export default Demo;
```

#### useOnGlobalEvent.js

```js
import { useEffect, useRef } from 'react';

const useOnGlobalEvent = (type, callback, options) => {
  const listener = useRef(null);
  const previousProps = useRef({ type, options });
  useEffect(() => {
    const { type: previousType, options: previousOptions } =
      previousProps.current;
    if (listener.current) {
      window.removeEventListener(
        previousType,
        listener.current,
        previousOptions,
      );
    }
    listener.current = window.addEventListener(type, callback);
    previousProps.current = { type, options };
    return () => {
      window.removeEventListener(type, listener.current, options);
    };
  }, [type, callback, options]);
};

export default useOnGlobalEvent;
```

#### js 示例

```jsx | pure
import React from 'react';
import useOnGlobalEvent from './useOnGlobalEvent';

const Demo = () => {
  useOnGlobalEvent('mousemove', (e) => {
    const { x, y } = e;
    console.log(`(${x}, ${y})`);
  });
  return <p>移动你的鼠标</p>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="globalEventTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="globalEventJsDemoZH"></code>
