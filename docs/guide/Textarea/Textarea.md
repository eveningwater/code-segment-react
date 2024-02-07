| title                         | tags             | firstSeen | lastUpdated |
| ----------------------------- | ---------------- | --------- | ----------- |
| Uncontrolled textarea element | components,input | 2023/3/17 | 2023/3/17   |

Renders an uncontrolled `<textarea>` element that uses a callback function to pass its value to the parent component.

- Use the defaultValue passed down from the parent as the uncontrolled input field's initial value.
- Use the onChange event to fire the onValueChange callback and send the new value to the parent.

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

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
