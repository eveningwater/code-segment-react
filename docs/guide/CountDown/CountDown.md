| title           | tags             | firstSeen | lastUpdated |
| --------------- | ---------------- | --------- | ----------- |
| Countdown timer | components,state | 2022/7/16 | 2022/7/16   |

Renders a countdown timer that prints a message when it reaches zero.

- Use the useState() hook to create a state variable to hold the time value. Initialize it from the props and destructure it into its components.
- Use the useState() hook to create the paused and over state variables, used to prevent the timer from ticking if it's paused or the time has run out.
- Create a method tick, that updates the time values based on the current value (i.e. decreasing the time by one second).
- Create a method reset, that resets all state variables to their initial states.
- Use the the useEffect() hook to call the tick method every second via the use of setTimeout() and recursion and use clearTimeout() to clean up when the component is unmounted.
- Use String.prototype.padStart() to pad each part of the time array to two characters to create the visual representation of the timer.

#### helper.ts

```ts | pure
import type { MutableRefObject, DependencyList, Ref } from 'react';
import { useImperativeHandle, useEffect, useRef } from 'react';

export const useChildrenHandler = <T, K extends object>(
  originRef: MutableRefObject<T>,
  handler: K,
  deps?: DependencyList,
): void =>
  useImperativeHandle(
    originRef,
    () => {
      return {
        ...originRef.current,
        ...handler,
      };
    },
    deps,
  );

export type ImperFunc = (...args: any[]) => any;
export type ImperRef = Record<string, ImperFunc>;
export type ImperItem = {
  ref: Ref<ImperRef>;
};
let timer: number;
export const useTimeout = (callback, delay = 1000) => {
  const ref = useRef() as MutableRefObject<() => void>;
  useEffect(() => {
    ref.current = callback;
  });
  useEffect(() => {
    const handler = () => {
      ref.current();
      timer = setTimeout(handler, delay);
    };
    handler();
    return () => clearTimeout(timer);
  }, [delay]);
};
```

#### CountDown.tsx

```tsx | pure
import React, { forwardRef, useState, useCallback } from 'react';
import type { MutableRefObject } from 'react';
import styled from '@emotion/styled';
import type { ImperItem, ImperRef } from './helper';
import { useChildrenHandler, useTimeout } from './helper';

interface CountDownProps {
  hours: number;
  minutes: number;
  seconds: number;
  overText?: string;
  pausedText?: string;
  delimiter?: string;
}

const StyleCountdown = styled.div`
  color: rgba(0, 0, 0.85);
  margin-bottom: 10px;
  font-size: 16px;
`;

const CountDown = forwardRef(
  (props: Partial<CountDownProps>, ref: ImperItem['ref']) => {
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
    const [[h = 0, m = 0, s = 0], setTime] = useState([
      hours,
      minutes,
      seconds,
    ]);

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
    useChildrenHandler(ref as MutableRefObject<ImperRef>, {
      onPaused: useCallback((status: boolean) => {
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
    const fillZero = (n: number) => n.toString().padStart(2, '0');
    return (
      <StyleCountdown>
        {over
          ? overText
          : paused
          ? pausedText
          : `${fillZero(h)}${delimiter}${fillZero(m)}${delimiter}${fillZero(
              s,
            )}`}
      </StyleCountdown>
    );
  },
);

export default CountDown;
```

#### helper.js

```js
import { useImperativeHandle, useEffect, useRef } from 'react';

export const useChildrenHandler = (originRef, handler, deps?) =>
  useImperativeHandle(
    originRef,
    () => ({
      ...originRef.current,
      ...handler,
    }),
    deps,
  );
let timer;
// see this:https://www.aaron-powell.com/posts/2019-09-23-recursive-settimeout-with-react-hooks/
export const useTimeout = (callback, delay = 1000) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = callback;
  });
  useEffect(() => {
    const handler = () => {
      ref.current();
      timer = setTimeout(handler, delay);
    };
    handler();
    return () => clearTimeout(timer);
  }, [delay]);
};
```

#### CountDown.jsx

```jsx | pure
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
```

demo:

<code src="./Demo.tsx" id="countDownTsxDemo"></code>

jsx demo:

<code src="./jsx/Demo.jsx" id="countDownJsxDemo"></code>
