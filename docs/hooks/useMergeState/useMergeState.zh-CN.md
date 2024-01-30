---
title: 合并状态钩子函数
nav: 钩子函数
---

| 标题             | 标签          | 首次添加时间 | 更新时间   |
| ---------------- | ------------- | ------------ | ---------- |
| 合并状态钩子函数 | 钩子函数,状态 | 2022/10/11   | 2022/10/11 |

创建一个有状态的值，以及一个通过合并提供的新状态来更新它的函数。

- 使用 useState() 钩子创建一个状态变量，将其初始化为 initialState。
- 创建一个函数，通过将提供的新状态与现有状态合并来更新状态变量。 如果新状态是一个函数，则以前一个状态作为参数调用它并使用结果。
- 省略参数，以使用空对象 ({}) 初始化状态变量。

#### useMergeState.ts

```ts
import { useState } from 'react';

const useMergeState = <T>(
  initialState: Record<string, T> = {},
): [
  Record<string, T>,
  (v: Record<string, T> | ((...args: any) => any)) => void,
] => {
  const [value, setValue] = useState(initialState);

  const mergeState = (
    newState: Record<string, T> | ((...args: any) => any),
  ) => {
    if (typeof newState === 'function') {
      newState = newState(value);
    }
    setValue({
      ...value,
      ...newState,
    });
  };

  return [value, mergeState];
};

export default useMergeState;
```

#### 示例

```tsx | pure
import React from 'react';
import { Button, Input, Space } from 'antd';
import useMergeState from './useMergeState';

const Demo = () => {
  const [data, setData] = useMergeState({ name: 'eveningwater', age: 26 });
  return (
    <Space wrap>
      {data.name}
      <Input
        value={data.name}
        onChange={(e) => setData({ name: e.target.value })}
      />
      <Button onClick={() => setData(({ age }) => ({ age: age - 1 }))}>
        -
      </Button>
      {data.age}
      <Button onClick={() => setData(({ age }) => ({ age: age + 1 }))}>
        +
      </Button>
    </Space>
  );
};

export default Demo;
```

#### useMergeState.js

```js
import { useState } from 'react';

const useMergeState = (initialState = {}) => {
  const [value, setValue] = useState(initialState);

  const mergeState = (newState) => {
    if (typeof newState === 'function') {
      newState = newState(value);
    }
    setValue({
      ...value,
      ...newState,
    });
  };

  return [value, mergeState];
};

export default useMergeState;
```

#### js 示例

```jsx | pure
import React from 'react';
import { Button, Input, Space } from 'antd';
import useMergeState from './useMergeState';

const Demo = () => {
  const [data, setData] = useMergeState({ name: 'eveningwater', age: 26 });
  return (
    <Space wrap>
      {data.name}
      <Input
        value={data.name}
        onChange={(e) => setData({ name: e.target.value })}
      />
      <Button onClick={() => setData(({ age }) => ({ age: age - 1 }))}>
        -
      </Button>
      {data.age}
      <Button onClick={() => setData(({ age }) => ({ age: age + 1 }))}>
        +
      </Button>
    </Space>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="mergeStateTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="mergeStateJsDemoZH"></code>
