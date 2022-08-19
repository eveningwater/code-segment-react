| title             | tags                          | firstSeen | lastUpdated |
| ----------------- | ----------------------------- | --------- | ----------- |
| Stateful checkbox | components,input,state,effect | 2022/7/27 | 2022/7/27   |

Renders a checkbox that uses a callback function to pass its selected value/values to the parent component.

- Use the useState() hook to create the data state variable and use the options prop to initialize its value.
- Create a toggle function that uses the spread operator (...) and Array.prototype.splice() to update the data state variable and call the onChange callback with any checked options.
- Use Array.prototype.map() to map the data state variable to individual `<input type="checkbox">` elements. Wrap each one in a `<label>`, binding the onClick handler to the toggle function.

```less
@baseSelector: ant-;
.@{baseSelector}checkbox-wrapper {
  font-size: 14px;
  line-height: 1.57;
  display: inline-flex;
  align-items: baseline;
  cursor: pointer;
  &.is-disabled {
    color: #9f9f9f;
    cursor: not-allowed;
    .@{baseSelector}checkbox.checked,
    .@{baseSelector}checkbox {
      cursor: not-allowed;
      .@{baseSelector}checkbox-inner {
        border-color: #d9d9d9;
        background-color: #f5f5f5;
        &::after {
          border-color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
  .@{baseSelector}checkbox {
    position: relative;
    top: 0.2em;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
    margin-right: 8px;
    &.checked {
      .@{baseSelector}checkbox-inner {
        border-color: #1890ff;
        background-color: #1890ff;
        &::after {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1) rotate(45deg);
        }
      }
    }
    .@{baseSelector}checkbox-inner {
      width: 16px;
      height: 16px;
      position: relative;
      left: 0;
      top: 0;
      display: block;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      transition: all 0.3s;
      &::after {
        position: absolute;
        top: 35%;
        left: 50%;
        display: table;
        width: 5.714px;
        height: 9.14px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(0) translate(-50%, -50%);
        opacity: 0;
        content: ' ';
        transition: all 0.3s;
      }
    }
  }
}
```

tsx:

```tsx | pure
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
```

jsx:

```jsx | pure
import React, { useState, useEffect, createRef } from 'react';
import '../Checkbox.less';

const Checkbox = (props) => {
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
```

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
