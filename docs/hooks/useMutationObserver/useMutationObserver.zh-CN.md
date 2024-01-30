---
title: 监听元素钩子函数
nav: 钩子函数
---

| 标题             | 标签            | 首次添加时间 | 更新时间   |
| ---------------- | --------------- | ------------ | ---------- |
| 监听元素钩子函数 | 钩子函数,副作用 | 2022/10/12   | 2022/10/12 |

使用 MutationObserver 监视对 DOM 树的更改

- 使用取决于回调和选项值的 useEffect() 钩子。
- 检查给定的 ref 是否已初始化。 如果是，则创建一个新的 MutationObserver 并将回调传递给它。
- 使用给定选项调用 MutationObserver.observe() 以观察给定 ref 的变化。
- 当组件卸载时，使用 MutationObserver.disconnect() 从 ref 中删除观察者。

#### useMutationObserver.ts

```ts
import { useEffect } from 'react';
import type { RefObject } from 'react';

const useMutationObserver = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => {
        observer.disconnect();
      };
    }
  }, [callback, options]);
};

export default useMutationObserver;
```

#### 示例

```tsx | pure
import React, { useRef, useState } from 'react';
import type { RefObject } from 'react';
import { Input } from 'antd';
import useMutationObserver from './useMutationObserver';

const { TextArea } = Input;

const Demo = () => {
  const mutationRef = useRef<HTMLDivElement>(null);
  const [mutationCount, setMutationCount] = useState(0);
  const incrementCount = () => setMutationCount(mutationCount + 1);
  useMutationObserver(mutationRef as RefObject<HTMLElement>, incrementCount);
  const [content, setContent] = useState('你好，世界！');

  return (
    <>
      <label htmlFor="content-input">编辑这个更改文本:</label>
      <TextArea
        id="content-input"
        style={{ width: '100%' }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></TextArea>
      <div style={{ width: '100%' }} ref={mutationRef}>
        <div
          style={{
            resize: 'both',
            overflow: 'auto',
            maxWidth: '100%',
            border: '1px solid black',
          }}
        >
          <h2>调整大小或更改内容：</h2>
          <p>{content}</p>
        </div>
        <div>
          <h3>变动的计数 {mutationCount}</h3>
        </div>
      </div>
    </>
  );
};

export default Demo;
```

#### useMutationObserver.js

```js
import { useEffect } from 'react';

const useMutationObserver = (
  ref,
  callback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => {
        observer.disconnect();
      };
    }
  }, [callback, options]);
};

export default useMutationObserver;
```

#### js 示例

```jsx | pure
import React, { useRef, useState } from 'react';
import { Input } from 'antd';
import useMutationObserver from './useMutationObserver';

const { TextArea } = Input;

const Demo = () => {
  const mutationRef = useRef();
  const [mutationCount, setMutationCount] = useState(0);
  const incrementCount = () => setMutationCount(mutationCount + 1);
  useMutationObserver(mutationRef, incrementCount);
  const [content, setContent] = useState('你好，世界！');

  return (
    <>
      <label htmlFor="content-input">编辑这个更改文本:</label>
      <TextArea
        id="content-input"
        style={{ width: '100%' }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></TextArea>
      <div style={{ width: '100%' }} ref={mutationRef}>
        <div
          style={{
            resize: 'both',
            overflow: 'auto',
            maxWidth: '100%',
            border: '1px solid black',
          }}
        >
          <h2>调整大小或更改内容：</h2>
          <p>{content}</p>
        </div>
        <div>
          <h3>变动的计数 {mutationCount}</h3>
        </div>
      </div>
    </>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="mutationObserverTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="mutationObserverJsDemoZH"></code>
