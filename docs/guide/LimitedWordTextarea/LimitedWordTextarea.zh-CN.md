| 标题                   | 标签                                        | 首次添加时间 | 更新时间  |
| ---------------------- | ------------------------------------------- | ------------ | --------- |
| 有字数限制的文本框组件 | 组件,输入框,状态，回调函数，副作用函数,事件 | 2022/7/22    | 2022/7/22 |

呈现带有字数限制的 textarea 组件。

- 使用 useState() 钩子创建一个状态变量，包含内容和字数。 分别使用 value prop 和 0 作为初始值。
- 使用 useCallback() 钩子创建一个记忆函数 setFormattedContent，它使用 String.prototype.split() 将输入转换为单词数组。
- 检查应用 Array.prototype.filter() 结合 Boolean 的结果是否长度超过限制。 如果是，则修剪输入。 否则返回原始输入，在这两种情况下都相应地更新状态。
- 在初始渲染期间，使用 useEffect() 挂钩对内容状态变量的值调用 setFormattedContent 方法。
- 绑定`<textarea>`的 onChange 事件，以 event.target.value 的值调用 setFormattedContent。

#### LimitedWordTextarea.tsx

```tsx | pure
import React, { useState, useCallback, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import styled from '@emotion/styled';
interface LimitedWordTextareaProps extends Record<string, unknown> {
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

const LimitedWordTextarea = (props: Partial<LimitedWordTextareaProps>) => {
  const { limit = 0, rows, cols, value, ...rest } = props;

  const [{ content, wordCount }, setContent] = useState({
    content: value,
    wordCount: 0,
  });

  const setFormattedContent = useCallback(
    (text: string) => {
      let words = text.split(' ').filter(Boolean);
      setContent(() => {
        if (words.length > limit) {
          return {
            wordCount: limit,
            content: words.slice(0, limit).join(' '),
          };
        }
        return {
          wordCount: words.length,
          content: text,
        };
      });
    },
    [limit, setContent],
  );
  useEffect(() => {
    setFormattedContent(content || '');
  }, []);
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

export default LimitedWordTextarea;
```

#### LimitedWordTextarea.jsx

```jsx | pure
import React, { useState, useCallback, useEffect } from 'react';
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

const LimitedWordTextarea = (props) => {
  const { limit = 0, rows, cols, value, ...rest } = props;

  const [{ content, wordCount }, setContent] = useState({
    content: value,
    wordCount: 0,
  });

  const setFormattedContent = useCallback(
    (text) => {
      let words = text.split(' ').filter(Boolean);
      setContent(() => {
        if (words.length > limit) {
          return {
            wordCount: limit,
            content: words.slice(0, limit).join(' '),
          };
        }
        return {
          wordCount: words.length,
          content: text,
        };
      });
    },
    [limit, setContent],
  );
  useEffect(() => {
    setFormattedContent(content || '');
  }, []);
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

export default LimitedWordTextarea;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
