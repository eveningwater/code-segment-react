import React from 'react';
import useSearchParam from './useSearchParam';
import { Button } from 'antd';

const Demo = () => {
  const post = useSearchParam('post');
  const onPushState = (param) => {
    history.pushState({}, '', location.pathname + (param ? param : ''));
  };
  return (
    <div>
      <p>
        Post参数值:
        <>{post || 'null'}</>
      </p>
      <Button onClick={() => onPushState('?post=42')}>查看post参数值42</Button>
      <Button onClick={() => onPushState()}>退出</Button>
    </div>
  );
};

export default Demo;
