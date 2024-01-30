---
title: 限制字符的多行文本框组件
nav: 指南
---

| 标题                 | 标签                      | 首次添加时间 | 更新时间  |
| -------------------- | ------------------------- | ------------ | --------- |
| 限制字符的文本框组件 | 组件,状态，回调函数，事件 | 2022/7/21    | 2022/7/21 |

呈现具有字符限制的 textarea 组件。

- 使用 useState() 钩子创建内容状态变量。 将其值设置为 value 道具的值，修剪以限制字符。
- 创建一个方法 setFormattedContent，它使用 useCallback() 钩子修剪内容以限制字符并记住它。
- 绑定 `<textarea>` 的 onChange 事件，以触发事件的值调用 setFormattedContent。

#### LimitedTextarea.tsx

```tsx | pure
import React, { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import styled from '@emotion/styled';
interface LimitedTextareaProps extends Record<string, unknown> {
  limit: number;
  rows: number;
  cols: number;
  value: string;
}
const LimitedStyleTextarea = styled.textarea`
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  max-width: 100%;
  height: auto;
  min-height: 32px;
  line-height: 1.5715;
  vertical-align: bottom;
  transition: all 0.3s, height 0s;
  border-radius: 4px;
  &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    border-right-width: 1px;
    outline: 0;
  }
  &:hover {
    border-right-width: 1px;
    border-color: #40a9ff;
  }
`;

const ShowCountTextarea = styled.span`
  &::after {
    content: attr(data-count);
    float: right;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.73);
  }
`;

const LimitedTextarea = (props: Partial<LimitedTextareaProps>) => {
  const { limit, rows, cols, value, ...rest } = props;

  const [content, setContent] = useState(value?.slice(0, limit));

  const setFormattedContent = useCallback(
    (text: string) => {
      setContent(text.slice(0, limit));
    },
    [limit, setContent],
  );
  return (
    <ShowCountTextarea data-count={`${content?.length || 0} / ${limit}`}>
      <LimitedStyleTextarea
        rows={rows}
        cols={cols}
        value={content}
        onChange={(e: ChangeEvent) =>
          setFormattedContent((e.target as HTMLTextAreaElement).value)
        }
        {...rest}
      ></LimitedStyleTextarea>
    </ShowCountTextarea>
  );
};

export default LimitedTextarea;
```

#### LimitedTextarea.jsx

```jsx | pure
import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';

const LimitedStyleTextarea = styled.textarea`
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  max-width: 100%;
  height: auto;
  min-height: 32px;
  line-height: 1.5715;
  vertical-align: bottom;
  transition: all 0.3s, height 0s;
  border-radius: 4px;
  &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    border-right-width: 1px;
    outline: 0;
  }
  &:hover {
    border-right-width: 1px;
    border-color: #40a9ff;
  }
`;

const ShowCountTextarea = styled.span`
  &::after {
    content: attr(data-count);
    float: right;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.73);
  }
`;

const LimitedTextarea = (props) => {
  const { limit, rows, cols, value, ...rest } = props;

  const [content, setContent] = useState(value?.slice(0, limit));

  const setFormattedContent = useCallback(
    (text) => {
      setContent(text.slice(0, limit));
    },
    [limit, setContent],
  );
  return (
    <ShowCountTextarea data-count={`${content?.length || 0} / ${limit}`}>
      <LimitedStyleTextarea
        rows={rows}
        cols={cols}
        value={content}
        onChange={(e) => setFormattedContent(e.target.value)}
        {...rest}
      ></LimitedStyleTextarea>
    </ShowCountTextarea>
  );
};

export default LimitedTextarea;
```

示例:

<code src="./Demo.zh-CN.tsx" id="limitedTextareaTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="limitedTextareaTsxDemoZH"></code>
