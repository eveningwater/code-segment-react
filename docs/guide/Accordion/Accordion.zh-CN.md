---
title: 可折叠手风琴组件
nav: 指南
---

| 标题             | 标签             | 首次添加时间 | 更新时间  |
| ---------------- | ---------------- | ------------ | --------- |
| 可折叠手风琴组件 | 组件,子节点,状态 | 2022/7/9     | 2022/7/10 |

呈现具有多个可折叠内容元素的手风琴菜单。

- 定义一个 AccordionItem 组件，它呈现一个 `<button>`。 按钮更新组件并通过 handleClick 回调通知其父级。
- 使用 AccordionItem 中的 isCollapsed 属性确定其外观并设置其类名。
- 定义 Accordion 组件。 使用 useState() 挂钩将 bindIndex 状态变量的值初始化为 defaultIndex。
- 通过识别函数的名称过滤子项以删除除 AccordionItem 之外的不必要节点。
- 在收集的节点上使用 Array.prototype.map() 来呈现各个可折叠元素。
- 定义 changeItem，当点击 AccordionItem 的 `<button>` 时执行。
- changeItem 执行传递的回调 onItemClick，并根据单击的元素更新 bindIndex。

#### Accordion.tsx

```tsx | pure
import { cx, css } from '@emotion/css';
import React, { useState } from 'react';
import type { ReactNode, SyntheticEvent } from 'react';

const baseStyle = css`
  line-height: 1.5715;
`;
const AccordionContainer = cx(
  baseStyle,
  css`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #000000d9;
    font-size: 14px;
    background-color: #fafafa;
    border: 1px solid #d9d9d9;
    border-bottom: 0;
    border-radius: 2px;
  `,
);
const AccordionItemContainer = css`
  border-bottom: 1px solid #d9d9d9;
`;
const AccordionItemHeader = cx(
  baseStyle,
  css`
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    transition: all 0.3s, visibility 0s;
    box-sizing: border-box;
  `,
);

const AccordionItemContent = css`
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
`;

interface AccordionItemType {
  index: string | number;
  label: string;
  isCollapsed: boolean;
  handleClick(e: SyntheticEvent): void;
  children: ReactNode;
}
interface AccordionType {
  defaultIndex: number | string;
  onItemClick(key: number | string): void;
  children: JSX.Element[];
}

const AccordionItem = (props: Partial<AccordionItemType>) => {
  const { label, isCollapsed, handleClick, children } = props;
  return (
    <div className={AccordionItemContainer} onClick={handleClick}>
      <div className={AccordionItemHeader}>{label}</div>
      <div
        aria-expanded={isCollapsed}
        className={`${AccordionItemContent}${
          isCollapsed ? ' collapsed' : ' expanded'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
// 设置一个函数名用作判断，生产环境无法使用function.name
AccordionItem.displayName = 'AccordionItem';

const Accordion = (props: Partial<AccordionType>) => {
  const { defaultIndex, onItemClick, children } = props;
  const [bindIndex, setBindIndex] = useState(defaultIndex);
  const changeItem = (index: number | string) => {
    if (typeof onItemClick === 'function') {
      onItemClick(index);
    }
    if (index !== bindIndex) {
      setBindIndex(index);
    }
  };
  const items = children?.filter(
    (item) => item?.type?.displayName === 'AccordionItem',
  );
  return (
    <div className={AccordionContainer}>
      {items?.map(({ props: { index, label, children } }) => (
        <AccordionItem
          key={index}
          label={label}
          children={children}
          isCollapsed={bindIndex !== index}
          handleClick={() => changeItem(index)}
        />
      ))}
    </div>
  );
};

Accordion.AccordionItem = AccordionItem;
export default Accordion;
```

#### Accordion.jsx

```jsx | pure
import { cx, css } from '@emotion/css';
import React, { useState } from 'react';

const baseStyle = css`
  line-height: 1.5715;
`;
const AccordionContainer = cx(
  baseStyle,
  css`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #000000d9;
    font-size: 14px;
    background-color: #fafafa;
    border: 1px solid #d9d9d9;
    border-bottom: 0;
    border-radius: 2px;
  `,
);
const AccordionItemContainer = css`
  border-bottom: 1px solid #d9d9d9;
`;
const AccordionItemHeader = cx(
  baseStyle,
  css`
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    transition: all 0.3s, visibility 0s;
    box-sizing: border-box;
  `,
);

const AccordionItemContent = css`
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
`;

const AccordionItem = (props) => {
  const { label, isCollapsed, handleClick, children } = props;
  return (
    <div className={AccordionItemContainer} onClick={handleClick}>
      <div className={AccordionItemHeader}>{label}</div>
      <div
        aria-expanded={isCollapsed}
        className={`${AccordionItemContent}${
          isCollapsed ? ' collapsed' : ' expanded'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
// 设置一个函数名用作判断，生产环境无法使用function.name
AccordionItem.displayName = 'AccordionItem';

const Accordion = (props) => {
  const { defaultIndex, onItemClick, children } = props;
  const [bindIndex, setBindIndex] = useState(defaultIndex);
  const changeItem = (index) => {
    if (typeof onItemClick === 'function') {
      onItemClick(index);
    }
    if (index !== bindIndex) {
      setBindIndex(index);
    }
  };
  const items = children?.filter(
    (item) => item?.type?.displayName === 'AccordionItem',
  );
  return (
    <div className={AccordionContainer}>
      {items?.map(({ props: { index, label, children } }) => (
        <AccordionItem
          key={index}
          label={label}
          children={children}
          isCollapsed={bindIndex !== index}
          handleClick={() => changeItem(index)}
        />
      ))}
    </div>
  );
};

Accordion.AccordionItem = AccordionItem;
export default Accordion;
```

示例:

<code src="./Demo.zh-CN.tsx" id="accordionTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="accordionJsxDemoZH"></code>
