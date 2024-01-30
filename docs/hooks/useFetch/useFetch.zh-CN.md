---
title: 请求钩子函数
nav: 钩子函数
---

| 标题         | 标签                  | 首次添加时间 | 更新时间  |
| ------------ | --------------------- | ------------ | --------- |
| 请求钩子函数 | 钩子函数，状态,副作用 | 2022/9/25    | 2022/9/25 |

以声明方式实现 fetch()。

- 创建一个带有 url 和选项的自定义钩子。
- 使用 useState() 挂钩来初始化响应、错误和中止状态变量。
- 使用 useEffect() 钩子异步调用 fetch() 并相应地更新状态变量。
- 创建并使用 AbortController 以允许中止请求。 在组件卸载时使用它来取消请求。
- 返回一个包含响应、错误和中止状态变量的对象。

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

#### 示例

```tsx | pure
import React from 'react';
import useFetch from './useFetch';
import { Spin } from 'antd';

const Demo = () => {
  const res = useFetch('https://dog.ceo/api/breeds/image/random', {});
  if (!res.response) {
    return <Spin tip="图片加载中....."></Spin>;
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

#### js 示例

```jsx | pure
import React from 'react';
import useFetch from './useFetch';
import { Spin } from 'antd';

const Demo = () => {
  const res = useFetch('https://dog.ceo/api/breeds/image/random', {});
  if (!res.response) {
    return <Spin tip="图片加载中....."></Spin>;
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

示例:

<code src="./Demo.zh-CN.tsx" id="fetchTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="fetchJsDemoZH"></code>
