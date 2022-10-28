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
        Post param value:
        <>{post || 'null'}</>
      </p>
      <Button onClick={() => onPushState('?post=42')}>View post 42</Button>
      <Button onClick={() => onPushState()}>Exit</Button>
    </div>
  );
};

export default Demo;
