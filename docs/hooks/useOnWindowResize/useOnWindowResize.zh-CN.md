| 标题                     | 标签                  | 首次添加时间 | 更新时间   |
| ------------------------ | --------------------- | ------------ | ---------- |
| 窗口大小改变事件钩子函数 | 钩子函数,副作用，事件 | 2022/10/16   | 2022/10/16 |

每当调整窗口大小时执行回调。

- 使用 useRef() 挂钩创建一个变量 listener，它将保存 listener 引用。
- 使用 useEffect() 钩子和 EventTarget.addEventListener() 来监听 Window 全局对象的 'resize' 事件。
- 使用 EventTarget.removeEventListener() 删除任何现有的侦听器并在组件卸载时进行清理。

#### useOnWindowResize.ts

```ts
import { useRef, useEffect } from 'react';

const useOnWindowResize = (callback: EventListenerOrEventListenerObject) => {
  const listener = useRef<void | null>(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('resize', listener.current);
    }
    listener.current = window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener(
        'resize',
        listener.current as unknown as EventListenerOrEventListenerObject,
      );
    };
  }, [callback]);
};

export default useOnWindowResize;
```

#### 示例

```tsx | pure

```

#### useOnWindowResize.js

```js
import { useRef, useEffect } from 'react';

const useOnWindowResize = (callback) => {
  const listener = useRef(null);

  useEffect(() => {
    if (listener.current) {
      window.removeEventListener('resize', listener.current);
    }
    listener.current = window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', listener.current);
    };
  }, [callback]);
};

export default useOnWindowResize;
```

#### js 示例

```jsx | pure

```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
