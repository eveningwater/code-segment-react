| 标题             | 标签               | 首次添加时间 | 更新时间  |
| ---------------- | ------------------ | ------------ | --------- |
| 可关闭的提示组件 | 组件，状态，副作用 | 2022/7/10    | 2022/7/10 |

渲染一个带有 prop 类型的警报组件。

- 使用 useState() 钩子创建 isShown 和 isLeaving 状态变量，并最初将两者都设置为 false。
- 定义 timeoutId 以保留计时器实例以在组件卸载时清除。
- 卸载组件时，使用 useEffect() 钩子将 isShown 的值更新为 true，并使用 timeoutId 清除间隔。
- 定义一个 closeAlert 函数，通过显示淡出动画将组件设置为从 DOM 中移除，并通过 setTimeout() 将 isShown 设置为 false。

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

tsx:

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

jsx:

```jsx | pure
import React, { useState, useEffect } from 'react';
import '../alert.less';

const Alert = (props) => {
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

  let timer = null;
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

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
