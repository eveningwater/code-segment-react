| 标题                   | 标签                  | 首次添加时间 | 更新时间  |
| ---------------------- | --------------------- | ------------ | --------- |
| 修改 hash 值的钩子函数 | 钩子函数，状态,副作用 | 2022/9/28    | 2022/9/28 |

跟踪浏览器的位置哈希值，并允许更改它。

- 使用 useState() 钩子懒惰地获取 Location 对象的 hash 属性。
- 使用 useCallback() 钩子创建一个更新状态的处理程序。
- 在挂载时使用 useEffect() 钩子为“hashchange”事件添加监听器，并在卸载时清理它。
- 使用 useCallback() 挂钩创建一个函数，该函数使用给定值更新 Location 对象的哈希属性。

#### useHash.ts

```ts
import { useState, useCallback, useEffect } from 'react';
const useHash = (): [string, (v: string) => void] => {
  const [hash, setHash] = useState(() => window.location.hash);
  const onHashChangeHandler = useCallback(() => {
    setHash(window.location.hash);
  }, []);
  useEffect(() => {
    window.addEventListener('hashchange', onHashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', onHashChangeHandler);
    };
  }, []);

  const updateHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash],
  );

  return [hash, updateHash];
};

export default useHash;
```

#### 示例

```tsx | pure
import React, { useEffect } from 'react';
import { Input } from 'antd';
import useHash from './useHash';
const Demo = () => {
  const [hash, setHash] = useHash();
  useEffect(() => {
    setHash('#list');
  }, []);
  return (
    <>
      <p>当前地址: {window.location.href}</p>
      <p>编辑哈希值:</p>
      <Input value={hash} onChange={(e) => setHash(e.target.value)}></Input>
    </>
  );
};

export default Demo;
```

#### useHash.js

```js
import { useState, useCallback, useEffect } from 'react';
const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);
  const onHashChangeHandler = useCallback(() => {
    setHash(window.location.hash);
  }, []);
  useEffect(() => {
    window.addEventListener('hashchange', onHashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', onHashChangeHandler);
    };
  }, []);

  const updateHash = useCallback(
    (newHash) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash],
  );

  return [hash, updateHash];
};

export default useHash;
```

#### js 示例

```jsx | pure
import React, { useEffect } from 'react';
import { Input } from 'antd';
import useHash from './useHash';
const Demo = () => {
  const [hash, setHash] = useHash();
  useEffect(() => {
    setHash('#list');
  }, []);
  return (
    <>
      <p>当前地址: {window.location.href}</p>
      <p>编辑哈希值:</p>
      <Input value={hash} onChange={(e) => setHash(e.target.value)}></Input>
    </>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
