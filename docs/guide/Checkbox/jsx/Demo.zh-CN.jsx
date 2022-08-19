import React, { useState } from 'react';
import Checkbox from './Checkbox';
import { Space } from 'antd';

const Demo = () => {
  const [checked, setChecked] = useState(false);
  const onChange = (v) => {
    console.log(v);
  };
  const onControlledChange = () => {
    setChecked(!checked);
  };
  return (
    <Space>
      <Checkbox onChange={onChange}>复选框</Checkbox>
      <Checkbox disabled>禁用的复选框</Checkbox>
      <Checkbox checked={checked} onChange={onControlledChange}>
        受控的复选框
      </Checkbox>
    </Space>
  );
};

export default Demo;
