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
