---
title: 选项卡组件
nav: 指南
---

| 标题       | 标签              | 首次添加时间 | 上次更新时间 |
| ---------- | ----------------- | ------------ | ------------ |
| 选项卡组件 | 组件，子组件,状态 | 2023/3/17    | 2023/3/17    |

呈现选项卡式菜单和视图组件。

- 定义一个选项卡组件。 使用 useState() 钩子将 bindIndex 状态变量的值初始化为 defaultIndex。
- 定义一个 TabItem 组件并过滤传递给 Tabs 组件的子组件，通过识别函数名称来删除除 TabItem 之外不需要的节点。
- 定义 changeTab，当单击菜单中的 `<div>` 时将被执行。
- changeTab 执行传递过来的回调，onTabClick，并根据被点击的元素更新 bindIndex。
- 在收集的节点上使用 Array.prototype.map() 来呈现选项卡的菜单和视图。
- 使用 bindIndex 的值来确定活动选项卡并应用正确的类名。

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
  const items = children?.filter(
    (item) => item.type?.displayName === 'TabItem',
  );
  const content =
    items?.[Math.max(0, Math.min(items.length - 1, bindIndex - 1))].props
      ?.children;
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
  const items = children?.filter(
    (item) => item.type?.displayName === 'TabItem',
  );
  const content =
    items?.[Math.max(0, Math.min(items.length - 1, bindIndex - 1))].props
      ?.children;
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

示例:

<code src="./Demo.zh-CN.tsx" id="tabsTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="tabsJsxDemoZH"></code>
