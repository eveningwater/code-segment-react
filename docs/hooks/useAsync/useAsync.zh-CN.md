| 标题               | 标签                   | 首次添加时间 | 更新时间  |
| ------------------ | ---------------------- | ------------ | --------- |
| 使用异步的钩子函数 | 钩子函数，状态，折叠器 | 2022/8/04    | 2022/8/04 |

处理异步调用。

- 创建一个带有处理函数的自定义钩子，handler。
- 为自定义钩子的状态定义一个 reducer 函数和一个初始状态。
- 使用 useReducer() 钩子初始化状态变量和调度函数。
- 定义一个异步运行函数，它将运行提供的回调、处理程序，同时根据需要使用调度更新状态。
- 返回一个包含状态属性（值、错误和加载）和运行函数的对象。

hooks:

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
const Demo = () => {
  const imgFetch = useAsync((url) => fetch(url).then((res) => res.json()));
  return (
    <Container>
      <Button
        onClick={() => imgFetch.run('https://dog.ceo/api/breeds/image/random')}
        disabled={(imgFetch as StateType)?.loading}
      >
        加载图片
      </Button>
      {(imgFetch as StateType)?.loading && (
        <LoadContainer>
          <Loader size={16}></Loader>
        </LoadContainer>
      )}
      {(imgFetch as StateType)?.error && (
        <Alert
          type="error"
          message={`错误 ${(imgFetch as StateType)?.error}`}
        ></Alert>
      )}
      {(imgFetch as StateType)?.value && (
        <img
          src={(imgFetch as StateType)?.value.message}
          alt="avatar"
          width={400}
          height="auto"
          style={{ display: 'block', marginTop: 10, borderRadius: 5 }}
        />
      )}
    </Container>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>
