| title                    | tags               | firstSeen  | lastUpdated |
| ------------------------ | ------------------ | ---------- | ----------- |
| React useMediaQuery hook | hooks,state,effect | 2022/10/10 | 2022/10/10  |

Checks if the current environment matches a given media query and returns the appropriate value.

- Check if Window and Window.matchMedia() exist. Return whenFalse if not (e.g. SSR environment or unsupported browser).
- Use Window.matchMedia() to match the given query. Cast its matches property to a boolean and store in a state variable, match, using the useState() hook.
- Use the useEffect() hook to add a listener for changes and to clean up the listeners after the hook is destroyed.
- Return either whenTrue or whenFalse based on the value of match.

#### useMediaQuery.ts

```ts
import { useState, useEffect } from 'react';

const useMediaQuery = <T extends string, U, K>(
  query: T,
  whenTrue: U,
  whenFalse: K,
): U | K => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) {
    return whenFalse;
  }

  const mediaQuery = window.matchMedia(query);

  const [match, setMatch] = useState(!!mediaQuery.matches);

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches);

    mediaQuery.addListener(handler);

    return () => {
      mediaQuery.removeListener(handler);
    };
  }, []);

  return match ? whenTrue : whenFalse;
};

export default useMediaQuery;
```

#### Demo

```tsx | pure
import React from 'react';
import useMediaQuery from './useMediaQuery';

const Demo = () => {
  const text = useMediaQuery(
    '(max-width: 400px)',
    'Less than 400px wide',
    'More than 400px wide',
  );
  return <span>{text}</span>;
};

export default Demo;
```

#### useMediaQuery.js

```js
import { useState, useEffect } from 'react';

const useMediaQuery = (query, whenTrue, whenFalse) => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia === 'undefined'
  ) {
    return whenFalse;
  }

  const mediaQuery = window.matchMedia(query);

  const [match, setMatch] = useState(!!mediaQuery.matches);

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches);

    mediaQuery.addListener(handler);

    return () => {
      mediaQuery.removeListener(handler);
    };
  }, []);

  return match ? whenTrue : whenFalse;
};

export default useMediaQuery;
```

#### js Demo

```jsx | pure
import React from 'react';
import useMediaQuery from './useMediaQuery';

const Demo = () => {
  const text = useMediaQuery(
    '(max-width: 400px)',
    'Less than 400px wide',
    'More than 400px wide',
  );
  return <span>{text}</span>;
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="mediaQueryTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="mediaQueryJsDemo"></code>
