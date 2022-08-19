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
      <Checkbox onChange={onChange}>checkbox</Checkbox>
      <Checkbox disabled>disabled checkbox</Checkbox>
      <Checkbox checked={checked} onChange={onControlledChange}>
        controlled checkbox
      </Checkbox>
    </Space>
  );
};

export default Demo;
