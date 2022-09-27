import React from 'react';
import useGetSet from './useGetSet';
import { Button } from 'antd';

const Demo = () => {
  const [count, setCount] = useGetSet(0);

  const onClickHandler = () => {
    setTimeout(() => {
      setCount((count() as unknown as number) + 1);
    }, 1_000);
  };

  return (
    <Button onClick={onClickHandler}>
      Count: {count() as unknown as number}
    </Button>
  );
};

export default Demo;
