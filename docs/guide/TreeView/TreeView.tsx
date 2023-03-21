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
