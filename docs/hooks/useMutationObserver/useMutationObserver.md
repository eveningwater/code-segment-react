| title                          | tags         | firstSeen  | lastUpdated |
| ------------------------------ | ------------ | ---------- | ----------- |
| React useMutationObserver hook | hooks,effect | 2022/10/12 | 2022/10/12  |

Watches for changes made to the DOM tree, using a MutationObserver

- Use a useEffect() hook that depends on the values of callback and options.
- Check if the given ref is initialized. If it is, create a new MutationObserver and pass it the callback.
- Call MutationObserver.observe() with the given options to watch the given ref for changes.
- Use MutationObserver.disconnect() to remove the observer from the ref when the component unmounts.

#### useMutationObserver.ts

```ts
import { useEffect } from 'react';
import type { RefObject } from 'react';

const useMutationObserver = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => {
        observer.disconnect();
      };
    }
  }, [callback, options]);
};

export default useMutationObserver;
```

#### Demo

```tsx | pure
import React, { useRef, useState } from 'react';
import type { RefObject } from 'react';
import { Input } from 'antd';
import useMutationObserver from './useMutationObserver';

const { TextArea } = Input;

const Demo = () => {
  const mutationRef = useRef<HTMLDivElement>(null);
  const [mutationCount, setMutationCount] = useState(0);
  const incrementCount = () => setMutationCount(mutationCount + 1);
  useMutationObserver(mutationRef as RefObject<HTMLElement>, incrementCount);
  const [content, setContent] = useState('hello,world!');

  return (
    <>
      <label htmlFor="content-input">Edit this to update the text:</label>
      <TextArea
        id="content-input"
        style={{ width: '100%' }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></TextArea>
      <div style={{ width: '100%' }} ref={mutationRef}>
        <div
          style={{
            resize: 'both',
            overflow: 'auto',
            maxWidth: '100%',
            border: '1px solid black',
          }}
        >
          <h2>Resize or change the content:</h2>
          <p>{content}</p>
        </div>
        <div>
          <h3>Mutation count {mutationCount}</h3>
        </div>
      </div>
    </>
  );
};

export default Demo;
```

#### useMutationObserver.js

```js
import { useEffect } from 'react';

const useMutationObserver = (
  ref,
  callback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => {
        observer.disconnect();
      };
    }
  }, [callback, options]);
};

export default useMutationObserver;
```

#### js Demo

```jsx | pure
import React, { useRef, useState } from 'react';
import { Input } from 'antd';
import useMutationObserver from './useMutationObserver';

const { TextArea } = Input;

const Demo = () => {
  const mutationRef = useRef();
  const [mutationCount, setMutationCount] = useState(0);
  const incrementCount = () => setMutationCount(mutationCount + 1);
  useMutationObserver(mutationRef, incrementCount);
  const [content, setContent] = useState('hello,world!');

  return (
    <>
      <label htmlFor="content-input">Edit this to update the text:</label>
      <TextArea
        id="content-input"
        style={{ width: '100%' }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></TextArea>
      <div style={{ width: '100%' }} ref={mutationRef}>
        <div
          style={{
            resize: 'both',
            overflow: 'auto',
            maxWidth: '100%',
            border: '1px solid black',
          }}
        >
          <h2>Resize or change the content:</h2>
          <p>{content}</p>
        </div>
        <div>
          <h3>Mutation count {mutationCount}</h3>
        </div>
      </div>
    </>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
