| 标题           | 标签           | 首次添加时间 | 更新时间  |
| -------------- | -------------- | ------------ | --------- |
| 默认值钩子函数 | 钩子函数，状态 | 2022/9/14    | 2022/9/14 |

#### useDefault.ts

```ts
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const useDefault = <T, U>(
  defaultState: T,
  initialState: U,
): [T | U, Dispatch<SetStateAction<U | null | undefined>>] => {
  const [value, setValue] = useState<null | undefined | U>(initialState);

  const isEmptyValue = value === undefined || value === null;

  return [isEmptyValue ? defaultState : value, setValue];
};

export default useDefault;
```

#### 示例

```tsx | pure
import React from 'react';
import { Input, Button } from 'antd';
import useDefault from './useDefault';

const Demo = () => {
  const [user, setUser] = useDefault({ name: '夕水1' }, { name: '夕水2' });
  return (
    <>
      <div>用户名: {user.name}</div>
      <Input onChange={(e) => setUser({ name: e.target.value })}></Input>
      <Button onClick={() => setUser(null)}>清空</Button>
    </>
  );
};

export default Demo;
```

#### useDefault.js

```js
import { useState } from 'react';

const useDefault = (defaultState, initialState) => {
  const [value, setValue] = useState(initialState);

  const isEmptyValue = value === undefined || value === null;

  return [isEmptyValue ? defaultState : value, setValue];
};

export default useDefault;
```

#### js 示例

```jsx | pure
import React from 'react';
import { Input, Button } from 'antd';
import useDefault from './useDefault';

const Demo = () => {
  const [user, setUser] = useDefault({ name: '夕水1' }, { name: '夕水2' });
  return (
    <>
      <div>用户名: {user.name}</div>
      <Input onChange={(e) => setUser({ name: e.target.value })}></Input>
      <Button onClick={() => setUser(null)}>清空</Button>
    </>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
