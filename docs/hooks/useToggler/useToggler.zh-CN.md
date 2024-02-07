| 标题               | 标签                    | 首次添加时间 | 更新时间   |
| ------------------ | ----------------------- | ------------ | ---------- |
| 修改布尔值钩子函数 | 钩子函数,状态，回调函数 | 2022/11/02   | 2022/11/02 |

提供可以在其两种状态之间切换的布尔状态变量。

- 使用 useState() 挂钩创建值状态变量及其设置器。
- 创建一个函数，使用 useCallback() 钩子切换值状态变量的值并对其进行记忆。
- 返回值状态变量和记忆的切换器函数。

#### useToggler.ts

```ts
import { useState, useCallback } from 'react';

const useToggler = (initialState: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initialState);
  const toggleValue = useCallback(() => setValue((prev: boolean) => !prev), []);
  return [value, toggleValue];
};

export default useToggler;
```

#### 示例

```tsx | pure
import React from 'react';
import { Button } from 'antd';
import useToggler from './useToggler';

const Demo = () => {
  const [val, toggleVal] = useToggler(false);
  return <Button onClick={toggleVal}>{val ? '开' : '关'}</Button>;
};
export default Demo;
```

#### useToggler.js

```js
import { useState, useCallback } from 'react';

const useToggler = (initialState) => {
  const [value, setValue] = useState(initialState);
  const toggleValue = useCallback(() => setValue((prev) => !prev), []);
  return [value, toggleValue];
};

export default useToggler;
```

#### js 示例

```jsx | pure
import React from 'react';
import { Button } from 'antd';
import useToggler from './useToggler';

const Demo = () => {
  const [val, toggleVal] = useToggler(false);
  return <Button onClick={toggleVal}>{val ? '开' : '关'}</Button>;
};
export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
