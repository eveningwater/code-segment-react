---
title: 键盘按键钩子函数
nav: 钩子函数
---

| 标题             | 标签                        | 首次添加时间 | 更新时间   |
| ---------------- | --------------------------- | ------------ | ---------- |
| 键盘按键钩子函数 | 钩子函数,状态，副作用，事件 | 2022/10/07   | 2022/10/07 |

侦听给定键的按下状态的变化。

- 使用 useState() 钩子创建一个状态变量来保存给定键的按下状态。
- 定义两个处理函数，相应地在按下或按下键时更新状态变量。
- 使用 useEffect() 钩子和 EventTarget.addEventListener() 来处理“keydown”和“keyup”事件。
- 卸载组件后，使用 EventTarget.removeEventListener() 执行清理。

#### useKeyPress.ts

```ts
import { useState, useEffect } from 'react';

const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);
  const onDownHandler = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };
  const onUpHandler = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onDownHandler);
    window.addEventListener('keyup', onUpHandler);
    return () => {
      window.removeEventListener('keydown', onDownHandler);
      window.removeEventListener('keyup', onUpHandler);
    };
  }, []);
  return keyPressed;
};

export default useKeyPress;
```

#### 示例

```tsx | pure
import React from 'react';
import useKeyPress from './useKeyPress';

const Demo = () => {
  const wPressed = useKeyPress('w');
  return <p>w键{!wPressed ? '没 ' : ''}有被按下!</p>;
};

export default Demo;
```

#### useKeyPress.js

```js
import { useState, useEffect } from 'react';

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);
  const onDownHandler = (e) => {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };
  const onUpHandler = (e) => {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onDownHandler);
    window.addEventListener('keyup', onUpHandler);
    return () => {
      window.removeEventListener('keydown', onDownHandler);
      window.removeEventListener('keyup', onUpHandler);
    };
  }, []);
  return keyPressed;
};

export default useKeyPress;
```

#### js 示例

```jsx | pure
import React from 'react';
import useKeyPress from './useKeyPress';

const Demo = () => {
  const wPressed = useKeyPress('w');
  return <p>w键{!wPressed ? '没 ' : ''}有被按下!</p>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="keyPressTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="keyPressJsDemoZH"></code>
