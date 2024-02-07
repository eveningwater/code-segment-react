| 标题                   | 标签            | 首次添加时间 | 更新时间 |
| ---------------------- | --------------- | ------------ | -------- |
| 组件状态更新的钩子函数 | 钩子函数,副作用 | 2022/8/6     | 2022/8/6 |

在组件更新后立即执行回调。

- 使用 useRef() 钩子创建一个变量，mounted，跟踪组件是否已安装。
- 使用 useEffect() 钩子在第一次执行钩子时将 mounted 的值设置为 true。
- 在后续的钩子执行中运行提供的回调。
- 为第二个参数条件提供一个依赖数组，只有在任何依赖发生变化时才会执行钩子。
- 行为类似于类组件的 componentDidUpdate() 生命周期方法。

#### useComponentDidUpdate.ts

```ts
import { useEffect, DependencyList, useRef } from 'react';
const useComponentDidUpdate = (
  handler: (...args: any[]) => any,
  deps: DependencyList,
) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      handler?.();
    } else {
      mounted.current = true;
    }
  }, deps);
};

export default useComponentDidUpdate;
```

#### 使用示例(ts 版本)

```tsx | pure
import React, { useState } from 'react';
import Button from '../../guide/Button/Button';
import useComponentDidUpdate from './useComponentDidUpdate';
const Demo = () => {
  const [value, setValue] = useState(0);
  const [otherValue, setOtherValue] = useState(1);

  useComponentDidUpdate(() => {
    console.log('当前的值是:' + value + '。');
  }, [value]);
  return (
    <>
      <p>
        值是:{value},其它值是: {otherValue}
      </p>
      <Button type="primary" onClick={() => setValue(value + 1)}>
        增加值
      </Button>
      <Button type="primary" onClick={() => setOtherValue(otherValue + 1)}>
        增加其它值
      </Button>
    </>
  );
};

export default Demo;
```

#### useComponentDidUpdate.js

```js
import { useEffect, useRef } from 'react';
const useComponentDidUpdate = (handler, deps) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      handler?.();
    } else {
      mounted.current = true;
    }
  }, deps);
};

export default useComponentDidUpdate;
```

#### 使用示例(js 版本)

```jsx | pure
import React, { useState } from 'react';
import Button from '../../../guide/Button/jsx/Button';
import useComponentDidUpdate from './useComponentDidUpdate';
import { Space } from 'antd';
const Demo = () => {
  const [value, setValue] = useState(0);
  const [otherValue, setOtherValue] = useState(1);

  useComponentDidUpdate(() => {
    console.log('当前的值是:' + value + '。');
  }, [value]);
  return (
    <>
      <p>
        值是:{value},其它值是: {otherValue}
      </p>
      <Space>
        <Button type="primary" onClick={() => setValue(value + 1)}>
          增加值
        </Button>
        <Button type="primary" onClick={() => setOtherValue(otherValue + 1)}>
          增加其它值
        </Button>
      </Space>
    </>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
