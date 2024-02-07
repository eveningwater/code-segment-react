| 标题               | 标签             | 首次添加时间 | 更新时间  |
| ------------------ | ---------------- | ------------ | --------- |
| 只执行一次钩子函数 | 钩子函数，副作用 | 2022/9/16    | 2022/9/16 |

当条件为真时，最多运行一次回调。

- 使用 useRef() 挂钩创建一个变量 hasRunOnce，以跟踪效果的执行状态。
- 使用仅在 when 条件更改时运行的 useEffect()。
- 检查 when 是否为 true 并且之前没有执行过效果。 如果两者都为真，则运行回调并将 hasRunOnce 设置为真。

#### useEffectOnce.ts

```ts
import { useEffect, useRef } from 'react';

const useEffectOnce = <T, U>(callback: (...args: T[]) => void, when: U) => {
  const hasRunOnce = useRef(false);
  useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [when]);
};

export default useEffectOnce;
```

#### 示例

```tsx | pure
import React, { useState } from 'react';
import useEffectOnce from './useEffectOnce';
import { Button } from 'antd';

const Demo = () => {
  const [clicked, setClicked] = useState(false);
  useEffectOnce(() => {
    console.log('已经被挂载');
  }, clicked);
  return <Button onClick={() => setClicked(true)}>点击我!</Button>;
};

export default Demo;
```

#### useEffectOnce.js

```js
import { useEffect, useRef } from 'react';

const useEffectOnce = (callback, when) => {
  const hasRunOnce = useRef(false);
  useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [when]);
};

export default useEffectOnce;
```

#### js 示例

```jsx | pure
import React, { useState } from 'react';
import useEffectOnce from './useEffectOnce';
import { Button } from 'antd';

const Demo = () => {
  const [clicked, setClicked] = useState(false);
  useEffectOnce(() => {
    console.log('已经被挂载');
  }, clicked);
  return <Button onClick={() => setClicked(true)}>点击我!</Button>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
