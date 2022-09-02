import React from 'react';
import SimpleMappedDataTable from './SimpleMappedDataTable';

const Demo = () => {
  const data = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '3',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '4',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '姓名',
    },
    {
      key: 'age',
      dataIndex: 'age',
      title: '年龄',
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: '地址',
    },
  ];
  return <SimpleMappedDataTable data={data} columns={columns} />;
};
export default Demo;
