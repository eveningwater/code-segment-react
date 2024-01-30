| title               | tags                 | firstSeen  | lastUpdated |
| ------------------- | -------------------- | ---------- | ----------- |
| React useHover hook | hooks,state,callback | 2022/10/03 | 2022/10/03  |

Handles the event of hovering over the wrapped component.

- Use the useState() hook to create a variable that holds the hovering state.
- Use the useCallback() hook to memoize two handler functions that update the state.
- Use the useCallback() hook to create a callback ref and create or update the listeners for the 'mouseover' and 'mouseout' events.
- Use the useRef() hook to keep track of the last node passed to callbackRef to be able to remove its listeners.

#### useHover.ts

```ts
import { useState, useCallback, useRef } from 'react';

const useHover = (): [(node: HTMLElement | null) => void, boolean] => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseOver = useCallback(() => {
    setIsHovering(true);
  }, []);
  const onMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  const nodeRef = useRef<HTMLElement | null>(null);
  const callbackRef = useCallback(
    (node: HTMLElement | null) => {
      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', onMouseOver);
        nodeRef.current.addEventListener('mouseout', onMouseOut);
      }
      nodeRef.current = node;
      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', onMouseOver);
        nodeRef.current.addEventListener('mouseout', onMouseOut);
      }
    },
    [onMouseOver, onMouseOut],
  );
  return [callbackRef, isHovering];
};

export default useHover;
```

#### Demo

```tsx | pure
import React from 'react';
import useHover from './useHover';

const Demo = () => {
  const [hoverRef, isHovering] = useHover();
  return <div ref={hoverRef}>{isHovering ? 'Hovering' : 'Not hovering'}</div>;
};

export default Demo;
```

#### useHover.js

```js
import { useState, useCallback, useRef } from 'react';

const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseOver = useCallback(() => {
    setIsHovering(true);
  }, []);
  const onMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  const nodeRef = useRef();
  const callbackRef = useCallback(
    (node) => {
      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', onMouseOver);
        nodeRef.current.addEventListener('mouseout', onMouseOut);
      }
      nodeRef.current = node;
      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', onMouseOver);
        nodeRef.current.addEventListener('mouseout', onMouseOut);
      }
    },
    [onMouseOver, onMouseOut],
  );
  return [callbackRef, isHovering];
};

export default useHover;
```

#### js Demo

```jsx | pure
import React from 'react';
import useHover from './useHover';

const Demo = () => {
  const [hoverRef, isHovering] = useHover();
  return <div ref={hoverRef}>{isHovering ? 'Hovering' : 'Not hovering'}</div>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="hoverTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="hoverJsDemo"></code>
