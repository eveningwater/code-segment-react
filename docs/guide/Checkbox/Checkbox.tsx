import React, { useState, useEffect } from 'react';
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
  const [value, setValue] = useState(defaultChecked);

  useEffect(() => {
    if (typeof checked === 'boolean') {
      setValue(checked);
    }
  }, [checked]);

  const onClickHandler = (e: SyntheticEvent) => {
    if (disabled) {
      return;
    }
    const {
      nativeEvent: { target },
    } = e;
    const currentChecked = (target as HTMLInputElement).checked;
    if (typeof checked !== 'boolean') {
      setValue(currentChecked);
      if (onChange) {
        onChange(currentChecked);
      }
    }
  };
  return (
    <label
      className={`ant-checkbox-wrapper${disabled ? ' is-disabled' : ''}`}
      onClick={onClickHandler}
    >
      <span className={`ant-checkbox${value ? ' checked' : ''}`}>
        <input type="checkbox" className="ant-checkbox-input" />
        <span className="ant-checkbox-inner"></span>
      </span>
      {children}
    </label>
  );
};

export default Checkbox;
