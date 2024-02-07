| title                      | tags               | firstSeen | lastUpdated |
| -------------------------- | ------------------ | --------- | ----------- |
| React useClickOutside hook | hooks,effect,event | 2022/8/5  | 2022/8/5    |

Handles the event of clicking outside of the wrapped component.

- Create a custom hook that takes a ref and a callback to handle the click event.
- Use the useEffect() hook to append and clean up the click event.
- Use the useRef() hook to create a ref for your click component and pass it to the useClickOutside hook.

#### useClickOutside.ts

```ts
import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

const useClickOutside = (ref: MutableRefObject<any>, callback: Function) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
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

#### ts demo

```tsx | pure
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useClickOutside from './useClickOutside';

const ClickStyleBox = styled.div`
  border: 2px dashed #2396ef;
  height: 200px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface ClickBoxProps {
  onClickOutside(): void;
}
const ClickBox = (props: Partial<ClickBoxProps>) => {
  const { onClickOutside } = props;
  const clickRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(clickRef, () => {
    if (onClickOutside) {
      onClickOutside();
    }
  });
  return (
    <ClickStyleBox ref={clickRef}>
      <p>Click out of this element</p>
    </ClickStyleBox>
  );
};
const Demo = () => {
  return <ClickBox onClickOutside={() => alert('click outside')}></ClickBox>;
};

export default Demo;
```

#### useClickOutside.js

```js
import { useEffect } from 'react';

const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
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

#### js demo

```jsx | pure
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useClickOutside from './useClickOutside';

const ClickStyleBox = styled.div`
  border: 2px dashed #2396ef;
  height: 200px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ClickBox = (props) => {
  const { onClickOutside } = props;
  const clickRef = useRef(null);
  useClickOutside(clickRef, () => {
    if (onClickOutside) {
      onClickOutside();
    }
  });
  return (
    <ClickStyleBox ref={clickRef}>
      <p>Click out of this element</p>
    </ClickStyleBox>
  );
};
const Demo = () => {
  return <ClickBox onClickOutside={() => alert('click outside')}></ClickBox>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>

more Demo see [Select component](../../guide/Select/Select).
