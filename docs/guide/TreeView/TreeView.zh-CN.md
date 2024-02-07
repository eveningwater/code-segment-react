| 标题         | 标签                  | 首次添加时间 | 上次更新时间 |
| ------------ | --------------------- | ------------ | ------------ |
| 树形视图组件 | 组件,对象，状态，递归 | 2023/3/21    | 2023/3/21    |

呈现具有可折叠内容的 JSON 对象或数组的树视图。

- 使用 toggled 属性的值来确定内容的初始状态（折叠/展开）。
- 使用 useState() 钩子来创建 isToggled 状态变量，并最初将 toggled prop 的值赋予它。
- 渲染一个 `<span>` 元素并绑定它的 onClick 事件以改变组件的 isToggled 状态。
- 根据 isParentToggled、isToggled、名称和检查数据上的 Array.isArray() 确定组件的外观。
- 对于数据中的每个孩子，确定它是一个对象还是数组，并递归地渲染一个子树或具有适当样式的文本元素。

#### treeView.less

```less
@prefix: ew-tree-element;
@greyBorderColor: rgba(114, 114, 114,.8);
.@{prefix}{
    margin: 0 0 0 4px;
    position: relative;
    &.is-child {
        margin-left: 16px;
    }
    &-toggler {
        position: absolute;
        top: 10px;
        left: 0;
        width: 0;
        height: 0;
        cursor: pointer;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 5px solid @greyBorderColor;
        &.closed {
            transform: rotate(90deg);
        }
    }
    &.collapsed {
        display: none;
    }
}
p.@{prefix}{
    margin-left: 16px;
}
div.@{prefix}{
    &::before {
        content:"";
        position: absolute;
        top: 24px;
        left: 1px;
        height: calc(100% - 48px);
        border-left: 1px solid @greyBorderColor;
    }
}
```

#### TreeView.tsx

```tsx | pure
import React, { useState } from 'react';
import classnames from '../../utils/classnames';
import './treeView.less';
export type DataItem<T> = Record<string, T> | T;
export interface TreeViewProps extends Record<string, any> {
  isExpand: boolean;
  isParentExpand: boolean;
  name: string | null;
  isLast: boolean;
  isChildElement: boolean;
  data: DataItem<any> | DataItem<any>[];
}
const RenderName = (props: Partial<Pick<TreeViewProps, 'name'>>) => {
  const { name } = props;
  if (name) {
    return <strong>&nbsp;&nbsp;{name}:</strong>;
  } else {
    return <span>&nbsp;&nbsp;</span>;
  }
};
const TreeView = (props: Partial<TreeViewProps>) => {
  const {
    isExpand = true,
    isParentExpand,
    data,
    name = null,
    isLast = true,
    isChildElement = false,
  } = props;
  const [isToggled, setIsToggled] = useState(isExpand);
  const isDataArray = Array.isArray(data);
  const parentClasses = {
    'ew-tree-element': true,
    collapsed: isParentExpand,
    'is-child': isChildElement,
  };
  const spanTogglerClasses = {
    'ew-tree-element-toggler': true,
    closed: !isToggled,
  };
  const treeElementClasses = {
    'ew-tree-element': true,
    collapsed: !isToggled,
  };
  return (
    <div className={classnames(parentClasses)}>
      <span
        className={classnames(spanTogglerClasses)}
        onClick={() => setIsToggled(!isToggled)}
      />
      <RenderName name={name} />
      {isDataArray ? '[' : '{'}
      {!isToggled && '...'}
      {Object.keys(data).map((v, i, a) =>
        typeof data[v] === 'object' ? (
          <TreeView
            key={`${name}-${v}-${i}`}
            data={data[v]}
            isLast={i === a.length - 1}
            name={isDataArray ? null : v}
            isChildElement
            isParentExpand={isParentExpand && isToggled}
          />
        ) : (
          <p
            key={`${name}-${v}-${i}`}
            className={classnames(treeElementClasses)}
          >
            {isDataArray ? '' : <strong>{v}:</strong>}
            {data[v]}
            {i === a.length - 1 ? '' : ','}
          </p>
        ),
      )}
      {isDataArray ? ']' : '}'}
      {isLast ? '' : ','}
    </div>
  );
};

export default TreeView;
```

#### TreeView.jsx

```jsx | pure
import React, { useState } from 'react';
import classnames from '../../../utils/classnames';
import '../treeView.less';

const RenderName = (props) => {
  const { name } = props;
  if (name) {
    return <strong>&nbsp;&nbsp;{name}:</strong>;
  } else {
    return <span>&nbsp;&nbsp;</span>;
  }
};
const TreeView = (props) => {
  const {
    isExpand = true,
    isParentExpand,
    data,
    name = null,
    isLast = true,
    isChildElement = false,
  } = props;
  const [isToggled, setIsToggled] = useState(isExpand);
  const isDataArray = Array.isArray(data);
  const parentClasses = {
    'ew-tree-element': true,
    collapsed: isParentExpand,
    'is-child': isChildElement,
  };
  const spanTogglerClasses = {
    'ew-tree-element-toggler': true,
    closed: !isToggled,
  };
  const treeElementClasses = {
    'ew-tree-element': true,
    collapsed: !isToggled,
  };
  return (
    <div className={classnames(parentClasses)}>
      <span
        className={classnames(spanTogglerClasses)}
        onClick={() => setIsToggled(!isToggled)}
      />
      <RenderName name={name} />
      {isDataArray ? '[' : '{'}
      {!isToggled && '...'}
      {Object.keys(data).map((v, i, a) =>
        typeof data[v] === 'object' ? (
          <TreeView
            key={`${name}-${v}-${i}`}
            data={data[v]}
            isLast={i === a.length - 1}
            name={isDataArray ? null : v}
            isChildElement
            isParentExpand={isParentExpand && isToggled}
          />
        ) : (
          <p
            key={`${name}-${v}-${i}`}
            className={classnames(treeElementClasses)}
          >
            {isDataArray ? '' : <strong>{v}:</strong>}
            {data[v]}
            {i === a.length - 1 ? '' : ','}
          </p>
        ),
      )}
      {isDataArray ? ']' : '}'}
      {isLast ? '' : ','}
    </div>
  );
};

export default TreeView;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
