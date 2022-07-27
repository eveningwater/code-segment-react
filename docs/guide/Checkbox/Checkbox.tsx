import React, { useState, useEffect, createRef } from 'react';
import type { ReactNode, SyntheticEvent } from 'react';
import './Checkbox.less';

export interface CheckboxProps extends Record<string, any> {
  disabled: boolean;
  checked: boolean;
  defaultChecked: boolean;
  children: ReactNode;
  onChange(v: boolean): void;
}

const Checkbox = (props: Partial<CheckboxProps>) => {
  const { disabled, checked, defaultChecked, children, onChange } = props;
  const [value, setValue] = useState(!!defaultChecked);
  useEffect(() => {
    if (typeof checked === 'boolean') {
      if (disabled) {
        return;
      }
      setValue(checked);
    }
  }, [checked]);
  const onChangeHandler = () => {
    if (disabled) {
      return;
    }
    setValue(!value);
    if (onChange) {
      onChange(!value);
    }
  };

  return (
    <label
      className={`ant-checkbox-wrapper${disabled ? ' is-disabled' : ''}`}
      onClick={onChangeHandler}
    >
      <span className={`ant-checkbox${value ? ' checked' : ''}`}>
        <span className="ant-checkbox-inner"></span>
      </span>
      {children}
    </label>
  );
};

export default Checkbox;
