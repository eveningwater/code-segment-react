---
title: 获取浏览器路径参数的钩子函数
nav: 钩子函数
---

| 标题                       | 标签                  | 首次添加时间 | 更新时间   |
| -------------------------- | --------------------- | ------------ | ---------- |
| 获取浏览器路径参数钩子函数 | 钩子函数,副作用，状态 | 2022/10/28   | 2022/10/28 |

跟踪浏览器的位置搜索参数。

- 使用 useCallback() 挂钩创建一个回调，该回调使用 URLSearchParams 构造函数来获取参数的当前值。
- 使用 useState() 钩子创建一个保存参数当前值的状态变量。
- 使用 useEffect() 挂钩设置适当的事件侦听器以在挂载时更新状态变量，并在卸载时清理它们。

#### useSearchParam.ts

```ts
import { useState, useCallback, useEffect } from 'react';

const events = ['popstate', 'pushstate', 'replacestate'];
const useSearchParam = (param: string): (() => string | null) => {
  const getValue = useCallback(
    () => () => new URLSearchParams(window.location.search).get(param),
    [param],
  );

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const onChange = () => {
      setValue(getValue());
    };

    events.forEach((type) => window.addEventListener(type, onChange));

    return () => {
      events.forEach((type) => window.removeEventListener(type, onChange));
    };
  }, []);

  return value;
};

export default useSearchParam;
```

#### 示例

```tsx | pure
import React from 'react';
import useSearchParam from './useSearchParam';
import { Button } from 'antd';

const Demo = () => {
  const post = useSearchParam('post');
  const onPushState = (param: string | void) => {
    history.pushState({}, '', location.pathname + (param ? param : ''));
  };
  return (
    <div>
      <p>
        Post参数值:
        <>{post || 'null'}</>
      </p>
      <Button onClick={() => onPushState('?post=42')}>查看post参数值42</Button>
      <Button onClick={() => onPushState()}>退出</Button>
    </div>
  );
};

export default Demo;
```

#### useSearchParam.js

```js
import { useState, useCallback, useEffect } from 'react';

const events = ['popstate', 'pushstate', 'replacestate'];
const useSearchParam = (param) => {
  const getValue = useCallback(
    () => () => new URLSearchParams(window.location.search).get(param),
    [param],
  );

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const onChange = () => {
      setValue(getValue());
    };

    events.forEach((type) => window.addEventListener(type, onChange));

    return () => {
      events.forEach((type) => window.removeEventListener(type, onChange));
    };
  }, []);

  return value;
};

export default useSearchParam;
```

#### js 示例

```jsx | pure
import React from 'react';
import useSearchParam from './useSearchParam';
import { Button } from 'antd';

const Demo = () => {
  const post = useSearchParam('post');
  const onPushState = (param) => {
    history.pushState({}, '', location.pathname + (param ? param : ''));
  };
  return (
    <div>
      <p>
        Post参数值:
        <>{post || 'null'}</>
      </p>
      <Button onClick={() => onPushState('?post=42')}>查看post参数值42</Button>
      <Button onClick={() => onPushState()}>退出</Button>
    </div>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="searchParamTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="searchParamJsDemoZH"></code>
