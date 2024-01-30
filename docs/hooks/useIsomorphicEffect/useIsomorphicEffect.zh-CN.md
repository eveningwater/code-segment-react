---
title: 副作用钩子函数
nav: 钩子函数
---

| 标题           | 标签            | 首次添加时间 | 更新时间   |
| -------------- | --------------- | ------------ | ---------- |
| 副作用钩子函数 | 钩子函数,副作用 | 2022/10/06   | 2022/10/06 |

解析为服务器上的 useEffect() 和客户端上的 useLayoutEffect()。

- 使用 typeof 检查是否定义了 Window 对象。 如果是，则返回 useLayoutEffect()。 否则返回 useEffect()。

#### useIsomorphicEffect.ts

```ts
import { useEffect, useLayoutEffect } from 'react';
import type { EffectCallback, DependencyList } from 'react';
const useIsomorphicEffect = (
  effect: EffectCallback,
  deps?: DependencyList | undefined,
): void => {
  const handler = typeof window === 'undefined' ? useEffect : useLayoutEffect;
  return handler(effect, deps);
};

export default useIsomorphicEffect;
```

#### 示例

```tsx | pure
import useIsomorphicEffect from './useIsomorphicEffect';
import React from 'react';

const Demo = () => {
  useIsomorphicEffect(() => {
    window.console.log('你好');
  }, []);
  return <div>请打开控制台查看!</div>;
};

export default Demo;
```

#### useIsomorphicEffect.js

```js
import { useEffect, useLayoutEffect } from 'react';

const useIsomorphicEffect = (effect, deps) => {
  const handler = typeof window === 'undefined' ? useEffect : useLayoutEffect;
  return handler(effect, deps);
};

export default useIsomorphicEffect;
```

#### js 示例

```jsx | pure
import useIsomorphicEffect from './useIsomorphicEffect';
import React from 'react';

const Demo = () => {
  useIsomorphicEffect(() => {
    window.console.log('你好');
  }, []);
  return <div>请打开控制台查看!</div>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="isomorphicEffectTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="isomorphicEffectJsDemoZH"></code>
