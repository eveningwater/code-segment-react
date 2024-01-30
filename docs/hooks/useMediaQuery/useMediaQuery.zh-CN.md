---
title: 检查媒体查询环境钩子函数
nav: 钩子函数
---

| 标题                     | 标签                 | 首次添加时间 | 更新时间   |
| ------------------------ | -------------------- | ------------ | ---------- |
| 检查媒体查询环境钩子函数 | 钩子函数,状态,副作用 | 2022/10/10   | 2022/10/10 |

检查当前环境是否匹配给定的媒体查询并返回适当的值。

- 检查 Window 和 Window.matchMedia() 是否存在。 如果不是，则返回 whenFalse（例如 SSR 环境或不支持的浏览器）。
- 使用 Window.matchMedia() 匹配给定的查询。 使用 useState() 钩子将它的 matches 属性转换为布尔值并存储在状态变量 match 中。
- 使用 useEffect() 挂钩为更改添加监听器，并在挂钩被销毁后清理监听器。
- 根据 match 的值返回 whenTrue 或 whenFalse。

#### useMediaQuery.ts

```ts
import { useState, useEffect } from 'react';

const useMediaQuery = <T extends string, U, K>(
  query: T,
  whenTrue: U,
  whenFalse: K,
): U | K => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) {
    return whenFalse;
  }

  const mediaQuery = window.matchMedia(query);

  const [match, setMatch] = useState(!!mediaQuery.matches);

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches);

    mediaQuery.addListener(handler);

    return () => {
      mediaQuery.removeListener(handler);
    };
  }, []);

  return match ? whenTrue : whenFalse;
};

export default useMediaQuery;
```

#### 示例

```tsx | pure
import React from 'react';
import useMediaQuery from './useMediaQuery';

const Demo = () => {
  const text = useMediaQuery(
    '(max-width: 400px)',
    '宽度小于 400 像素',
    '宽度大于 400 像素',
  );
  return <span>{text}</span>;
};

export default Demo;
```

#### useMediaQuery.js

```js
import { useState, useEffect } from 'react';

const useMediaQuery = (query, whenTrue, whenFalse) => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) {
    return whenFalse;
  }

  const mediaQuery = window.matchMedia(query);

  const [match, setMatch] = useState(!!mediaQuery.matches);

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches);

    mediaQuery.addListener(handler);

    return () => {
      mediaQuery.removeListener(handler);
    };
  }, []);

  return match ? whenTrue : whenFalse;
};

export default useMediaQuery;
```

#### js 示例

```jsx | pure
import React from 'react';
import useMediaQuery from './useMediaQuery';

const Demo = () => {
  const text = useMediaQuery(
    '(max-width: 400px)',
    '宽度小于 400 像素',
    '宽度大于 400 像素',
  );
  return <span>{text}</span>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="mediaQueryTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="mediaQueryJsDemoZH"></code>
