| title                  | tags             | firstSeen | lastUpdated |
| ---------------------- | ---------------- | --------- | ----------- |
| Controlled input field | components,input | 2022/7/15 | 2022/7/15   |

Renders a controlled `<input>` element that uses a callback function to inform its parent about value updates.

- Use the value passed down from the parent as the controlled input field's value.
- Use the onChange event to fire the onValueChange callback and send the new value to the parent.
- The parent must update the input field's value prop in order for its value to change on user input.

```tsx | pure
import styled from '@emotion/styled';
import React from 'react';
import type { SyntheticEvent } from 'react';

const StyleInput = styled.input`
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
type LiteralUnion<T extends U, U> = T & (U & {});
interface ControlledInputProps {
  type: LiteralUnion<
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week',
    string
  >;
  value: string;
  onChange(v: string): void;
  placeholder: string;
}
const ControlledInput = (props: Partial<ControlledInputProps>) => {
  const { value, onChange, ...rest } = props;
  const onChangeHandler = (e: SyntheticEvent) => {
    if (onChange) {
      onChange((e.target as HTMLInputElement).value);
    }
  };
  return (
    <StyleInput value={value} onChange={onChangeHandler} {...rest}></StyleInput>
  );
};
```

demo:

<code src="./Demo.tsx"></code>
