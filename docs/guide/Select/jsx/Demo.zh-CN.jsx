import React from 'react';
import Select from './Select';
import { Space } from 'antd';
const { Option } = Select;
const Demo = () => {
  const onChangeHandler = (v) => {
    console.log(v);
  };
  return (
    <Space>
      <Select
        placeholder="请选择"
        defaultValue="Grapefruit"
        onChange={onChangeHandler}
      >
        <Option label="西柚" value="Grapefruit"></Option>
        <Option label="酸橙" value="lime"></Option>
        <Option label="椰子" value="coconut" disabled></Option>
        <Option label="芒果" value="mango"></Option>
      </Select>
      <Select
        placeholder="请选择"
        defaultValue="Grapefruit"
        onChange={onChangeHandler}
        disabled
      >
        <Option label="西柚" value="Grapefruit"></Option>
        <Option label="酸橙" value="lime"></Option>
        <Option label="椰子" value="coconut" disabled></Option>
        <Option label="芒果" value="mango"></Option>
      </Select>
    </Space>
  );
};
export default Demo;
