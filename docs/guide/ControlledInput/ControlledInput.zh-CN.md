| 标题             | 标签        | 首次添加时间 | 更新时间  |
| ---------------- | ----------- | ------------ | --------- |
| 受控的输入框组件 | 组件,输入框 | 2022/7/15    | 2022/7/16 |

呈现一个受控的 `<input>` 元素，该元素使用回调函数通知其父级有关值的更新。

- 使用从父级传下来的值作为受控输入字段的值。
- 使用 onChange 事件触发 onChange 回调并将新值发送给父级。
- 父级必须更新输入字段的 value 属性，以便其值在用户输入时更改。

tsx:

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

jsx:

```jsx | pure
import styled from '@emotion/styled';
import React from 'react';

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

const ControlledInput = (props) => {
  const { value, onChange, ...rest } = props;
  const onChangeHandler = (e) => {
    onChange?.(e.target.value);
  };
  return (
    <StyleInput value={value} onChange={onChangeHandler} {...rest}></StyleInput>
  );
};

export default ControlledInput;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
