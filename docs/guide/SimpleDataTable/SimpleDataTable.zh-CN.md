---
title: 简易数据表格组件
nav: 指南
---

| 标题             | 标签 | 首次添加时间 | 上次更新时间 |
| ---------------- | ---- | ------------ | ------------ |
| 简易数据表格组件 | 组件 | 2022/7/18    | 2022/7/18    |

呈现一个表，其中包含从一组基元数组动态创建的行。

- 渲染一个带有定义列的 `<table>` 元素。
- 使用 Array.prototype.map() 将数据中的每个项目呈现为具有适当键的 `<tr>` 元素。

#### simpleDataTable.less

```less
@prefix: sim-;

.@{prefix}table {
  border-collapse: collapse;
  width: 100%;
  border-radius: 5px;
  &.is-bordered {
    border: 1px solid #dedede;
  }

  &-cell {
    font-size: 16px;
    padding: 6px 12px;
    position: relative;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
  &-header > tr > th {
    background-color: #fafafa;
  }
  &-row {
    transition: background 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover {
      background-color: #f2f3f4;
    }
  }
}
```

#### SimpleDataTable.tsx

```tsx | pure
import React from 'react';
import './simpleDataTable.less';

export interface columnProps {
  title: string;
  key: string;
  dataIndex: string;
}
export type DataProps = Record<string, any> & Pick<columnProps, 'key'>;
export interface SimpleDataTableProps {
  columns: columnProps[];
  data: DataProps[];
  isBordered: boolean;
}
const SimpleDataTable = (props: Partial<SimpleDataTableProps>) => {
  const { columns, data, isBordered } = props;
  return (
    <table className={`sim-table${isBordered ? ' is-bordered' : ''}`}>
      <thead className="sim-table-header">
        <tr>
          {columns?.map((column) => (
            <th className="sim-table-cell" key={column.key}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="sim-table-body">
        {data?.map((item) => (
          <tr key={item.key} className="sim-table-row">
            {columns?.map((col) => (
              <td className="sim-table-cell" key={col.key}>
                {item[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimpleDataTable;
```

#### SimpleDataTable.jsx

```jsx | pure
import React from 'react';
import '../simpleDataTable.less';

const SimpleDataTable = (props) => {
  const { columns, data, isBordered } = props;
  return (
    <table className={`sim-table${isBordered ? ' is-bordered' : ''}`}>
      <thead className="sim-table-header">
        <tr>
          {columns?.map((column) => (
            <th className="sim-table-cell" key={column.key}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="sim-table-body">
        {data?.map((item) => (
          <tr key={item.key} className="sim-table-row">
            {columns?.map((col) => (
              <td className="sim-table-cell" key={col.key}>
                {item[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimpleDataTable;
```

示例:

<code src="./Demo.zh-CN.tsx" id="simpleDataTableTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="simpleDataTableJsxDemoZH"></code>
