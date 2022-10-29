| 标题             | 标签          | 首次添加时间 | 更新时间   |
| ---------------- | ------------- | ------------ | ---------- |
| 会话存储钩子函数 | 钩子函数,状态 | 2022/10/29   | 2022/10/29 |

创建一个持久化到 sessionStorage 的有状态值，以及一个更新它的函数。

- 使用带有函数的 useState() 钩子来懒惰地初始化它的值。
- 使用 try...catch 块和 Storage.getItem() 尝试从 Window.sessionStorage 获取值。 如果未找到值，则使用 Storage.setItem() 存储 defaultValue 并将其用作初始状态。 如果发生错误，使用 defaultValue 作为初始状态。
- 定义一个函数，该函数将使用传递的值更新状态变量并使用 Storage.setItem() 来存储它。

#### useSessionStorage.ts

```ts
import { useState } from 'react';

const useSessionStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (v: T) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
```

#### 示例

```tsx | pure
import React from 'react';
import { Input } from 'antd';
import useSessionStorage from './useSessionStorage';

const Demo = () => {
  const [name, setName] = useSessionStorage('name', 'John');
  return <Input value={name} onChange={(e) => setName(e.target.value)} />;
};

export default Demo;
```

#### useSessionStorage.js

```js
import { useState } from 'react';

const useSessionStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
```

#### js 示例

```jsx | pure
import React from 'react';
import { Input } from 'antd';
import useSessionStorage from './useSessionStorage';

const Demo = () => {
  const [name, setName] = useSessionStorage('name', 'John');
  return <Input value={name} onChange={(e) => setName(e.target.value)} />;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
