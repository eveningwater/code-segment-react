| title          | tags                    | firstSeen | lastUpdated |
| -------------- | ----------------------- | --------- | ----------- |
| Closable alert | components,state,effect | 2022/7/10 | 2022/7/11   |

Renders an alert component with type prop.

- Use the useState() hook to create the isShown and isLeaving state variables and set both to false initially.
- Define timeoutId to keep the timer instance for clearing on component unmount.
- Use the useEffect() hook to update the value of isShown to true and clear the interval by using timeoutId when the component is unmounted.
- Define a closeAlert function to set the component as removed from the DOM by displaying a fading out animation and set isShown to false via setTimeout().

```less | pure
@keyframes leave {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@baseSelector: alert;
@infoBgColor: #e6f7ff;
@infoBorderColor: #91d5ff;
@warningBgColor: #fffbe6;
@warningBorderColor: #ffe58f;
@errorBgColor: #fff2f0;
@errorBorderColor: #ffccc7;
@successBgColor: #f6ffed;
@successBorderColor: #b7eb8f;
@color: rgba(0, 0, 0, 0.85);
@closeActiveColor: fadeout(@color, 25%);
.@{baseSelector} {
  box-sizing: border-box;
  margin: 0;
  color: @color;
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  word-wrap: break-word;
  border-radius: 2px;
  border: 1px solid transparent;
  &.@{baseSelector}-block {
    width: percentage(1);
  }
  &.@{baseSelector}-info {
    background-color: @infoBgColor;
    border-color: @infoBorderColor;
  }

  &.@{baseSelector}-warning {
    background-color: @warningBgColor;
    border-color: @warningBorderColor;
  }

  &.@{baseSelector}-error {
    background-color: @errorBgColor;
    border-color: @errorBorderColor;
  }

  &.@{baseSelector}-success {
    background-color: @successBgColor;
    border-color: @successBorderColor;
  }

  .@{baseSelector}-close {
    margin-left: 8px;
    padding: 0;
    overflow: hidden;
    font-size: 16px;
    line-height: 12px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0;
    color: @color;
    position: absolute;
    right: 10px;
    top: 10px;
    &:hover {
      color: @closeActiveColor;
    }
  }
}
```

```tsx | pure
import React, { useState, useEffect } from 'react';
import './alert.less';

interface AlertPropType {
  isDefaultShown: boolean;
  timeout: number;
  type: string;
  message: string;
  showClose: boolean;
  block: boolean;
}

const Alert = (props: Partial<AlertPropType>) => {
  const {
    isDefaultShown,
    timeout = 250,
    type,
    message,
    showClose,
    block,
  } = props;
  const [isShown, setIsShown] = useState(isDefaultShown);
  const [isLeaving, setIsLeaving] = useState(false);

  let timer: number | null = null;
  useEffect(() => {
    setIsShown(true);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeout, timer, isDefaultShown]);

  const closeAlert = () => {
    setIsLeaving(true);
    timer = setTimeout(() => {
      setIsLeaving(false);
      setIsShown(false);
    }, timeout);
  };

  return isShown ? (
    <div
      className={`alert ${'alert-' + type}${isLeaving ? ' leaving' : ''}${
        block ? ' alert-block' : ''
      }`}
      role="alert"
    >
      <button
        className="alert-close"
        onClick={closeAlert}
        style={{ display: showClose ? 'block' : 'none' }}
      >
        &times;
      </button>
      {message}
    </div>
  ) : null;
};

export default Alert;
```

Demo:

<code src="./Demo.tsx"></code>
