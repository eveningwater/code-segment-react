---
title: 开关切换组件
nav: 指南
---

| 标题         | 标签       | 首次添加时间 | 上次更新时间 |
| ------------ | ---------- | ------------ | ------------ |
| 开关切换组件 | 组件，状态 | 2023/3/17    | 2023/3/17    |

呈现一个开关组件。

- 使用 useState() 挂钩将 isToggledOn 状态变量初始化为 defaultToggled。
- 呈现一个 `<input>` 并绑定其 onClick 事件以更新 isToggledOn 状态变量，将适当的类名应用于包装 `<label>`。

#### switch.less

```less
@prefix: ew-;
@switchColor: #535355;
@switchBgColor: #c3c3c4;
@switchActiveBgColor: #2396ef;
@switchAfterBgcolor: #f2f1f3;
@switchAfterDisabledBgcolor: #909092;
.@{prefix}switch{
    position: relative;
    cursor: pointer;
    min-width: 80px;
    padding: 5px;
    color: @switchColor;
    display: inline-block;
    font-size: 14px;
    &-input {
        display: none;
    }
    &-inner {
        display: inline-block;
        vertical-align: middle;
        width: 44px;
        height: 22px;
        background-color: @switchBgColor;
        border-radius: 25px;
        cursor: pointer;
        margin-right: 8px;
        position: relative;
        &::after {
            content:"";
            width: 18px;
            height: 18px;
            background-color: @switchAfterBgcolor;
            position: absolute;
            top: 2px;
            left: 2px;
            cursor: pointer;
            border-radius: 50%;
            animation-timing-function: linear;
            animation-duration: .4s;
            animation-fill-mode: forwards;
            animation-name: slideOff;
        }
    }
    &.active {
        .@{prefix}switch-inner {
            background-color: @switchActiveBgColor;
            &::after {
                animation-name: slideOn;
            }
        }
    }
    &.disabled {
        .@{prefix}switch-inner {
            cursor: not-allowed;
            &::after {
                background-color: @switchAfterDisabledBgcolor;
            }
        }
        cursor: not-allowed;
    }
    @keyframes slideOn {
        0% {
            transform: translateX(0) scale(1);
        }
        50% {
            transform: translateX(12px) scale(1.2);
        }
        100% {
            transform: translateX(22px) scale(1);
        }
    }
    @keyframes slideOff {
        0% {
            transform: translateX(22px) scale(1);
        }
        50% {
            transform: translateX(12px) scale(1.2);
        }
        100% {
            transform: translateX(0) scale(1);
        }
    }
}
```

#### Switch.tsx

```tsx | pure
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
```

#### Switch.jsx

```jsx | pure
import React, { useState, useEffect } from 'react';
import classnames from '../../../utils/classnames';
import '../switch.less';
const Switch = (props) => {
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
```

示例:

<code src="./Demo.zh-CN.tsx" id="switchTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="switchJsxDemoZH"></code>
