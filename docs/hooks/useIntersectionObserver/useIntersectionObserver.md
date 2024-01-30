| title                              | tags               | firstSeen  | lastUpdated |
| ---------------------------------- | ------------------ | ---------- | ----------- |
| React useIntersectionObserver hook | hooks,state,effect | 2022/10/04 | 2022/10/04  |

Observes visibility changes for a given element.

- Use the useState() hook to store the intersection value of the given element.
- Create an IntersectionObserver with the given options and an appropriate callback to update the isIntersecting state variable.
- Use the useEffect() hook to call IntersectionObserver.observe() when mounting the component and clean up using IntersectionObserver.unobserve() when unmounting.

#### useIntersectionObserver.ts

```ts
import { useEffect, useState } from 'react';
import type { MutableRefObject } from 'react';
const useIntersectionObserver = (
  ref: MutableRefObject<Element | null>,
  options: IntersectionObserverInit,
): boolean => {
  const [isIntersecting, setIsInterSecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInterSecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return isIntersecting;
};

export default useIntersectionObserver;
```

#### Demo

```tsx | pure
import React, { useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
const Demo = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const onScreen = useIntersectionObserver(ref, { threshold: 0.5 });
  return (
    <div>
      <div style={{ height: '100vh' }}>Scroll down</div>
      <div style={{ height: '100vh' }} ref={ref}>
        <p>{onScreen ? 'Element is on screen.' : 'Scroll more!'}</p>
      </div>
    </div>
  );
};
export default Demo;
```

#### useIntersectionObserver.js

```js
import { useEffect, useState } from 'react';
const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIsInterSecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInterSecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return isIntersecting;
};

export default useIntersectionObserver;
```

#### js Demo

```jsx | pure
import React, { useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';
const Demo = () => {
  const ref = useRef(null);
  const onScreen = useIntersectionObserver(ref, { threshold: 0.5 });
  return (
    <div>
      <div style={{ height: '100vh' }}>Scroll down</div>
      <div style={{ height: '100vh' }} ref={ref}>
        <p>{onScreen ? 'Element is on screen.' : 'Scroll more!'}</p>
      </div>
    </div>
  );
};
export default Demo;
```

Demo:

<code src="./Demo.tsx" id="intersectionObserverTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="intersectionObserverJsDemo"></code>
