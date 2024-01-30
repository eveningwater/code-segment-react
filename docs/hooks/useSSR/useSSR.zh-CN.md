---
title: 判断环境的钩子函数
nav: 钩子函数
---

| 标题             | 标签                        | 首次添加时间 | 更新时间   |
| ---------------- | --------------------------- | ------------ | ---------- |
| 判断环境钩子函数 | 钩子函数,副作用，状态，记忆 | 2022/10/26   | 2022/10/26 |

检查代码是否在浏览器或服务器上运行。

- 创建一个返回适当对象的自定义钩子。
- 使用 typeof、Window、Window.document 和 Document.createElement() 来检查代码是否在浏览器上运行。
- 使用 useState() 挂钩来定义 inBrowser 状态变量。
- 使用 useEffect() 挂钩更新 inBrowser 状态变量并在最后进行清理。
- 使用 useMemo() 挂钩来记忆自定义挂钩的返回值。

#### useSSR.ts

```ts
import { useState, useEffect, useMemo } from 'react';

const isDOMavailable = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
export type ssrReturnType = {
  isBrowser: boolean;
  isServer: boolean;
  canUseWorkers: boolean;
  canUseEventListeners: boolean;
  canUseViewport: boolean;
};
const useSSR = (): ssrReturnType => {
  const [inBrowser, setInBrowser] = useState(isDOMavailable);

  useEffect(() => {
    setInBrowser(isDOMavailable);
    return () => {
      setInBrowser(false);
    };
  }, []);

  const useSSRObject = useMemo(
    () => ({
      isBrowser: inBrowser,
      isServer: !inBrowser,
      canUseWorkers: typeof Worker !== 'undefined',
      canUseEventListeners: inBrowser && !!window.addEventListener,
      canUseViewport: inBrowser && !!window.screen,
    }),
    [inBrowser],
  );

  return useMemo(
    () => Object.assign(Object.values(useSSRObject), useSSRObject),
    [inBrowser],
  );
};

export default useSSR;
```

#### 示例

```tsx | pure
import React from 'react';
import useSSR from './useSSR';
const Demo = () => {
  const { isBrowser } = useSSR();
  return <p>{isBrowser ? '运行在浏览器环境中' : '运行在服务端环境中'}</p>;
};

export default Demo;
```

#### useSSR.js

```js
import { useState, useEffect, useMemo } from 'react';

const isDOMavailable = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const useSSR = () => {
  const [inBrowser, setInBrowser] = useState(isDOMavailable);

  useEffect(() => {
    setInBrowser(isDOMavailable);
    return () => {
      setInBrowser(false);
    };
  }, []);

  const useSSRObject = useMemo(
    () => ({
      isBrowser: inBrowser,
      isServer: !inBrowser,
      canUseWorkers: typeof Worker !== 'undefined',
      canUseEventListeners: inBrowser && !!window.addEventListener,
      canUseViewport: inBrowser && !!window.screen,
    }),
    [inBrowser],
  );

  return useMemo(
    () => Object.assign(Object.values(useSSRObject), useSSRObject),
    [inBrowser],
  );
};

export default useSSR;
```

#### js 示例

```jsx | pure
import React from 'react';
import useSSR from './useSSR';
const Demo = () => {
  const { isBrowser } = useSSR();
  return <p>{isBrowser ? '运行在浏览器环境中' : '运行在服务端环境中'}</p>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="ssrTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="ssrJsDemoZH"></code>
