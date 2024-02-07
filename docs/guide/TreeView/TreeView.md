| title    | tags                              | firstSeen | lastUpdated |
| -------- | --------------------------------- | --------- | ----------- |
| TreeView | components,object,state,recursion | 2023/3/21 | 2023/3/21   |

Renders a tree view of a JSON object or array with collapsible content.

- Use the value of the toggled prop to determine the initial state of the content (collapsed/expanded).
- Use the useState() hook to create the isToggled state variable and give it the value of the toggled prop initially.
- Render a `<span>` element and bind its onClick event to alter the component's isToggled state.
- Determine the appearance of the component, based on isParentToggled, isToggled, name and checking for Array.isArray() on data.
- For each child in data, determine if it is an object or array and recursively render a sub-tree or a text element with the appropriate style.

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

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
