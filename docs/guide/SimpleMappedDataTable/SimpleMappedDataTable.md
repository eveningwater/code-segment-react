| title                    | tags                    | firstSeen | lastUpdated |
| ------------------------ | ----------------------- | --------- | ----------- |
| simple object data table | components,array,object | 2022/7/25 | 2022/7/25   |

Renders a table with rows dynamically created from an array of objects and a list of property names.

- Use Object.keys(), Array.prototype.filter(), Array.prototype.includes() and Array.prototype.reduce() to produce a filteredData array, containing all objects with the keys specified in columns.
- Render a `<table>` element with a set of columns equal to the amount of values in columns.
- Use Array.prototype.map() to render each value in the columns array as a `<th>` element.
- Use Array.prototype.map() to render each object in the filteredData array as a `<tr>` element, containing a `<td>` for each key in the object.
- Note: This component does not work with nested objects and will break if there are nested objects inside any of the properties specified in columns.

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

Demo:

<code src="./Demo.tsx" id="simpleMappedDataTableTsxDemo"></code>

jsx Demo:

<code src="./jsx/Demo.jsx" id="simpleMappedDataTableJsxDemo"></code>
