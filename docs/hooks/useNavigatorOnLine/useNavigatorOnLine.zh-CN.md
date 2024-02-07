| 标题             | 标签                 | 首次添加时间 | 更新时间   |
| ---------------- | -------------------- | ------------ | ---------- |
| 是否在线钩子函数 | 钩子函数,状态,副作用 | 2022/10/13   | 2022/10/13 |

检查客户端是在线还是离线。

- 创建一个函数 getOnLineStatus，它使用 Navigator.onLine Web API 来获取客户端的在线状态。
- 使用 useState() 挂钩创建适当的状态变量、状态和设置器。
- 使用 useEffect() 挂钩为适当的事件添加侦听器，更新状态，并在卸载时清理这些侦听器。
- 最后返回状态状态变量。

#### useNavigatorOnLine.ts

```ts
import { useEffect, useState } from 'react';
const getOnLineStatus = (): boolean =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
const useNavigatorOnLine = (): boolean => {
  const [status, setStatus] = useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return status;
};

export default useNavigatorOnLine;
```

#### 示例

```tsx | pure
import React from 'react';
import useNavigatorOnLine from './useNavigatorOnLine';

const Demo = () => {
  const isOnline = useNavigatorOnLine();
  return <span>你{isOnline ? '在线' : '离线'}</span>;
};

export default Demo;
```

#### useNavigatorOnLine.js

```js
import { useEffect, useState } from 'react';
const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
const useNavigatorOnLine = () => {
  const [status, setStatus] = useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return status;
};

export default useNavigatorOnLine;
```

#### js 示例

```jsx | pure
import React from 'react';
import useNavigatorOnLine from './useNavigatorOnLine';

const Demo = () => {
  const isOnline = useNavigatorOnLine();
  return <span>你{isOnline ? '在线' : '离线'}</span>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
