| title                  | tags                 | firstSeen | lastUpdated |
| ---------------------- | -------------------- | --------- | ----------- |
| 点击区域之外的钩子函数 | 钩子函数,副作用,事件 | 2022/8/5  | 2022/8/5    |

处理在包装组件外部单击的事件。

- 创建一个自定义钩子，它接受一个 ref 和一个回调来处理点击事件。
- 使用 useEffect() 钩子附加和清理点击事件。
- 使用 useRef() 钩子为你的点击组件创建一个 ref 并将它传递给 useClickOutside 钩子。

```ts
import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

const useClickOutside = (ref: MutableRefObject<any>, callback: Function) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
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

示例代码:

```tsx | pure
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useClickOutside from './useClickOutside';

const ClickStyleBox = styled.div`
  border: 2px dashed #2396ef;
  height: 200px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface ClickBoxProps {
  onClickOutside(): void;
}
const ClickBox = (props: Partial<ClickBoxProps>) => {
  const { onClickOutside } = props;
  const clickRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(clickRef, () => {
    if (onClickOutside) {
      onClickOutside();
    }
  });
  return (
    <ClickStyleBox ref={clickRef}>
      <p>点击这个元素之外的区域</p>
    </ClickStyleBox>
  );
};
const Demo = () => {
  return <ClickBox onClickOutside={() => alert('点击了区域之外')}></ClickBox>;
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

更多示例见 [选择器组件](../../guide/Select/Select)。
