| 标题             | 标签            | 首次添加时间 | 更新时间   |
| ---------------- | --------------- | ------------ | ---------- |
| 修改标题钩子函数 | 钩子函数,副作用 | 2022/11/01   | 2022/11/01 |

设置页面的标题

- 使用 typeof 来确定 Document 是否已定义。
- 使用 useRef() 挂钩来存储文档的原始标题（如果已定义）。
- 使用 useEffect() 钩子在组件挂载时将 Document.title 设置为传递的值，并在卸载时清理。

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

#### 示例

```tsx | pure
import React from 'react';
import { Button, Alert } from 'antd';
import useTitle from './useTitle';

const CustomAlert = () => {
  useTitle('警告');
  return <Alert message="警告!标题已经被修改。" type="info"></Alert>;
};

const Demo = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setAlertOpen(!alertOpen)}>切换警告</Button>
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

#### js 示例

```jsx | pure
import React from 'react';
import { Button, Alert } from 'antd';
import useTitle from './useTitle';

const CustomAlert = () => {
  useTitle('警告');
  return <Alert message="警告!标题已经被修改。" type="info"></Alert>;
};

const Demo = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setAlertOpen(!alertOpen)}>切换警告</Button>
      {alertOpen && <CustomAlert />}
    </>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
