| title                     | tags               | firstSeen  | lastUpdated |
| ------------------------- | ------------------ | ---------- | ----------- |
| React useSearchParam hook | hooks,effect,state | 2022/10/28 | 2022/10/28  |

Tracks the browser's location search param.

- Use the useCallback() hook to create a callback that uses the URLSearchParams constructor to get the current value of param.
- Use the useState() hook to create a state variable that holds the current value of the param.
- Use the useEffect() hook to set appropriate event listeners to update the state variable when mounting and clean them up when unmounting.

#### useSearchParam.ts

```ts
import { useState, useCallback, useEffect } from 'react';

const events = ['popstate', 'pushstate', 'replacestate'];
const useSearchParam = (param: string): (() => string | null) => {
  const getValue = useCallback(
    () => () => new URLSearchParams(window.location.search).get(param),
    [param],
  );

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const onChange = () => {
      setValue(getValue());
    };

    events.forEach((type) => window.addEventListener(type, onChange));

    return () => {
      events.forEach((type) => window.removeEventListener(type, onChange));
    };
  }, []);

  return value;
};

export default useSearchParam;
```

#### Demo

```tsx | pure
import React from 'react';
import useSearchParam from './useSearchParam';
import { Button } from 'antd';

const Demo = () => {
  const post = useSearchParam('post');
  const onPushState = (param: string | void) => {
    history.pushState({}, '', location.pathname + (param ? param : ''));
  };
  return (
    <div>
      <p>
        Post param value:
        <>{post || 'null'}</>
      </p>
      <Button onClick={() => onPushState('?post=42')}>View post 42</Button>
      <Button onClick={() => onPushState()}>Exit</Button>
    </div>
  );
};

export default Demo;
```

#### useSearchParam.js

```js
import { useState, useCallback, useEffect } from 'react';

const events = ['popstate', 'pushstate', 'replacestate'];
const useSearchParam = (param) => {
  const getValue = useCallback(
    () => () => new URLSearchParams(window.location.search).get(param),
    [param],
  );

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const onChange = () => {
      setValue(getValue());
    };

    events.forEach((type) => window.addEventListener(type, onChange));

    return () => {
      events.forEach((type) => window.removeEventListener(type, onChange));
    };
  }, []);

  return value;
};

export default useSearchParam;
```

#### js Demo

```jsx | pure
import React from 'react';
import useSearchParam from './useSearchParam';
import { Button } from 'antd';

const Demo = () => {
  const post = useSearchParam('post');
  const onPushState = (param) => {
    history.pushState({}, '', location.pathname + (param ? param : ''));
  };
  return (
    <div>
      <p>
        Post param value:
        <>{post || 'null'}</>
      </p>
      <Button onClick={() => onPushState('?post=42')}>View post 42</Button>
      <Button onClick={() => onPushState()}>Exit</Button>
    </div>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="searchParamTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="searchParamJsDemo"></code>
