| 标题       | 标签                    | 首次添加时间 | 更新时间  |
| ---------- | ----------------------- | ------------ | --------- |
| 复选框组件 | 组件,输入框,状态,副作用 | 2022/7/27    | 2022/7/27 |

呈现一个复选框组件，该组件使用回调函数将其选定的值传递给父组件。

- 使用 useState() 钩子创建数据状态变量，并使用 options 属性初始化它的值。
- 创建一个切换函数，使用扩展运算符 (...) 和 Array.prototype.splice() 更新数据状态变量，并使用任何选中的选项调用 onChange 回调。
- 使用 Array.prototype.map() 将数据状态变量映射到单个 `<input type="checkbox">` 元素。 将每一个包装在一个`<label>`中，将 onClick 处理程序绑定到切换函数。

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

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
