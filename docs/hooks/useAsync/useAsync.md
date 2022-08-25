| title               | tags                | firstSeen | lastUpdated |
| ------------------- | ------------------- | --------- | ----------- |
| React useAsync hook | hooks,state,reducer | 2022/8/2  | 2022/8/2    |

Handles asynchronous calls.

- Create a custom hook that takes a handler function, handler.
- Define a reducer function and an initial state for the custom hook's state.
- Use the useReducer() hook to initialize the state variable and the dispatch function.
- Define an asynchronous run function that will run the provided callback, handler, while using dispatch to update state as necessary.
- Return an object containing the properties of state (value, error and loading) and the run function.

#### useAsync.ts

```ts
import { useReducer } from 'react';
export type StateType = {
  loading: boolean;
  value: any;
  error: any;
};
export type ActionType = Partial<StateType> & { type: string };
export type RunType = (args: unknown) => Promise<void>;
const useAsync = (handler: Function) => {
  const initialState = {
    loading: false,
    error: null,
    value: null,
  };
  const stateReducer = (_: any, action: ActionType) => {
    switch (action.type) {
      case 'start':
        return { loading: true, error: null, value: null };
      case 'finish':
        return { loading: false, error: null, value: action.value };
      case 'error':
        return { loading: false, error: action.error, value: null };
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const run = async (args: unknown) => {
    try {
      dispatch({ type: 'start' });
      const value = await handler(args);
      dispatch({ type: 'finish', value });
    } catch (error) {
      dispatch({ type: 'error', error });
    }
  };

  return { ...state, run };
};

export default useAsync;
```

Demo:

```tsx | pure
import React from 'react';
import Button from '../../guide/Button/Button';
import Loader from '../../guide/Loader/Loader';
import Alert from '../../guide/Alert/Alert';
import useAsync, { StateType } from './useAsync';
import styled from '@emotion/styled';

const LoadContainer = styled.div`
  margin-top: 10px;
  color: #2396ef;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  flex-direction: column;
`;

const FetchImage = styled('img')({
  display: 'block',
  marginTop: 10,
  borderRadius: 5,
  maxWidth: '100%',
});

const Demo = () => {
  const imgFetch = useAsync((url) => fetch(url).then((res) => res.json()));
  return (
    <Container>
      <Button
        onClick={() => imgFetch.run('https://dog.ceo/api/breeds/image/random')}
        disabled={(imgFetch as StateType)?.loading}
      >
        Load image
      </Button>
      {(imgFetch as StateType)?.loading && (
        <LoadContainer>
          <Loader size={16}></Loader>
        </LoadContainer>
      )}
      {(imgFetch as StateType)?.error && (
        <Alert
          type="error"
          message={`Error ${(imgFetch as StateType)?.error}`}
        ></Alert>
      )}
      {(imgFetch as StateType)?.value && (
        <FetchImage
          src={(imgFetch as StateType)?.value.message}
          alt="avatar"
          width={400}
          height="auto"
        />
      )}
    </Container>
  );
};

export default Demo;
```

#### useAsync.js

```js | pure
const useAsync = (handler) => {
  const initialState = {
    loading: false,
    error: null,
    value: null,
  };

  const stateReducer = (_, action) => {
    switch (action.type) {
      case 'start':
        return { loading: true, error: null, value: null };
      case 'finish':
        return { loading: false, error: null, value: action.value };
      case 'error':
        return { loading: false, error: action.error, value: null };
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const run = async (args) => {
    try {
      dispatch({ type: 'start' });
      const value = await handler(args);
      dispatch({ type: 'finish', value });
    } catch (error) {
      dispatch({ type: 'error', error });
    }
  };

  return { ...state, run };
};

export default useAsync;
```

#### js Demo

```jsx | pure
import React from 'react';
import Button from '../../../guide/Button/Button';
import Loader from '../../../guide/Loader/Loader';
import Alert from '../../../guide/Alert/Alert';
import styled from '@emotion/styled';
import useAsync from './useAsync';

const LoadContainer = styled.div`
  margin-top: 10px;
  color: #2396ef;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  flex-direction: column;
`;

const FetchImage = styled('img')({
  display: 'block',
  marginTop: 10,
  borderRadius: 5,
  maxWidth: '100%',
});

const Demo = () => {
  const imgFetch = useAsync((url) => fetch(url).then((res) => res.json()));
  return (
    <Container>
      <Button
        onClick={() => imgFetch.run('https://dog.ceo/api/breeds/image/random')}
        disabled={imgFetch?.loading}
      >
        Load image
      </Button>
      {imgFetch?.loading && (
        <LoadContainer>
          <Loader size={16}></Loader>
        </LoadContainer>
      )}
      {imgFetch?.error && (
        <Alert type="error" message={`Error ${imgFetch?.error}`}></Alert>
      )}
      {imgFetch?.value && (
        <FetchImage
          src={imgFetch?.value.message}
          alt="avatar"
          width={400}
          height="auto"
        />
      )}
    </Container>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
