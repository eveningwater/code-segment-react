import styled from '@emotion/styled';
import React, { useState } from 'react';
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
/** https://github.com/Microsoft/TypeScript/issues/29729 */
// eslint-disable-next-line @typescript-eslint/ban-types
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

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <ControlledInput
      type="text"
      value={value}
      onChange={setValue}
      placeholder="Insert some text here..."
    ></ControlledInput>
  );
};

export default Demo;
