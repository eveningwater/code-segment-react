| 标题       | 标签                    | 首次添加时间 | 更新时间  |
| ---------- | ----------------------- | ------------ | --------- |
| 复选框组件 | 组件,输入框,状态,副作用 | 2022/7/27    | 2022/7/27 |

呈现一个复选框组件，该组件使用回调函数将其选定的值传递给父组件。

- 使用 useState() 钩子创建数据状态变量，并使用 options 属性初始化它的值。
- 创建一个切换函数，使用扩展运算符 (...) 和 Array.prototype.splice() 更新数据状态变量，并使用任何选中的选项调用 onChange 回调。
- 使用 Array.prototype.map() 将数据状态变量映射到单个 `<input type="checkbox">` 元素。 将每一个包装在一个`<label>`中，将 onClick 处理程序绑定到切换函数。

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

示例:

<code src="./Demo.zh-CN.tsx"></code>
