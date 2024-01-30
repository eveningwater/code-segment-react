---
title: 映射数据钩子函数
nav: 钩子函数
---

| 标题             | 标签          | 首次添加时间 | 更新时间   |
| ---------------- | ------------- | ------------ | ---------- |
| 映射数据钩子函数 | 钩子函数,状态 | 2022/10/09   | 2022/10/09 |

创建一个有状态的 Map 对象，以及一组操作它的函数。

- 使用 useState() 钩子和 Map 构造函数从 initialValue 创建一个新 Map。
- 使用 useMemo() 钩子创建一组操作地图状态变量的非变异操作，每次使用状态设置器创建一个新地图。
- 返回地图状态变量和创建的动作。

#### useMap.ts

```ts
import { useState, useMemo } from 'react';

const useMap = (
  initialValue: Iterable<[any, any]>,
): [
  Map<any, any>,
  {
    set: (key: any, value: any) => void;
    remove: (key: any) => void;
    clear: () => void;
  },
] => {
  const [map, setMap] = useState(new Map(initialValue));

  const actions = useMemo(
    () => ({
      set: (key: any, value: any) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.set(key, value);
          return nextMap;
        }),
      remove: (key: any) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.delete(key);
          return nextMap;
        }),
      clear: () => setMap(new Map()),
    }),
    [setMap],
  );

  return [map, actions];
};

export default useMap;
```

#### 示例

```tsx | pure
import React from 'react';
import useMap from './useMap';
import { Button } from 'antd';

const Demo = () => {
  const [map, { clear, remove, set }] = useMap([['apples', 10]]);

  return (
    <div>
      <Button onClick={() => set(Date.now(), new Date().toJSON())}>添加</Button>
      <Button onClick={() => clear()}>重置</Button>
      <Button onClick={() => remove('apples')} disabled={!map.has('apples')}>
        移除
      </Button>
      <pre>
        {JSON.stringify(
          [...map.entries()].reduce(
            (acc, [key, value]) => ({ ...acc, [key]: value }),
            {},
          ),
          null,
          2,
        )}
      </pre>
    </div>
  );
};

export default Demo;
```

#### useMap.js

```js
import { useState, useMemo } from 'react';

const useMap = (initialValue) => {
  const [map, setMap] = useState(new Map(initialValue));

  const actions = useMemo(
    () => ({
      set: (key, value) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.set(key, value);
          return nextMap;
        }),
      remove: (key) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.delete(key);
          return nextMap;
        }),
      clear: () => setMap(new Map()),
    }),
    [setMap],
  );

  return [map, actions];
};

export default useMap;
```

#### js 示例

```jsx | pure
import React from 'react';
import useMap from './useMap';
import { Button } from 'antd';

const Demo = () => {
  const [map, { clear, remove, set }] = useMap([['apples', 10]]);

  return (
    <div>
      <Button onClick={() => set(Date.now(), new Date().toJSON())}>添加</Button>
      <Button onClick={() => clear()}>重置</Button>
      <Button onClick={() => remove('apples')} disabled={!map.has('apples')}>
        移除
      </Button>
      <pre>
        {JSON.stringify(
          [...map.entries()].reduce(
            (acc, [key, value]) => ({ ...acc, [key]: value }),
            {},
          ),
          null,
          2,
        )}
      </pre>
    </div>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="mapTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="mapJsDemoZH"></code>
