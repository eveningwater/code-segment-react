| 标题                 | 标签        | 首次添加时间 | 更新时间   |
| -------------------- | ----------- | ------------ | ---------- |
| 强制重新渲染钩子函数 | 组件,折叠器 | 2022/11/04   | 2022/11/04 |

强制组件在调用时重新渲染。

- 使用 useReducer() 钩子，该钩子在每次更新时创建一个新对象并返回其调度。

#### useUpdate.ts

```ts
import { useReducer } from 'react';
const useUpdate = () => {
  const [, update] = useReducer(() => Object.create(null), void 0);
  return update;
};

export default useUpdate;
```

#### 示例

```tsx | pure
import React from 'react';
import useUpdate from './useUpdate';
import { Button } from 'antd';

const Demo = () => {
  const update = useUpdate();

  return (
    <>
      <div>当前时间: {Date.now()}</div>
      <Button onClick={update}>更新</Button>
    </>
  );
};

export default Demo;
```

#### useUpdate.js

```js
import { useReducer } from 'react';
const useUpdate = () => {
  const [, update] = useReducer(() => Object.create(null), void 0);
  return update;
};

export default useUpdate;
```

#### js 示例

```jsx | pure
import React from 'react';
import useUpdate from './useUpdate';
import { Button } from 'antd';

const Demo = () => {
  const update = useUpdate();

  return (
    <>
      <div>当前时间: {Date.now()}</div>
      <Button onClick={update}>更新</Button>
    </>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
