import React, { useState, useEffect } from 'react';
import classnames from '../../../utils/classnames';

const Option = (props) => {
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
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const classNames = {
    'ew-select-dropdown-option': true,
    'ew-select-dropdown-option-disabled': disabled,
    active: active,
  };
  const onChangeHandler = (options) => {
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
      onOptionChange?.({ label, value });
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
Option.displayName = 'Option';
export default Option;
