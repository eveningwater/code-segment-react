import React, { useState } from 'react';
import PasswordRevealer from './PasswordRevealer';
const Demo = () => {
  const [value, setValue] = useState('');
  const onChange = (v) => {
    console.log(v);
    setValue(v);
  };
  return (
    <PasswordRevealer
      placeholder="Please Input the password"
      value={value}
      onChange={onChange}
    ></PasswordRevealer>
  );
};

export default Demo;
