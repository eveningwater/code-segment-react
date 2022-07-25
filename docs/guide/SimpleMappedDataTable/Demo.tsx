import React from 'react';
import SimpleMappedDataTable from './SimpleMappedDataTable';

const Demo = () => {
  const data = [
    {
      key: '1',
      name: 'Tiger Hu',
      age: 32,
      address: 'No. 1, Hudi Park, Xihu District',
    },
    {
      key: '2',
      name: 'Hu Yanzu',
      age: 42,
      address: 'No. 1, Hudi Park, Xihu District',
    },
    {
      key: '3',
      name: 'Hu Yanzu',
      age: 42,
      address: 'No. 1, Hudi Park, Xihu District',
    },
    {
      key: '4',
      name: 'Hu Yanzu',
      age: 42,
      address: 'No. 1, Hudi Park, Xihu District',
    },
  ];
  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'name',
    },
    {
      key: 'age',
      dataIndex: 'age',
      title: 'age',
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'address',
    },
  ];
  return <SimpleMappedDataTable data={data} columns={columns} isBordered />;
};
export default Demo;
