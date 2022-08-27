| title                    | tags                                         | firstSeen | lastUpdated |
| ------------------------ | -------------------------------------------- | --------- | ----------- |
| Textarea with word limit | components,input,state,callback,effect,event | 2022/7/22 | 2022/7/22   |

Renders a textarea component with a word limit.

- Use the useState() hook to create a state variable, containing content and wordCount. Use the value prop and 0 as the initial values respectively.
- Use the useCallback() hooks to create a memoized function, setFormattedContent, that uses String.prototype.split() to turn the input into an array of words.
- Check if the result of applying Array.prototype.filter() combined with Boolean has a length longer than limit. If it does, trim the input. Otherwise return the raw input, updating state accordingly in both cases.
- Use the useEffect() hook to call the setFormattedContent method on the value of the content state variable during the initial render.
- Bind the onChange event of the `<textarea>` to call setFormattedContent with the value of event.target.value.

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

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
