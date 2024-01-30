---
title: 表单钩子函数
nav: 钩子函数
---

| 标题         | 标签           | 首次添加时间 | 更新时间  |
| ------------ | -------------- | ------------ | --------- |
| 表单钩子函数 | 钩子函数，状态 | 2022/9/26    | 2022/9/26 |

从表单中的字段创建有状态值。

- 使用 useState() 挂钩为表单中的值创建状态变量。
- 创建一个函数，该函数将由表单字段使用适当的事件调用，并相应地更新状态变量。

#### useForm.ts

```ts
import { useState } from 'react';
import type { ChangeEventHandler } from 'react';

const useForm = (
  initialValues: Record<string, any>,
): [Record<string, any>, (e: unknown) => void] => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e: unknown) => {
      const target = (e as MouseEvent).target as HTMLInputElement;
      setValues({
        ...values,
        [target?.name]: target.value,
      });
    },
  ];
};

export default useForm;
```

#### 示例

```tsx | pure
import React from 'react';
import type { FormEventHandler } from 'react';
import { Button } from 'antd';
import useForm from './useForm';

const CustomForm = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const [values, setValues] = useForm(initialState);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="ant-input"
        name="email"
        onChange={setValues}
      />
      <input
        type="text"
        className="ant-input"
        name="password"
        onChange={setValues}
      />
      <Button htmlType="submit" type="primary">
        提交
      </Button>
    </form>
  );
};

const Demo = () => <CustomForm></CustomForm>;

export default Demo;
```

#### useForm.js

```js
import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => {
      const target = e.target;
      setValues({
        ...values,
        [target?.name]: target.value,
      });
    },
  ];
};

export default useForm;
```

#### js 示例

```jsx | pure
import React from 'react';
import { Button } from 'antd';
import useForm from './useForm';

const CustomForm = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const [values, setValues] = useForm(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="ant-input"
        name="email"
        onChange={setValues}
      />
      <input
        type="text"
        className="ant-input"
        name="password"
        onChange={setValues}
      />
      <Button htmlType="submit" type="primary">
        提交
      </Button>
    </form>
  );
};

const Demo = () => <CustomForm></CustomForm>;

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx" id="formTsDemoZH"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx" id="formJsDemoZH"></code>
