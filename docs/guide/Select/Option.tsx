import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import classnames from '../../utils/classnames';
export interface OptionValueProps {
  label: string;
  value: string;
}
export interface OptionProps extends Record<string, any>, OptionValueProps {
  disabled: boolean;
  children: ReactNode;
  defaultValue: string;
  onOptionChange(v: Partial<OptionValueProps>): void;
  active: boolean;
}
const Option = (props: Partial<OptionProps>) => {
  const {
    label,
    value,
    disabled,
    defaultValue,
    children,
    onOptionChange,
    active,
    ...rest
  } = props;
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    defaultValue,
  );

  const classNames = {
    'ew-select-dropdown-option': true,
    'ew-select-dropdown-option-disabled': disabled,
    active: active,
  };
  const onChangeHandler = (options: Partial<OptionValueProps>) => {
    if (disabled) {
      return;
    }

    setCurrentValue(options.value);
    if (onOptionChange) {
      onOptionChange(options);
    }
  };

  useEffect(() => {
    if (currentValue) {
      if (onOptionChange) {
        onOptionChange({ label, value });
      }
    }
  }, [currentValue]);
  return (
    <div
      className={classnames(classNames)}
      data-value={currentValue}
      {...rest}
      onClick={() => onChangeHandler({ label, value })}
    >
      {children ? children : label ? label : ''}
    </div>
  );
};
export default Option;
