| title   | tags                      | firstSeen | lastUpdated |
| ------- | ------------------------- | --------- | ----------- |
| Tooltip | components,children,state | 2023/3/20 | 2023/3/20   |

Renders a tooltip component.

- Use the useState() hook to create the show variable and initialize it to false.
- Render a container element that contains the tooltip element and the children passed to the component.
- Handle the onMouseEnter and onMouseLeave methods, by altering the value of the show variable, toggling the className of the tooltip.

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

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
