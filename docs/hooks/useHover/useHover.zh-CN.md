---
title: 悬浮钩子函数
nav: 钩子函数
---

| 标题         | 标签                    | 首次添加时间 | 更新时间   |
| ------------ | ----------------------- | ------------ | ---------- |
| 悬浮钩子函数 | 钩子函数，状态,回调函数 | 2022/10/03   | 2022/10/03 |

处理悬停在包装组件上的事件。

- 使用 useState() 钩子创建一个保存悬停状态的变量。
- 使用 useCallback() 挂钩来记忆两个更新状态的处理函数。
- 使用 useCallback() 挂钩创建回调引用并创建或更新“mouseover”和“mouseout”事件的侦听器。
- 使用 useRef() 挂钩来跟踪传递给 callbackRef 的最后一个节点，以便能够删除其侦听器。

#### useHover.ts

```ts
import { useState, useCallback, useRef } from 'react';

const useHover = (): [(node: HTMLElement | null) => void, boolean] => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseOver = useCallback(() => {
    setIsHovering(true);
  }, []);
  const onMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  const nodeRef = useRef<HTMLElement | null>(null);
  const callbackRef = useCallback(
    (node: HTMLElement | null) => {
      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', onMouseOver);
        nodeRef.current.addEventListener('mouseout', onMouseOut);
      }
      nodeRef.current = node;
      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', onMouseOver);
        nodeRef.current.addEventListener('mouseout', onMouseOut);
      }
    },
    [onMouseOver, onMouseOut],
  );
  return [callbackRef, isHovering];
};

export default useHover;
```

#### 示例

```tsx | pure
import React from 'react';
import useHover from './useHover';

const Demo = () => {
  const [hoverRef, isHovering] = useHover();
  return <div ref={hoverRef}>{isHovering ? '悬浮中' : '未悬浮'}</div>;
};

export default Demo;
```

#### useHover.js

```js
import { useState, useCallback, useRef } from 'react';

const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseOver = useCallback(() => {
    setIsHovering(true);
  }, []);
  const onMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  const nodeRef = useRef();
  const callbackRef = useCallback(
    (node) => {
      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', onMouseOver);
        nodeRef.current.addEventListener('mouseout', onMouseOut);
      }
      nodeRef.current = node;
      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', onMouseOver);
        nodeRef.current.addEventListener('mouseout', onMouseOut);
      }
    },
    [onMouseOver, onMouseOut],
  );
  return [callbackRef, isHovering];
};

export default useHover;
```

#### js 示例

```jsx | pure
import React from 'react';
import useHover from './useHover';

const Demo = () => {
  const [hoverRef, isHovering] = useHover();
  return <div ref={hoverRef}>{isHovering ? '悬浮中' : '未悬浮'}</div>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="hoverTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="hoverJsDemoZH"></code>
