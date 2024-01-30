---
title: 传送门钩子函数
nav: 钩子函数
---

| 标题           | 标签                  | 首次添加时间 | 更新时间   |
| -------------- | --------------------- | ------------ | ---------- |
| 传送门钩子函数 | 钩子函数,副作用，状态 | 2022/10/23   | 2022/10/23 |

创建一个传送门，允许在父组件之外渲染子组件。

- 使用 useState() 挂钩创建一个状态变量，用于保存门户的 render() 和 remove() 函数。
- 使用 ReactDOM.createPortal() 和 ReactDOM.unmountComponentAtNode() 创建一个门户和一个删除它的函数。 使用 useCallback() 挂钩将这些函数包装和记忆为 createPortal()。
- 使用 useEffect() 挂钩调用 createPortal() 并在 el 的值更改时更新状态变量。
- 最后，返回状态变量的 render() 函数。

#### usePortal.ts

```ts
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
export type ReturnPortalType = React.ReactPortal | (() => null);
export type RenderType =
  | ((props: React.PropsWithChildren) => React.ReactPortal)
  | (() => null);
export type PortalType = {
  render: RenderType;
  remove: (() => boolean) | (() => null);
};
const usePortal = <T extends Element>(el: T): ReturnPortalType => {
  if (!el) {
    return () => null;
  }

  const [portal, setPortal] = useState<PortalType>({
    render: () => null,
    remove: () => null,
  });

  const createPortal = useCallback((el: T) => {
    const Portal = (props: React.PropsWithChildren) =>
      ReactDOM.createPortal(props.children, el);
    const remove = () => ReactDOM.unmountComponentAtNode(el);

    return {
      render: Portal,
      remove,
    };
  }, []);

  useEffect(() => {
    if (el) {
      portal.remove();
    }
    const newPortal = createPortal(el);
    setPortal(newPortal as PortalType);

    return () => {
      newPortal.remove();
    };
  }, [el]);

  return portal.render as ReturnPortalType;
};

export default usePortal;
```

#### 示例

```tsx | pure
import React, { JSXElementConstructor } from 'react';
import usePortal from './usePortal';

const Demo = () => {
  const Portal = usePortal(
    document.querySelector('.title')!,
  ) as JSXElementConstructor<any>;

  return (
    <p>
      你好，世界!
      <Portal>传送门标题</Portal>
    </p>
  );
};

export default Demo;
```

#### usePortal.js

```js
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
const usePortal = (el) => {
  if (!el) {
    return () => null;
  }
  const [portal, setPortal] = useState({
    render: () => null,
    remove: () => null,
  });

  const createPortal = useCallback((el) => {
    const Portal = (props) => ReactDOM.createPortal(props.children, el);
    const remove = () => ReactDOM.unmountComponentAtNode(el);

    return {
      render: Portal,
      remove,
    };
  }, []);

  useEffect(() => {
    if (el) {
      portal.remove();
    }
    const newPortal = createPortal(el);
    setPortal(newPortal);

    return () => {
      newPortal.remove();
    };
  }, [el]);

  return portal.render;
};

export default usePortal;
```

#### js 示例

```jsx | pure
import React, { JSXElementConstructor } from 'react';
import usePortal from './usePortal';

const Demo = () => {
  const Portal = usePortal(document.querySelector('.title'));

  return (
    <p>
      你好，世界!
      <Portal>传送门标题</Portal>
    </p>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="portalTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="portalJsDemoZH"></code>
