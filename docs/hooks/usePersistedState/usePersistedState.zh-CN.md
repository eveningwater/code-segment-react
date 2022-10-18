| 标题                 | 标签                  | 首次添加时间 | 更新时间   |
| -------------------- | --------------------- | ------------ | ---------- |
| 永久存储状态钩子函数 | 钩子函数,副作用，状态 | 2022/10/18   | 2022/10/18 |

返回一个有状态的值，保存在 localStorage 中，以及一个更新它的函数。

- 使用 useState() 挂钩将值初始化为 defaultValue。
- 使用 useRef() 挂钩创建一个 ref，该 ref 将保存 Window.localStorage 中值的名称。
- 使用 3 个 useEffect() 挂钩实例分别进行初始化、值更改和名称更改。
- 首次挂载组件时，如果有存储值，则使用 Storage.getItem() 更新值，或者使用 Storage.setItem() 持久化当前值。
- 更新值时，使用 Storage.setItem() 存储新值。
- 更新 name 时，使用 Storage.setItem() 创建新密钥，更新 nameRef 并使用 Storage.removeItem() 从 Window.localStorage 中删除以前的密钥。
- 注意：该钩子用于原始值（即不是对象）并且不考虑由于其他代码而对 Window.localStorage 进行的更改。 这两个问题都可以轻松处理（例如 JSON 序列化和处理“存储”事件）。

#### usePersistedState.ts

```ts
import { useEffect, useState, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const usePersistedState = (
  name: string,
  defaultValue: string,
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState(defaultValue);
  const nameRef = useRef<string>(name);

  useEffect(() => {
    try {
      const storeValue = localStorage.getItem(name);
      if (storeValue !== null) {
        setValue(storeValue);
      } else {
        localStorage.setItem(name, defaultValue);
      }
    } catch {
      setValue(defaultValue);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(nameRef.current, value);
    } catch {}
  }, [value]);

  useEffect(() => {
    const lastName = nameRef.current;
    if (name !== lastName) {
      try {
        localStorage.setItem(name, value);
        nameRef.current = name;
        localStorage.removeItem(lastName);
      } catch {}
    }
  }, [name]);

  return [value, setValue];
};

export default usePersistedState;
```

#### 示例

```tsx | pure
import React, { useState } from 'react';
import usePersistedState from './usePersistedState';
import { Input } from 'antd';

const MyComponent = (props: { name: string }) => {
  const { name } = props;
  const [value, setValue] = usePersistedState(name, '10');

  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
};

const Demo = () => {
  const [name, setName] = useState('my-value');
  return (
    <>
      <MyComponent name={name} />
      <Input value={name} onChange={(e) => setName(e.target.name)} />
    </>
  );
};

export default Demo;
```

#### usePersistedState.js

```js
import { useEffect, useState, useRef } from 'react';

const usePersistedState = (name, defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const nameRef = useRef(name);

  useEffect(() => {
    try {
      const storeValue = localStorage.getItem(name);
      if (storeValue !== null) {
        setValue(storeValue);
      } else {
        localStorage.setItem(name, defaultValue);
      }
    } catch {
      setValue(defaultValue);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(nameRef.current, value);
    } catch {}
  }, [value]);

  useEffect(() => {
    const lastName = nameRef.current;
    if (name !== lastName) {
      try {
        localStorage.setItem(name, value);
        nameRef.current = name;
        localStorage.removeItem(lastName);
      } catch {}
    }
  }, [name]);

  return [value, setValue];
};

export default usePersistedState;
```

#### js 示例

```jsx | pure
import React, { useState } from 'react';
import usePersistedState from './usePersistedState';
import { Input } from 'antd';

const MyComponent = (props) => {
  const { name } = props;
  const [value, setValue] = usePersistedState(name, '10');

  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
};

const Demo = () => {
  const [name, setName] = useState('my-value');
  return (
    <>
      <MyComponent name={name} />
      <Input value={name} onChange={(e) => setName(e.target.name)} />
    </>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
