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
