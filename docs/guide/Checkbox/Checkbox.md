| title             | tags                          | firstSeen | lastUpdated |
| ----------------- | ----------------------------- | --------- | ----------- |
| Stateful checkbox | components,input,state,effect | 2022/7/27 | 2022/7/27   |

Renders a checkbox that uses a callback function to pass its selected value/values to the parent component.

- Use the useState() hook to create the data state variable and use the options prop to initialize its value.
- Create a toggle function that uses the spread operator (...) and Array.prototype.splice() to update the data state variable and call the onChange callback with any checked options.
- Use Array.prototype.map() to map the data state variable to individual `<input type="checkbox">` elements. Wrap each one in a `<label>`, binding the onClick handler to the toggle function.

```tsx | pure
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
```

Demo:

<code src="./Demo.tsx"></code>
