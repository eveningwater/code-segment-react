import { Space, Button } from 'antd';
import React, { useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import CountDown from './CountDown';
import type { ImperRef } from './helper';

const Demo = () => {
  const countdownRef = useRef() as MutableRefObject<ImperRef>;
  const [paused, setPaused] = useState(false);
  const onPaused = () => {
    setPaused(!paused);
    countdownRef.current.onPaused(paused);
  };
  const onRestart = () => {
    countdownRef.current.onRestart();
  };
  return (
    <>
      <CountDown ref={countdownRef} hours={1} minutes={45} />
      <Space>
        <Button onClick={onPaused}>{paused ? 'resume' : 'Pause'}</Button>
        <Button onClick={onRestart}>Restart</Button>
      </Space>
    </>
  );
};

export default Demo;
