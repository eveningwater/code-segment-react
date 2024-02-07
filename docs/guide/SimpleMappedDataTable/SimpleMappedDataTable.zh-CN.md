| 标题                 | 标签             | 首次添加时间 | 上次更新时间 |
| -------------------- | ---------------- | ------------ | ------------ |
| 简易对象数据表格组件 | 组件，数组，对象 | 2022/7/25    | 2022/7/25    |

呈现一个表，其中包含从对象数组和属性名称列表动态创建的行。

- 使用 Object.keys(), Array.prototype.filter(), Array.prototype.includes() 和 Array.prototype.reduce() 生成一个过滤数据数组，包含所有具有列中指定键的对象。
- 渲染一个 `<table>` 元素，其列集合等于列中值的数量。
- 使用 Array.prototype.map() 将列数组中的每个值呈现为 `<th>` 元素。
- 使用 Array.prototype.map() 将 filtersData 数组中的每个对象呈现为一个 `<tr>` 元素，其中包含对象中每个键的 `<td>`。
- 注意：此组件不适用于嵌套对象，如果在列中指定的任何属性中存在嵌套对象，则该组件将中断。

#### SimpleMappedDataTable.less

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

#### SimpleMappedDataTable.tsx

```tsx | pure
import React from 'react';
import './SimpleMappedDataTable.less';

export interface columnProps {
  title: string;
  key: string;
  dataIndex: string;
}
export type DataProps = Record<string, any> & Pick<columnProps, 'key'>;
export interface SimpleMappedDataTableProps {
  columns: columnProps[];
  data: DataProps[];
  isBordered: boolean;
}
const SimpleMappedDataTable = (props: Partial<SimpleMappedDataTableProps>) => {
  const { columns, data, isBordered } = props;

  let filteredData = data?.map((v) =>
    Object.keys(v)
      .filter((k) => columns?.some((col) => col.dataIndex === k))
      .reduce((acc, key) => ((acc[key] = v[key]), acc), {}),
  ) as DataProps[];

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
        {filteredData?.map((item, index) => (
          <tr key={`${index}_${index}`} className="sim-table-row">
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

export default SimpleMappedDataTable;
```

#### SimpleMappedDataTable.jsx

```jsx | pure
import React from 'react';
import '../SimpleMappedDataTable.less';
const SimpleMappedDataTable = (props) => {
  const { columns, data, isBordered } = props;

  let filteredData = data?.map((v) =>
    Object.keys(v)
      .filter((k) => columns?.some((col) => col.dataIndex === k))
      .reduce((acc, key) => ((acc[key] = v[key]), acc), {}),
  );

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
        {filteredData?.map((item, index) => (
          <tr key={`${index}_${index}`} className="sim-table-row">
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

export default SimpleMappedDataTable;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
