| 标题             | 标签 | 首次添加时间 | 上次更新时间 |
| ---------------- | ---- | ------------ | ------------ |
| 简易数据表格组件 | 组件 | 2022/7/18    | 2022/7/18    |

呈现一个表，其中包含从一组基元数组动态创建的行。

- 渲染一个带有定义列的 `<table>` 元素。
- 使用 Array.prototype.map() 将数据中的每个项目呈现为具有适当键的 `<tr>` 元素。

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

Demo:

<code src="./Demo.zh-CN.tsx"></code>
