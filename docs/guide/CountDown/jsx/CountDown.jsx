import React, { forwardRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { useChildrenHandler, useTimeout } from './helper';

const StyleCountdown = styled.div`
  color: rgba(0, 0, 0.85);
  margin-bottom: 10px;
  font-size: 16px;
`;

const CountDown = forwardRef((props, ref) => {
  const {
    hours,
    minutes,
    seconds,
    overText = 'Time is up!',
    pausedText = 'paused!',
    delimiter = ':',
  } = props;
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  const [[h = 0, m = 0, s = 0], setTime] = useState([hours, minutes, seconds]);

  const tick = () => {
    if (paused || over) {
      return;
    }
    let newH = h,
      newM = m,
      newS = s;
    if (h === 0 && m === 0 && s === 0) {
      setOver(true);
    }

    if (m === 0 && s === 0) {
      newH--;
      newM = 59;
      newS = 59;
    }

    if (s === 0) {
      newM--;
      newS = 60;
    }
    newS--;
    setTime([newH, newM, newS]);
  };
  useTimeout(tick, 1000);
  useChildrenHandler(ref, {
    onPaused: useCallback((status) => {
      setPaused(!status);
    }, []),
    onOver: useCallback(() => {
      setPaused(false);
      setOver(true);
    }, []),
    onRestart: useCallback(() => {
      setTime([h, m, s]);
      setPaused(false);
      setOver(false);
    }, []),
  });
  const fillZero = (n) => n.toString().padStart(2, '0');
  return (
    <StyleCountdown>
      {over
        ? overText
        : paused
        ? pausedText
        : `${fillZero(h)}${delimiter}${fillZero(m)}${delimiter}${fillZero(s)}`}
    </StyleCountdown>
  );
});

export default CountDown;
