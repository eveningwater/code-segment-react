| 标题             | 标签                  | 首次添加时间 | 更新时间  |
| ---------------- | --------------------- | ------------ | --------- |
| 事件监听钩子函数 | 钩子函数，事件,副作用 | 2022/9/24    | 2022/9/24 |

为给定元素上的指定事件类型添加事件侦听器。

- 使用 useRef() 钩子创建一个将保存处理程序的 ref。
- 每当处理程序更改时，使用 useEffect() 挂钩来更新 savedHandler ref 的值。
- 使用 useEffect() 挂钩将事件侦听器添加到给定元素并在卸载时进行清理。
- 省略最后一个参数 el，默认使用 Window。

#### useEventListener.ts

```ts
import { useRef, useEffect } from 'react';

export type ELementType = HTMLElement | Element | Document | Window;
export type HandlerType = (...args: any[]) => any;

const useEventListener = (
  type: string,
  handler: HandlerType,
  el: ELementType = window,
) => {
  const saveHandler = useRef<HandlerType>();
  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e: Event | MouseEvent) => saveHandler.current?.(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
};

export default useEventListener;
```

#### 示例

```tsx | pure
import React, { useState, useCallback } from 'react';
import useEventListener from './useEventListener';

const Demo = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const updateCoords = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords],
  );

  useEventListener('mousemove', updateCoords);
  return (
    <p>
      鼠标坐标: {coords.x},{coords.y}
    </p>
  );
};

export default Demo;
```

#### useEventListener.js

```js
import { useRef, useEffect } from 'react';

const useEventListener = (type, handler, el = window) => {
  const saveHandler = useRef();
  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e) => saveHandler.current?.(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
};

export default useEventListener;
```

#### js 示例

```jsx | pure
import React, { useState, useCallback } from 'react';
import useEventListener from './useEventListener';

const Demo = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const updateCoords = useCallback(
    (e) => {
      const { clientX, clientY } = e;
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords],
  );

  useEventListener('mousemove', updateCoords);
  return (
    <p>
      鼠标坐标: {coords.x},{coords.y}
    </p>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
