---
title: 集合数据钩子函数
nav: 钩子函数
---

| 标题         | 标签          | 首次添加时间 | 更新时间   |
| ------------ | ------------- | ------------ | ---------- |
| set 钩子函数 | 钩子函数,状态 | 2022/10/30   | 2022/10/30 |

创建一个有状态的 Set 对象，以及一组对其进行操作的函数。

- 使用 useState() 钩子和 Set 构造函数从 initialValue 创建一个新的 Set。
- 使用 useMemo() 钩子创建一组操作 set 状态变量的非变异操作，每次使用 state setter 创建一个新 Set。
- 返回设置的状态变量和创建的动作。

#### useSet.ts

```ts
import { useState, useMemo } from 'react';

export interface ReturnValue {
  add: (i: Iterable<any>) => void;
  remove: (i: Iterable<any>) => void;
  clear: () => void;
}
const useSet = <T>(initialValue: Iterable<T>): [Set<T>, ReturnValue] => {
  const [set, setSet] = useState(new Set(initialValue));
  const actions = useMemo(
    () => ({
      add: (item: Iterable<any>) =>
        setSet((prevSet: Iterable<any>) => new Set([...prevSet, item])),
      remove: (item: Iterable<any>) =>
        setSet(
          (prevSet: Iterable<any>) =>
            new Set([...prevSet].filter((i) => i !== item)),
        ),
      clear: () => setSet(new Set()),
    }),
    [setSet],
  );

  return [set, actions];
};

export default useSet;
```

#### 示例

```tsx | pure
import React from 'react';
import { Button } from 'antd';
import useSet from './useSet';

const Demo = () => {
  const [set, { add, remove, clear }] = useSet(new Set(['apples']));

  return (
    <div>
      <Button onClick={() => add(String(Date.now()))}>Add</Button>
      <Button onClick={() => clear()}>Reset</Button>
      <Button onClick={() => remove('apples')} disabled={!set.has('apples')}>
        Remove apples
      </Button>
      <pre>{JSON.stringify([...set], null, 2)}</pre>
    </div>
  );
};

export default Demo;
```

#### useSet.js

```js
import { useState, useMemo } from 'react';

const useSet = (initialValue) => {
  const [set, setSet] = useState(new Set(initialValue));
  const actions = useMemo(
    () => ({
      add: (item) => setSet((prevSet) => new Set([...prevSet, item])),
      remove: (item) =>
        setSet((prevSet) => new Set([...prevSet].filter((i) => i !== item))),
      clear: () => setSet(new Set()),
    }),
    [setSet],
  );

  return [set, actions];
};

export default useSet;
```

#### js 示例

```jsx | pure
import React from 'react';
import { Button } from 'antd';
import useSet from './useSet';

const Demo = () => {
  const [set, { add, remove, clear }] = useSet(new Set(['apples']));

  return (
    <div>
      <Button onClick={() => add(String(Date.now()))}>Add</Button>
      <Button onClick={() => clear()}>Reset</Button>
      <Button onClick={() => remove('apples')} disabled={!set.has('apples')}>
        Remove apples
      </Button>
      <pre>{JSON.stringify([...set], null, 2)}</pre>
    </div>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="setTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="setJsDemoZH"></code>
