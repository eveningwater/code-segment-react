| 标题       | 标签      | 首次添加时间 | 更新时间  |
| ---------- | --------- | ------------ | --------- |
| 倒计时组件 | 组件,状态 | 2022/7/16    | 2022/7/16 |

呈现一个倒数计时器，当它到达零时打印一条消息。

- 使用 useState() 钩子创建一个状态变量来保存时间值。 从 props 初始化它并将其解构为它的组件。
- 使用 useState() 钩子创建暂停和结束状态变量，用于防止计时器在暂停或时间用完时滴答作响。
- 创建一个方法 tick，它根据当前值更新时间值（即将时间减少一秒）。
- 创建一个方法 reset，将所有状态变量重置为其初始状态。
- 使用 useEffect() 钩子通过 setTimeout()结合递归 每秒调用一次 tick 方法，并在组件卸载时使用 clearTimeout() 进行清理。
- 使用 String.prototype.padStart() 将时间数组的每个部分填充为两个字符，以创建计时器的可视化表示。

- helper.ts

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

- CountDown.tsx

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

- helper.js

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

- CountDown.jsx

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

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
