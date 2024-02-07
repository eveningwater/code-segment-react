| 标题               | 标签            | 首次添加时间 | 更新时间 |
| ------------------ | --------------- | ------------ | -------- |
| 组件挂载的钩子函数 | 钩子函数,副作用 | 2022/8/5     | 2022/8/5 |

安装组件后立即执行回调。

- 使用带有空数组的 useEffect() 钩子作为第二个参数。 这将仅在安装组件时执行一次提供的回调。
- 行为类似于类组件的 componentDidMount() 生命周期方法。

#### useComponentDidMount.ts

```ts
import { useEffect } from 'react';
const useComponentDidMount = (onMountHandler: Function) => {
  useEffect(() => {
    onMountHandler();
  }, []);
};
export default useComponentDidMount;
```

#### 使用示例(ts 版本)

```tsx | pure
import React, { useRef } from 'react';
import useComponentDidMount from './useComponentDidMount';
const Mounter = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useComponentDidMount(() =>
    console.log(
      '组件确实挂载，获取元素:',
      containerRef.current?.tagName.toLowerCase(),
    ),
  );
  return <div ref={containerRef}>Check the console!</div>;
};

const Demo = () => <Mounter />;

export default Demo;
```

#### useComponentDidMount.js

```js
import { useEffect } from 'react';
const useComponentDidMount = (onMountHandler) => {
  useEffect(() => {
    onMountHandler();
  }, []);
};
export default useComponentDidMount;
```

#### 使用示例(js 版本)

```jsx | pure
import React, { useRef } from 'react';
import useComponentDidMount from './useComponentDidMount';
const Mounter = () => {
  const containerRef = useRef(null);
  useComponentDidMount(() =>
    console.log(
      '组件确实挂载，获取元素:',
      containerRef.current?.tagName.toLowerCase(),
    ),
  );
  return <div ref={containerRef}>Check the console!</div>;
};

const Demo = () => <Mounter />;

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
