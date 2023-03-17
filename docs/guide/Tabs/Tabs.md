| title | tags                      | firstSeen | lastUpdated |
| ----- | ------------------------- | --------- | ----------- |
| Tabs  | components,children,state | 2023/3/17 | 2023/3/17   |

Renders a tabbed menu and view component.

- Define a Tabs component. Use the useState() hook to initialize the value of the bindIndex state variable to defaultIndex.
- Define a TabItem component and filter children passed to the Tabs component to remove unnecessary nodes except for TabItem by identifying the function's name.
- Define changeTab, which will be executed when clicking a `<div>` from the menu.
- changeTab executes the passed callback, onTabClick, and updates bindIndex based on the clicked element.
- Use Array.prototype.map() on the collected nodes to render the menu and view of the tabs.
- Use the value of bindIndex to determine the active tab and apply the correct className.

#### tabs.less

```less
@prefix: ew-tabs;
@tabsColor: rgba(0, 0, 0, 0.85);
@tabsBorderColor: rgba(0, 0, 0, 0.25);
@tabsActiveColor: #2396ef;
.@{prefix} {
  display: flex;
  flex-direction: column;
  color: @tabsColor;
  &-header {
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid @tabsBorderColor;
    &-item {
      display: inline-flex;
      font-size: 14px;
      align-items: center;
      margin-right: 16px;
      padding: 6px 0;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      cursor: pointer;
      position: relative;
      &.active {
        color: @tabsActiveColor;
        &::before {
          content: '';
          position: absolute;
          width: percentage(1);
          height: 3px;
          background-color: @tabsActiveColor;
          bottom: -2px;
          left: 0;
        }
      }
    }
  }
  &-content {
    flex: auto;
    padding: 15px 0;
    width: percentage(1);
  }
}
```

#### Tabs.tsx

```tsx | pure
import React, {
  useState,
  ReactNode,
  ReactElement,
  SyntheticEvent,
} from 'react';
import './tabs.less';
import classnames from '../../utils/classnames';
export interface TabsItemProps extends Record<string, any> {
  index: number | string;
  label: ReactNode;
}
const TabItem = (props: Partial<TabsItemProps>) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};
TabItem.displayName = 'TabItem';
type ChildrenElements = ReactElement<TabsItemProps, any>;
export interface TabsProps extends Record<string, any> {
  defaultIndex: number | string;
  onTabClick: (v: number | string, e: SyntheticEvent) => void;
  children: ChildrenElements[];
}
const Tabs = (props: Partial<TabsProps>) => {
  const { defaultIndex = 0, onTabClick, children } = props;
  const [bindIndex, setBindIndex] = useState(+defaultIndex);
  const changeTab = (newIndex: string | number, e: SyntheticEvent) => {
    onTabClick?.(newIndex, e);
    setBindIndex(+newIndex);
  };
  const items = children?.filter((item) => item.type?.name === 'TabItem');
  const content =
    items?.[Math.max(0, Math.min(items.length - 1, bindIndex - 1))].props
      .children;
  return (
    <div className="ew-tabs">
      <div className="ew-tabs-header">
        {items?.map(({ props }) => (
          <div
            className={classnames({
              'ew-tabs-header-item': true,
              active: props.index === bindIndex,
            })}
            key={`ew-tabs-header-item-${+props.index + 1}`}
            onClick={(e: SyntheticEvent) => changeTab(props.index, e)}
          >
            {props.label}
          </div>
        ))}
      </div>
      <div className="ew-tabs-content">{content}</div>
    </div>
  );
};
Tabs.TabItem = TabItem;
export default Tabs;
```

#### Tabs.jsx

```jsx | pure
import React, { useState } from 'react';
import '../tabs.less';
import classnames from '../../../utils/classnames';
const TabItem = (props) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};
TabItem.displayName = 'TabItem';
const Tabs = (props) => {
  const { defaultIndex = 0, onTabClick, children } = props;
  const [bindIndex, setBindIndex] = useState(+defaultIndex);
  const changeTab = (newIndex, e) => {
    onTabClick?.(newIndex, e);
    setBindIndex(+newIndex);
  };
  const items = children?.filter((item) => item.type?.name === 'TabItem');
  const content =
    items?.[Math.max(0, Math.min(items.length - 1, bindIndex - 1))].props
      .children;
  return (
    <div className="ew-tabs">
      <div className="ew-tabs-header">
        {items?.map(({ props }) => (
          <div
            className={classnames({
              'ew-tabs-header-item': true,
              active: props.index === bindIndex,
            })}
            key={`ew-tabs-header-item-${+props.index + 1}`}
            onClick={(e) => changeTab(props.index, e)}
          >
            {props.label}
          </div>
        ))}
      </div>
      <div className="ew-tabs-content">{content}</div>
    </div>
  );
};
Tabs.TabItem = TabItem;
export default Tabs;
```

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
