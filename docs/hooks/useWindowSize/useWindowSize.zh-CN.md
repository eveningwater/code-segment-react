---
title: 窗口变动事件的钩子函数
nav: 钩子函数
---

| 标题                 | 标签                   | 首次添加时间 | 更新时间   |
| -------------------- | ---------------------- | ------------ | ---------- |
| 窗口变动事件钩子函数 | 钩子函数，状态，副作用 | 2022/11/05   | 2022/11/05 |

跟踪浏览器窗口的尺寸。

- 使用 useState() 挂钩来初始化将保存窗口尺寸的状态变量。 将两个值都设置为 undefined 进行初始化以避免服务器和客户端渲染之间的不匹配。
- 创建一个使用 Window.innerWidth 和 Window.innerHeight 更新状态变量的函数。
- 使用 useEffect() 挂钩为挂载时的“调整大小”事件设置适当的侦听器，并在卸载时清理它。

#### useWindowSize.ts

```ts
import { useState, useEffect } from 'react';
const useWindowSize = (): { width: number; height: number } => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const onHandleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    onHandleResize();
    window.addEventListener('resize', onHandleResize);
    return () => {
      window.removeEventListener('resize', onHandleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
```

#### 示例

```tsx | pure
import React from 'react';
import useWindowSize from './useWindowSize';

const Demo = () => {
  const { width, height } = useWindowSize();

  return (
    <p>
      窗口大小: ({width} x {height})
    </p>
  );
};

export default Demo;
```

#### useWindowSize.js

```js
import { useState, useEffect } from 'react';
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const onHandleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    onHandleResize();
    window.addEventListener('resize', onHandleResize);
    return () => {
      window.removeEventListener('resize', onHandleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
```

#### js 示例

```jsx | pure
import React from 'react';
import useWindowSize from './useWindowSize';

const Demo = () => {
  const { width, height } = useWindowSize();

  return (
    <p>
      窗口大小: ({width} x {height})
    </p>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="windowSizeTsDemoZh"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="windowSizeJsDemoZh"></code>
