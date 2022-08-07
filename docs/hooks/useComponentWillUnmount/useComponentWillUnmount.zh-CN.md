| 标题                   | 标签            | 首次添加时间 | 更新时间 |
| ---------------------- | --------------- | ------------ | -------- |
| 组件即将卸载的钩子函数 | 钩子函数,副作用 | 2022/8/7     | 2022/8/7 |

在组件被卸载和销毁之前立即执行回调。

- 使用带有空数组的 useEffect() 钩子作为第二个参数。 返回提供的回调在清理之前只执行一次。
- 行为类似于类组件的 componentWillUnmount() 生命周期方法。

hooks:

```ts
import { useEffect } from 'react';

const useComponentWillUnmount = (onUnmountHandler) => {
  useEffect(() => () => onUnmountHandler?.(), []);
};

export default useComponentWillUnmount;
```

Demo:

```tsx | pure
import React from 'react';
import useComponentWillUnmount from './useComponentWillUnmount';

const UnMounter = () => {
  useComponentWillUnmount(() => console.log('组件即将卸载'));
  return <div>检查控制台</div>;
};

const Demo = () => <UnMounter />;

export default Demo;
```

Demo:

<code src="./Demo.zh-CN.tsx"></code>
