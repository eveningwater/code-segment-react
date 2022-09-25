| title               | tags               | firstSeen | lastUpdated |
| ------------------- | ------------------ | --------- | ----------- |
| React useFetch hook | hooks,state,effect | 2022/9/25 | 2022/9/25   |

Implements fetch() in a declarative manner.

- Create a custom hook that takes a url and options.
- Use the useState() hook to initialize the response, error and abort state variables.
- Use the useEffect() hook to asynchronously call fetch() and update the state variables accordingly.
- Create and use an AbortController to allow aborting the request. Use it to cancel the request when the component unmounts.
- Return an object containing the response, error and abort state variables.

#### useFetch.ts

```ts
import { useState, useEffect } from 'react';

const useFetch = (url: string, options: RequestInit) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<unknown>(null);
  const [abort, setAbort] = useState<AbortController['abort']>(() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(() => abortController.abort());
        const res = await fetch(url, { ...options, signal });
        const data = await res.json();
        setResponse(data);
      } catch (error: unknown) {
        setError(error);
      }
    };

    fetchData();
    return () => {
      abort();
    };
  }, []);

  return { response, error, abort };
};

export default useFetch;
```

#### Demo

```tsx | pure
import React from 'react';
import useFetch from './useFetch';
import { Spin } from 'antd';

const Demo = () => {
  const res = useFetch('https://dog.ceo/api/breeds/image/random', {});
  if (!res.response) {
    return <Spin tip="loading....."></Spin>;
  }
  const imageUrl = res.response?.message;
  return (
    <div>
      <img src={imageUrl} alt="avatar" width={400} height="auto" />
    </div>
  );
};

export default Demo;
```

#### useFetch.js

```js
import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [abort, setAbort] = useState(() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(() => abortController.abort());
        const res = await fetch(url, { ...options, signal });
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    return () => {
      abort();
    };
  }, []);

  return { response, error, abort };
};

export default useFetch;
```

#### js Demo

```jsx | pure
import React from 'react';
import useFetch from './useFetch';
import { Spin } from 'antd';

const Demo = () => {
  const res = useFetch('https://dog.ceo/api/breeds/image/random', {});
  if (!res.response) {
    return <Spin tip="loading....."></Spin>;
  }
  const imageUrl = res.response?.message;
  return (
    <div>
      <img src={imageUrl} alt="avatar" width={400} height="auto" />
    </div>
  );
};

export default Demo;
```

Demo:

<!-- <code src="./Demo.tsx"></code> -->

js Demo:

<code src="./js/Demo.jsx"></code>
