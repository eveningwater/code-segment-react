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
        placeholder="please select"
        defaultValue="Grapefruit"
        onChange={onChangeHandler}
      >
        <Option label="grapefruit" value="Grapefruit"></Option>
        <Option label="lime" value="lime"></Option>
        <Option label="coconut" value="coconut" disabled></Option>
        <Option label="mango" value="mango"></Option>
      </Select>
      <Select
        placeholder="please select"
        defaultValue="Grapefruit"
        onChange={onChangeHandler}
        disabled
      >
        <Option label="grapefruit" value="Grapefruit"></Option>
        <Option label="lime" value="lime"></Option>
        <Option label="coconut" value="coconut" disabled></Option>
        <Option label="mango" value="mango"></Option>
      </Select>
    </Space>
  );
};
export default Demo;
