| title               | tags         | firstSeen  | lastUpdated |
| ------------------- | ------------ | ---------- | ----------- |
| React useTitle hook | hooks,effect | 2022/11/01 | 2022/11/01  |

Sets the title of the page

- Use typeof to determine if the Document is defined or not.
- Use the useRef() hook to store the original title of the Document, if defined.
- Use the useEffect() hook to set Document.title to the passed value when the component mounts and clean up when unmounting.

#### useTitle.ts

```ts
import { useRef, useEffect } from 'react';

const useTitle = (title: string) => {
  const isDocumentDefined = typeof document !== 'undefined';
  const originalTitle = useRef<string>(isDocumentDefined ? document.title : '');

  useEffect(() => {
    if (!isDocumentDefined) {
      return;
    }

    if (document.title !== title) {
      document.title = title;
    }

    return () => {
      document.title = originalTitle.current;
    };
  }, []);
};

export default useTitle;
```

#### Demo

```tsx | pure
import React from 'react';
import { Button, Alert } from 'antd';
import useTitle from './useTitle';

const CustomAlert = () => {
  useTitle('Alert');
  return <Alert message="Alert! Title has changed" type="info"></Alert>;
};

const Demo = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setAlertOpen(!alertOpen)}>Toggle alert</Button>
      {alertOpen && <CustomAlert />}
    </>
  );
};

export default Demo;
```

#### useTitle.js

```js
import { useRef, useEffect } from 'react';

const useTitle = (title) => {
  const isDocumentDefined = typeof document !== 'undefined';
  const originalTitle = useRef(isDocumentDefined ? document.title : '');

  useEffect(() => {
    if (!isDocumentDefined) {
      return;
    }

    if (document.title !== title) {
      document.title = title;
    }

    return () => {
      document.title = originalTitle.current;
    };
  }, []);
};

export default useTitle;
```

#### js Demo

```jsx | pure
import React from 'react';
import { Button, Alert } from 'antd';
import useTitle from './useTitle';

const CustomAlert = () => {
  useTitle('Alert');
  return <Alert message="Alert! Title has changed" type="info"></Alert>;
};

const Demo = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setAlertOpen(!alertOpen)}>Toggle alert</Button>
      {alertOpen && <CustomAlert />}
    </>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="titleTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="titleJsDemo"></code>
