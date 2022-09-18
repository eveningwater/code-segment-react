| 标题         | 标签                  | 首次添加时间 | 更新时间  |
| ------------ | --------------------- | ------------ | --------- |
| 错误钩子函数 | 钩子函数，状态,副作用 | 2022/9/18    | 2022/9/18 |

创建一个错误调度程序。

- 使用 useState() 挂钩创建一个包含错误的状态变量。
- 只要它是真实的，就使用 useEffect() 钩子抛出错误。
- 使用 useCallback() 挂钩更新状态并返回缓存的函数。

#### useError.ts

```ts
import { useState, useEffect, useCallback } from 'react';
const useError = <T>(err: T): ((...args: any) => void) => {
  const [error, setError] = useState(err);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const dispatchError = useCallback((err: T) => {
    setError(err);
  }, []);

  return dispatchError;
};

export default useError;
```

#### 示例

```tsx | pure
import React from 'react';
import { Button } from 'antd';
import useError from './useError';
const Demo = () => {
  const dispatchError = useError('');
  const clickHandler = () => {
    dispatchError(new Error('错误!'));
  };
  return <Button onClick={clickHandler}>抛出错误</Button>;
};

export default Demo;
```

#### useError.js

```js
import { useState, useEffect, useCallback } from 'react';
const useError = (err) => {
  const [error, setError] = useState(err);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const dispatchError = useCallback((err) => {
    setError(err);
  }, []);

  return dispatchError;
};

export default useError;
```

#### js 示例

```jsx | pure
import React from 'react';
import { Button } from 'antd';
import useError from './useError';
const Demo = () => {
  const dispatchError = useError('');
  const clickHandler = () => {
    dispatchError(new Error('错误!'));
  };
  return <Button onClick={clickHandler}>抛出错误</Button>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
