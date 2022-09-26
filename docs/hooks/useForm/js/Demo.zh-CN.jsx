import React from 'react';
import { Button } from 'antd';
import useForm from './useForm';

const CustomForm = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const [values, setValues] = useForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="ant-input"
        name="email"
        onChange={setValues}
      />
      <input
        type="text"
        className="ant-input"
        name="password"
        onChange={setValues}
      />
      <Button htmlType="submit" type="primary">
        提交
      </Button>
    </form>
  );
};

const Demo = () => <CustomForm></CustomForm>;

export default Demo;
