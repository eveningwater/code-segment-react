| title                         | tags                            | firstSeen | lastUpdated |
| ----------------------------- | ------------------------------- | --------- | ----------- |
| Textarea with character limit | components,state,callback,event | 2022/7/21 | 2022/7/21   |

Renders a textarea component with a character limit.

- Use the useState() hook to create the content state variable. Set its value to that of value prop, trimmed down to limit characters.
- Create a method setFormattedContent, which trims the content down to limit characters and memoize it, using the useCallback() hook.
- Bind the onChange event of the `<textarea>` to call setFormattedContent with the value of the fired event.

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

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
