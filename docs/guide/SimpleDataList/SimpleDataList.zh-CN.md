| 标题         | 标签 | 首次添加时间 | 上次更新时间 |
| ------------ | ---- | ------------ | ------------ |
| 数据列表组件 | 组件 | 2022/7/17    | 2022/7/17    |

呈现基元数组中的元素列表。

- 使用 isOrdered 属性的值有条件地渲染一个 `<ol>` 或一个 `<ul>` 列表。
- 使用 Array.prototype.map() 将数据中的每个项目呈现为具有适当键的 `<li>` 元素。
- 使用 isBordered 属性为列表容器元素添加边框样式。

#### SimpleDataList.tsx

```tsx | pure
import { css } from '@emotion/css';
import React from 'react';

interface DataListProps {
  data: string[];
  isOrdered: boolean;
  isBordered: boolean;
}
const SimpleStyleDataList = css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  position: relative;
  &.bordered {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
`;
const SimpleDataListItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:last-of-type {
    border-bottom: 0;
  }
`;
const SimpleDataList = (props: Partial<DataListProps>) => {
  const { data, isOrdered = false, isBordered = true } = props;
  const List = data?.map((val, index) => (
    <li className={SimpleDataListItem} key={`${val}-${index}`}>
      {val}
    </li>
  ));
  const containerClassName = `${SimpleStyleDataList}${
    isBordered ? ' bordered' : ''
  }`;
  return isOrdered ? (
    <ol className={containerClassName}>{List}</ol>
  ) : (
    <ul className={containerClassName}>{List}</ul>
  );
};

export default SimpleDataList;
```

#### SimpleDataList.jsx

```jsx | pure
import { css } from '@emotion/css';
import React from 'react';
const SimpleStyleDataList = css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  position: relative;
  &.bordered {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
`;
const SimpleDataListItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:last-of-type {
    border-bottom: 0;
  }
`;
const SimpleDataList = (props) => {
  const { data, isOrdered = false, isBordered = true } = props;
  const List = data?.map((val, index) => (
    <li className={SimpleDataListItem} key={`${val}-${index}`}>
      {val}
    </li>
  ));
  const containerClassName = `${SimpleStyleDataList}${
    isBordered ? ' bordered' : ''
  }`;
  return isOrdered ? (
    <ol className={containerClassName}>{List}</ol>
  ) : (
    <ul className={containerClassName}>{List}</ul>
  );
};

export default SimpleDataList;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
