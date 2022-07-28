import React, { useState } from 'react';
import PasswordRevealer from './PasswordRevealer';
const Demo = () => {
  const [value, setValue] = useState('');
  const onChange = (v: string) => {
    console.log(v);
    setValue(v);
  };
  return (
    <PasswordRevealer
      placeholder="请输入密码"
      value={value}
      onChange={onChange}
    ></PasswordRevealer>
  );
};

export default Demo;
