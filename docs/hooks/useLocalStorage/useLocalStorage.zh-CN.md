| 标题         | 标签          | 首次添加时间 | 更新时间   |
| ------------ | ------------- | ------------ | ---------- |
| 存储钩子函数 | 钩子函数,状态 | 2022/10/08   | 2022/10/08 |

创建一个持久保存到 localStorage 的有状态值，以及一个更新它的函数。

- 使用带有函数的 useState() 钩子来懒惰地初始化它的值。
- 使用 try...catch 块和 Storage.getItem() 尝试从 Window.localStorage 获取值。 如果未找到值，则使用 Storage.setItem() 存储 defaultValue 并将其用作初始状态。 如果发生错误，使用 defaultValue 作为初始状态。
- 定义一个函数，该函数将使用传递的值更新状态变量并使用 Storage.setItem() 来存储它。

#### useLocalStorage.ts

```ts
import { useState } from 'react';

const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (val: T) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
```

#### 示例

```tsx | pure
import React from 'react';
import { Input } from 'antd';
import useLocalStorage from './useLocalStorage';

const Demo = () => {
  const [name, setName] = useLocalStorage('name', '夕水');
  return <Input value={name} onChange={(e) => setName(e.target.value)}></Input>;
};

export default Demo;
```

#### useLocalStorage.js

```js
import { useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
```

#### js 示例

```jsx | pure
import React from 'react';
import { Input } from 'antd';
import useLocalStorage from './useLocalStorage';

const Demo = () => {
  const [name, setName] = useLocalStorage('name', '夕水');
  return <Input value={name} onChange={(e) => setName(e.target.value)}></Input>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
