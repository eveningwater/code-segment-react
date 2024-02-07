| 标题         | 标签            | 首次添加时间 | 更新时间   |
| ------------ | --------------- | ------------ | ---------- |
| 动画钩子函数 | 钩子函数,副作用 | 2022/10/25   | 2022/10/25 |

运行一个动画函数，在每次重绘之前调用它。

- 使用 useRef() 挂钩创建两个变量。 requestRef 将保存最后一个请求 id，而 previousTimeRef 将保存最后一个时间戳。
- 定义一个函数 animate 来处理更新这些变量，运行回调并永久调用 Window.requestAnimationFrame()。
- 使用带有空数组的 useEffect() 挂钩，使用 Window.requestAnimationFrame() 初始化 requestRef 的值。 组件卸载时使用返回值和 Window.cancelAnimationFrame() 进行清理。

#### useRequestAnimationFrame.ts

```ts
import { useRef, useEffect } from 'react';

export type requestAnimationReturnValue = ReturnType<
  typeof requestAnimationFrame
>;
const useRequestAnimationFrame = (callback: (...args: any) => any) => {
  const requestRef = useRef<requestAnimationReturnValue>();
  const previousRef = useRef<requestAnimationReturnValue>();

  const animate = (time: number) => {
    if (previousRef.current) {
      callback(time - previousRef.current);
    }
    previousRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current!);
    };
  }, []);
};

export default useRequestAnimationFrame;
```

#### 示例

```tsx | pure
import React, { useState } from 'react';
import useRequestAnimationFrame from './useRequestAnimationFrame';

const Demo = () => {
  const [count, setCount] = useState(0);

  useRequestAnimationFrame((deltaTime) => {
    setCount((prevCount) => (prevCount + deltaTime * 0.01) % 100);
  });

  return <p>{Math.round(count)}</p>;
};

export default Demo;
```

#### useRequestAnimationFrame.js

```js
import { useRef, useEffect } from 'react';

const useRequestAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousRef = useRef();

  const animate = (time) => {
    if (previousRef.current) {
      callback(time - previousRef.current);
    }
    previousRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
};

export default useRequestAnimationFrame;
```

#### js 示例

```jsx | pure
import React, { useState } from 'react';
import useRequestAnimationFrame from './useRequestAnimationFrame';

const Demo = () => {
  const [count, setCount] = useState(0);

  useRequestAnimationFrame((deltaTime) => {
    setCount((prevCount) => (prevCount + deltaTime * 0.01) % 100);
  });

  return <p>{Math.round(count)}</p>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
