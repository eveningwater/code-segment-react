| 标题             | 标签                   | 首次添加时间 | 更新时间  |
| ---------------- | ---------------------- | ------------ | --------- |
| 延迟状态钩子函数 | 钩子函数，状态，副作用 | 2022/9/15    | 2022/9/15 |

延迟创建有状态值，直到满足某些条件。

- 使用 useState() 钩子创建一个有状态值，其中包含实际状态和加载的布尔值。
- 如果条件或加载发生变化，请使用 useEffect() 挂钩更新有状态值。
- 创建一个函数，updateState，仅在加载为真时更新状态值。

#### useDelayedState.ts

```ts
import { useState, useEffect } from 'react';

export interface InitialStateType {
  loaded: boolean;
}

const useDelayedState = <T, U>(
  initialState: T,
  condition: U,
): [T, (v: T) => void] => {
  interface StateDataType extends InitialStateType {
    state: T | null;
  }
  const [{ state, loaded }, setState] = useState<StateDataType>({
    loaded: false,
    state: null,
  });

  useEffect(() => {
    if (!loaded && condition) {
      setState({
        state: initialState as T,
        loaded: true,
      });
    }
  }, [condition, loaded]);

  const updateState = (newState: T) => {
    if (!loaded) {
      return;
    }
    setState({
      state: newState,
      loaded,
    });
  };
  return [state as T, updateState];
};

export default useDelayedState;
```

#### 示例

```tsx | pure
import React, { useState, useEffect } from 'react';
import useDelayedState from './useDelayedState';
import Select from '../../guide/Select/Select';
import type { OptionValueProps } from '../../guide/Select/Option';

const { Option } = Select;

const Demo = () => {
  const [branches, setBranches] = useState<string[]>([]);

  const [selectedBranch, setSelectedBranch] = useDelayedState(
    branches[0],
    branches.length,
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      setBranches(['主', '分期', '测试', '开发']);
    }, 2000);
    return () => {
      handle && clearTimeout(handle);
    };
  }, []);

  return (
    <div>
      <p>选中的分支: {selectedBranch || ''}</p>
      <Select onChange={(e: OptionValueProps) => setSelectedBranch(e.value)}>
        {branches?.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Demo;
```

#### useDelayedState.js

```js
import { useState, useEffect } from 'react';

const useDelayedState = (initialState, condition) => {
  const [{ state, loaded }, setState] = useState({
    loaded: false,
    state: null,
  });

  useEffect(() => {
    if (!loaded && condition) {
      setState({
        state: initialState,
        loaded: true,
      });
    }
  }, [condition, loaded]);

  const updateState = (newState) => {
    if (!loaded) {
      return;
    }
    setState({
      state: newState,
      loaded,
    });
  };
  return [state, updateState];
};

export default useDelayedState;
```

#### js 示例

```jsx | pure
import React, { useState, useEffect } from 'react';
import useDelayedState from './useDelayedState';
import Select from '../../../guide/Select/jsx/Select';

const { Option } = Select;

const Demo = () => {
  const [branches, setBranches] = useState([]);

  const [selectedBranch, setSelectedBranch] = useDelayedState(
    branches[0],
    branches.length,
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      setBranches(['主', '分期', '测试', '开发']);
    }, 2000);
    return () => {
      handle && clearTimeout(handle);
    };
  }, []);

  return (
    <div>
      <p>选中的分支: {selectedBranch || ''}</p>
      <Select onChange={(e) => setSelectedBranch(e.value)}>
        {branches?.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
