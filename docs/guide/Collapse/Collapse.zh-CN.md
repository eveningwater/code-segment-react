---
title: 折叠内容组件
nav: 指南
---

| 标题         | 标签             | 首次添加时间 | 更新时间  |
| ------------ | ---------------- | ------------ | --------- |
| 折叠内容组件 | 组件,子节点,状态 | 2022/7/14    | 2022/7/14 |

呈现具有可折叠内容的组件。

- 使用 useState() 挂钩创建 isCollapsed 状态变量。 给它一个折叠的初始值。
- 使用 `<button>` 更改组件的 isCollapsed 状态和组件的内容，通过子级传递下来。
- 使用 isCollapsed 确定内容的外观并应用适当的类名。
- 根据 isCollapsed 更新 aria-expanded 属性的值，使组件可访问。

#### Collapse.tsx

```tsx | pure
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import React, { useState } from 'react';

const CollapseStyle = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  border-radius: 2px;
  & .collapse-header {
    line-height: 1.5715;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    transition: all 0.3s, visibility 0s;
    box-sizing: border-box;
  }
`;
const CollapseStyleItem = styled.div`
  border-bottom: 1px solid #d9d9d9;
  & .collapse-content {
    color: #000000d9;
    background-color: #fff;
    border-top: 1px solid #d9d9d9;
    transition: all 0.3s ease-in-out;
    padding: 16px;
    &.collapsed {
      display: none;
    }
    &.expanded {
      display: block;
    }
  }
`;

interface CollapseProps {
  collapsed: boolean;
  children: ReactNode;
  header: ReactNode;
}

type CollapseItemProps = Omit<Omit<CollapseProps, 'collapsed'>, 'header'> & {
  className: string;
};

const CollapseItem = (props: Partial<CollapseItemProps>) => {
  const { children, className } = props;
  return (
    <CollapseStyleItem>
      <div className={`${'collapse-content'}${className}`}>{children}</div>
    </CollapseStyleItem>
  );
};

const Collapse = (props: Partial<CollapseProps>) => {
  const { collapsed, children, header } = props;
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  return (
    <CollapseStyle>
      <div
        className="collapse-header"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {header || (isCollapsed ? 'show' : 'hide') + ' content'}
      </div>
      <CollapseItem className={`${isCollapsed ? ' collapsed' : ' expanded'}`}>
        {children}
      </CollapseItem>
    </CollapseStyle>
  );
};

export default Collapse;
```

#### Collapse.jsx

```jsx | pure
import styled from '@emotion/styled';
import React, { useState } from 'react';

const CollapseStyle = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  border-radius: 2px;
  & .collapse-header {
    line-height: 1.5715;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    transition: all 0.3s, visibility 0s;
    box-sizing: border-box;
  }
`;
const CollapseStyleItem = styled.div`
  border-bottom: 1px solid #d9d9d9;
  & .collapse-content {
    color: #000000d9;
    background-color: #fff;
    border-top: 1px solid #d9d9d9;
    transition: all 0.3s ease-in-out;
    padding: 16px;
    &.collapsed {
      display: none;
    }
    &.expanded {
      display: block;
    }
  }
`;

const CollapseItem = (props) => {
  const { children, className } = props;
  return (
    <CollapseStyleItem>
      <div className={`${'collapse-content'}${className}`}>{children}</div>
    </CollapseStyleItem>
  );
};

const Collapse = (props) => {
  const { collapsed, children, header } = props;
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  return (
    <CollapseStyle>
      <div
        className="collapse-header"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {header || (isCollapsed ? 'show' : 'hide') + ' content'}
      </div>
      <CollapseItem className={`${isCollapsed ? ' collapsed' : ' expanded'}`}>
        {children}
      </CollapseItem>
    </CollapseStyle>
  );
};

export default Collapse;
```

示例:

<code src="./Demo.zh-CN.tsx" id="collapseTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="collapseJsxDemoZH"></code>
