---
title: 点击区域内的钩子函数
nav: 钩子函数
---

| 标题                 | 标签                 | 首次添加时间 | 更新时间 |
| -------------------- | -------------------- | ------------ | -------- |
| 点击区域内的钩子函数 | 钩子函数,副作用,事件 | 2022/8/5     | 2022/8/5 |

处理在包装组件内单击的事件。

- 创建一个自定义钩子，它需要一个 ref 和一个回调来处理“点击”事件。
- 使用 useEffect() 钩子附加和清理点击事件。
- 使用 useRef() 钩子为你的点击组件创建一个 ref 并将它传递给 useClickInside 钩子。

#### useClickInside.ts

```ts
import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

const useClickInside = (ref: MutableRefObject<any>, callback: Function) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
};

export default useClickInside;
```

#### 使用示例（ts 版本）

```tsx | pure
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useClickInside from './useClickInside';

const ClickStyleBox = styled.div`
  border: 2px dashed #2396ef;
  height: 200px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface ClickBoxProps {
  onClickInside(): void;
}
const ClickBox = (props: Partial<ClickBoxProps>) => {
  const { onClickInside } = props;
  const clickRef = useRef<HTMLDivElement | null>(null);
  useClickInside(clickRef, () => {
    if (onClickInside) {
      onClickInside();
    }
  });
  return (
    <ClickStyleBox ref={clickRef}>
      <p>点击这个元素之内的区域</p>
    </ClickStyleBox>
  );
};
const Demo = () => {
  return <ClickBox onClickInside={() => alert('点击了该区域内')}></ClickBox>;
};

export default Demo;
```

#### useClickInside.js

```js
import { useEffect } from 'react';

const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
};

export default useClickOutside;
```

#### 使用示例（js 版本）

```jsx | pure
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useClickInside from './useClickInside';
import Modal from '../../../guide/Modal/jsx/Modal';

const ClickStyleBox = styled.div`
  border: 2px dashed #2396ef;
  height: 200px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ClickBox = (props) => {
  const { onClickInside } = props;
  const clickRef = useRef(null);
  useClickInside(clickRef, () => {
    if (onClickInside) {
      onClickInside();
    }
  });
  return (
    <ClickStyleBox ref={clickRef}>
      <p>点击这个元素之内的区域</p>
    </ClickStyleBox>
  );
};
const Demo = () => {
  return (
    <ClickBox onClickInside={() => Modal.confirm('点击了该区域内')}></ClickBox>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="clickOutsideJsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="clickOutsideJsDemoZH"></code>
