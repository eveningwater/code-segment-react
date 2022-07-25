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
