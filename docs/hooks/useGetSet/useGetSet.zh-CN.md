---
title: 状态设置钩子函数
nav: 钩子函数
---

| 标题             | 标签           | 首次添加时间 | 更新时间  |
| ---------------- | -------------- | ------------ | --------- |
| 状态设置钩子函数 | 钩子函数，状态 | 2022/9/27    | 2022/9/27 |

创建一个有状态的值，返回一个 getter 和一个 setter 函数。

- 使用 useRef() 挂钩创建一个保存有状态值的 ref，并使用 initialState 对其进行初始化。
- 使用 useReducer() 钩子，该钩子在每次更新时创建一个新对象并返回其调度。
- 使用 useMemo() 挂钩来记忆一对函数。 第一个将返回 state ref 的当前值，第二个将更新它并强制重新渲染。

#### useGetSet.ts

```ts
import { useRef, useReducer, useMemo } from 'react';

const useGetSet = <T>(initialState?: T) => {
  const state = useRef(initialState);
  const [, update] = useReducer(() => ({}), {});
  return useMemo(
    () => [
      () => state.current,
      (newState?: T) => {
        state.current = newState;
        update();
      },
    ],
    [],
  );
};

export default useGetSet;
```

#### 示例

```tsx | pure
import React from 'react';
import useGetSet from './useGetSet';
import { Button } from 'antd';

const Demo = () => {
  const [count, setCount] = useGetSet(0);

  const onClickHandler = () => {
    setTimeout(() => {
      setCount((count() as unknown as number) + 1);
    }, 1_000);
  };

  return (
    <Button onClick={onClickHandler}>
      计数: {count() as unknown as number}
    </Button>
  );
};

export default Demo;
```

#### useGetSet.js

```js
import { useRef, useReducer, useMemo } from 'react';

const useGetSet = (initialState) => {
  const state = useRef(initialState);
  const [, update] = useReducer(() => ({}));
  return useMemo(
    () => [
      () => state.current,
      (newState) => {
        state.current = newState;
        update?.();
      },
    ],
    [],
  );
};

export default useGetSet;
```

#### js 示例

```jsx | pure
import React from 'react';
import useGetSet from './useGetSet';
import { Button } from 'antd';

const Demo = () => {
  const [count, setCount] = useGetSet(0);

  const onClickHandler = () => {
    setTimeout(() => {
      setCount(count() + 1);
    }, 1_000);
  };

  return <Button onClick={onClickHandler}>计数: {count()}</Button>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="getSetTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="getSetJsDemoZH"></code>
