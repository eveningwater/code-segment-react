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
