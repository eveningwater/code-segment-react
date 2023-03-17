import React, { useState, useEffect } from 'react';
import classnames from '../../utils/classnames';
import './switch.less';
export interface SwitchProps extends Record<string, any> {
  defaultChecked: boolean;
  checked: boolean;
  onChange: (v: boolean) => void;
  className: string;
  disabled: boolean;
}
const Switch = (props: Partial<SwitchProps>) => {
  const {
    defaultChecked = false,
    checked,
    children,
    disabled = false,
    onChange,
    className,
    ...rest
  } = props;
  const [switchChecked, setSwitchChecked] = useState(defaultChecked);
  const classes = classnames({
    'ew-switch': true,
    active: switchChecked,
    disabled,
  });
  useEffect(() => {
    if (typeof checked === 'boolean') {
      setSwitchChecked(checked);
    }
  }, [checked]);
  const onChangeHandler = () => {
    if (disabled) {
      return;
    }
    const currentChecked = !switchChecked;
    setSwitchChecked(currentChecked);
    onChange?.(currentChecked);
  };
  return (
    <label
      className={className ? classes + ' ' + className : classes}
      {...rest}
      onClick={onChangeHandler}
    >
      <div className="ew-switch-inner"></div>
      {children}
    </label>
  );
};

export default Switch;
