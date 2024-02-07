| title                     | tags               | firstSeen | lastUpdated |
| ------------------------- | ------------------ | --------- | ----------- |
| React useClickInside hook | hooks,effect,event | 2022/8/5  | 2022/8/5    |

Handles the event of clicking inside the wrapped component.

- Create a custom hook that takes a ref and a callback to handle the 'click' event.
- Use the useEffect() hook to append and clean up the click event.
- Use the useRef() hook to create a ref for your click component and pass it to the useClickInside hook.

#### useClickInside.ts

```ts
import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

const useClickInside = (ref: MutableRefObject<any>, callback: Function) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
};

export default useClickInside;
```

#### Demo

```tsx | pure
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useClickInside from './useClickInside';
import Modal from '../../guide/Modal/Modal';

const ClickStyleBox = styled.div`
  border: 2px dashed #2396ef;
  height: 200px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface ClickBoxProps {
  onClickInside(): void;
}
const ClickBox = (props: Partial<ClickBoxProps>) => {
  const { onClickInside } = props;
  const clickRef = useRef<HTMLDivElement | null>(null);
  useClickInside(clickRef, () => {
    if (onClickInside) {
      onClickInside();
    }
  });
  return (
    <ClickStyleBox ref={clickRef}>
      <p>Click inside this element</p>
    </ClickStyleBox>
  );
};
const Demo = () => {
  return (
    <ClickBox
      onClickInside={() =>
        Modal.confirm({
          content: 'click inside',
          cancelText: 'Cancel',
          okText: 'Ok',
        })
      }
    ></ClickBox>
  );
};

export default Demo;
```

#### useClickOutside.js

```js
import { useEffect } from 'react';

const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
};

export default useClickOutside;
```

#### js Demo

```jsx | pure
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useClickInside from './useClickInside';
import Modal from '../../../guide/Modal/jsx/Modal';

const ClickStyleBox = styled.div`
  border: 2px dashed #2396ef;
  height: 200px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClickBox = (props) => {
  const { onClickInside } = props;
  const clickRef = useRef(null);
  useClickInside(clickRef, () => {
    if (onClickInside) {
      onClickInside();
    }
  });
  return (
    <ClickStyleBox ref={clickRef}>
      <p>Click inside this element</p>
    </ClickStyleBox>
  );
};
const Demo = () => {
  return (
    <ClickBox
      onClickInside={() =>
        Modal.confirm({
          content: 'click inside',
          cancelText: 'Cancel',
          okText: 'Ok',
        })
      }
    ></ClickBox>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
