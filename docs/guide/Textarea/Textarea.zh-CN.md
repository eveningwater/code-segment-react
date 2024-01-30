---
title: 非受控多行文本框组件
nav: 指南
---

| 标题             | 标签         | 首次添加时间 | 上次更新时间 |
| ---------------- | ------------ | ------------ | ------------ |
| 非受控多行文本框 | 组件，输入框 | 2023/3/17    | 2023/3/17    |

呈现一个不受控制的`<textarea>`元素，该元素使用回调函数将其值传递给父组件。

- 使用从父级传递下来的默认值作为非受控输入字段的初始值。
- 使用 onChange 事件触发 onValueChange 回调并将新值发送给父级。

#### Textarea.tsx

```tsx | pure
import styled from '@emotion/styled';
import React from 'react';
import type { SyntheticEvent } from 'react';

const StyleTextarea = styled.textarea`
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 13px 25px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    border-right-width: 1px;
    outline: 0;
  }
`;
export interface TextareaProps extends Record<string, any> {
  onChange: (v: string) => void;
  cols: number;
  rows: number;
  defaultValue: string;
}
const Textarea = (props: Partial<TextareaProps>) => {
  const { cols = 20, rows = 2, defaultValue, onChange, ...rest } = props;
  const onChangeHandler = (e: SyntheticEvent) => {
    const value = (e.target as HTMLTextAreaElement).value;
    onChange?.(value);
  };
  return (
    <StyleTextarea
      cols={cols}
      defaultValue={defaultValue}
      rows={rows}
      onChange={onChangeHandler}
      {...rest}
    />
  );
};

export default Textarea;
```

#### Textarea.jsx

```jsx | pure
import styled from '@emotion/styled';
import React from 'react';

const StyleTextarea = styled.textarea`
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 13px 25px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    border-right-width: 1px;
    outline: 0;
  }
`;
const Textarea = (props) => {
  const { cols = 20, rows = 2, defaultValue, onChange, ...rest } = props;
  const onChangeHandler = (e) => {
    const value = e.target.value;
    onChange?.(value);
  };
  return (
    <StyleTextarea
      cols={cols}
      defaultValue={defaultValue}
      rows={rows}
      onChange={onChangeHandler}
      {...rest}
    />
  );
};

export default Textarea;
```

示例:

<code src="./Demo.zh-CN.tsx" id="textareaTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="textareaJsxDemoZH"></code>
