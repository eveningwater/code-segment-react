| 标题               | 标签                  | 首次添加时间 | 更新时间   |
| ------------------ | --------------------- | ------------ | ---------- |
| 未加载事件钩子函数 | 钩子函数,副作用，事件 | 2022/11/03   | 2022/11/03 |

处理 beforeunload 窗口事件。

- 使用 useRef() 挂钩为回调函数 fn 创建一个 ref。
- 使用 useEffect() 钩子和 EventTarget.addEventListener() 来处理“beforeunload”（当用户即将关闭窗口时）。
- 卸载组件后，使用 EventTarget.removeEventListener() 执行清理。

#### useUnload.ts

```ts
import { useRef, useEffect } from 'react';

const useUnload = (handler: (...args: any[]) => any) => {
  const cb = useRef(handler);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};

export default useUnload;
```

#### 示例

```tsx | pure
import React from 'react';
import useUnload from './useUnload';

const Demo = () => {
  useUnload((e) => {
    e.preventDefault();
    const exit = confirm('确定要离开吗?');
    if (exit) window.close();
  });
  return <div>尝试关闭窗口。</div>;
};
export default Demo;
```

#### useUnload.js

```js
import { useRef, useEffect } from 'react';

const useUnload = (handler) => {
  const cb = useRef(handler);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};

export default useUnload;
```

#### js 示例

```jsx | pure
import React from 'react';
import useUnload from './useUnload';

const Demo = () => {
  useUnload((e) => {
    e.preventDefault();
    const exit = confirm('确定要离开吗?');
    if (exit) window.close();
  });
  return <div>尝试关闭窗口。</div>;
};
export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
