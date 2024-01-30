| title              | tags        | firstSeen | lastUpdated |
| ------------------ | ----------- | --------- | ----------- |
| React useForm hook | hooks,state | 2022/9/26 | 2022/9/26   |

Creates a stateful value from the fields in a form.

- Use the useState() hook to create a state variable for the values in the form.
- Create a function that will be called with an appropriate event by a form field and update the state variable accordingly.

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

#### Demo

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
        Submit
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

#### js Demo

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
        Submit
      </Button>
    </form>
  );
};

const Demo = () => <CustomForm></CustomForm>;

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="formTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="formJsDemo"></code>
