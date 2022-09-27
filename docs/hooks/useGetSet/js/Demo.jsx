import React from 'react';
import useGetSet from './useGetSet';
import { Button } from 'antd';

const Demo = () => {
  const [count, setCount] = useGetSet(0);

  const onClickHandler = () => {
    setTimeout(() => {
      setCount(count() + 1);
    }, 1_000);
  };

  return <Button onClick={onClickHandler}>Count: {count()}</Button>;
};

export default Demo;
