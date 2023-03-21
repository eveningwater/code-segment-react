| 标题         | 标签             | 首次添加时间 | 上次更新时间 |
| ------------ | ---------------- | ------------ | ------------ |
| 工具提示组件 | 组件,子组件,状态 | 2023/3/20    | 2023/3/20    |

呈现工具提示组件。

- 使用 useState() 挂钩创建显示变量并将其初始化为 false。
- 渲染一个包含工具提示元素和传递给组件的子元素的容器元素。
- 通过更改显示变量的值、切换工具提示的类名来处理 onMouseEnter 和 onMouseLeave 方法。

#### tooltip.less

```less
@prefix: ew-tooltip;
@black: rgba(0,0,0,1);
@white: #fff;
.@{prefix}{
    position: relative;
    &-box {
        position: absolute;
        color: @white;
        padding: 5px;
        border-radius: 5px;
        background-color: fadein(@black,70%);
        top: calc(100% + 5px);
        transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
        transform: scale(0);
        &.visible {
            transform: scale(1);
        }
    }
    &-arrow {
        position: absolute;
        top: -10px;
        left: 50%;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent fadein(@black,70%) transparent;
    }
}
```

#### Tooltip.tsx

```tsx | pure
import React, { useState, ReactNode } from 'react';
import './tooltip.less';

export interface TooltipProps extends Record<string, any> {
  children: ReactNode;
  text: ReactNode;
}

const getVisible = (v: boolean) => {
  if (v) {
    return 'visible';
  }
  return '';
};
const Tooltip = (props: Partial<TooltipProps>) => {
  const { text, children, ...rest } = props;
  const [show, setShow] = useState(false);
  return (
    <div className="ew-tooltip">
      <div className={['ew-tooltip-box', getVisible(show)].join(' ')}>
        {text}
        <span className="ew-tooltip-arrow"></span>
      </div>
      <div
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="ew-tooltip-hover"
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
```

#### Tooltip.jsx

```jsx | pure
import React, { useState } from 'react';
import '../tooltip.less';

const getVisible = (v) => {
  if (v) {
    return 'visible';
  }
  return '';
};
const Tooltip = (props) => {
  const { text, children, ...rest } = props;
  const [show, setShow] = useState(false);
  return (
    <div className="ew-tooltip">
      <div className={['ew-tooltip-box', getVisible(show)].join(' ')}>
        {text}
        <span className="ew-tooltip-arrow"></span>
      </div>
      <div
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
