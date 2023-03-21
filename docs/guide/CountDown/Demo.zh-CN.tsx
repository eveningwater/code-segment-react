import { Space, Button } from 'antd';
import React, { useRef, useState } from 'react';
import CountDown from './CountDown';
import type { ImperRef } from './helper';

const Demo = () => {
  const countdownRef = useRef<ImperRef>(null);
  const [paused, setPaused] = useState(false);
  const onPaused = () => {
    setPaused(!paused);
    countdownRef.current?.onPaused(paused);
  };
  const onRestart = () => {
    countdownRef.current?.onRestart();
  };
  return (
    <>
      <CountDown
        ref={countdownRef}
        hours={1}
        minutes={45}
        overText="倒计时结束"
        pausedText="暂停中"
      />
      <Space>
        <Button onClick={onPaused}>{paused ? '继续' : '暂停'}</Button>
        <Button onClick={onRestart}>重新开始</Button>
      </Space>
    </>
  );
};

export default Demo;
