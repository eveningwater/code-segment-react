| title                | tags               | firstSeen  | lastUpdated |
| -------------------- | ------------------ | ---------- | ----------- |
| React useUpdate hook | components,reducer | 2022/11/04 | 2022/11/04  |

Forces the component to re-render when called.

- Use the useReducer() hook that creates a new object every time it's updated and return its dispatch.

#### useUpdate.ts

```ts
import { useReducer } from 'react';
const useUpdate = () => {
  const [, update] = useReducer(() => Object.create(null), void 0);
  return update;
};

export default useUpdate;
```

#### Demo

```tsx | pure
import React from 'react';
import useUpdate from './useUpdate';
import { Button } from 'antd';

const Demo = () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <Button onClick={update}>Update</Button>
    </>
  );
};

export default Demo;
```

#### useUpdate.js

```js
import { useReducer } from 'react';
const useUpdate = () => {
  const [, update] = useReducer(() => Object.create(null), void 0);
  return update;
};

export default useUpdate;
```

#### js Demo

```jsx | pure
import React from 'react';
import useUpdate from './useUpdate';
import { Button } from 'antd';

const Demo = () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <Button onClick={update}>Update</Button>
    </>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="updateTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="updateJsDemo"></code>
