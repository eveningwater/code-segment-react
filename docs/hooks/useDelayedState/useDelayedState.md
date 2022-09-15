| title                      | tags               | firstSeen | lastUpdated |
| -------------------------- | ------------------ | --------- | ----------- |
| React useDelayedState hook | hooks,state,effect | 2022/9/15 | 2022/9/15   |

Delays creating a stateful value until some condition is met.

- Use the useState() hook to create a stateful value containing the actual state and a boolean, loaded.
- Use the useEffect() hook to update the stateful value if the condition or loaded changes.
- Create a function, updateState, that only updates the state value if loaded is truthy.

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

#### Demo

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
      setBranches(['master', 'staging', 'test', 'dev']);
    }, 2000);
    return () => {
      handle && clearTimeout(handle);
    };
  }, []);

  return (
    <div>
      <p>Selected branch: {selectedBranch || ''}</p>
      <Select onChange={(e: OptionValueProps) => setSelectedBranch(e.value)}>
        {branches?.map((item) => (
          <Option key={item} value={item} label={item}>
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

#### js Demo

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
      setBranches(['master', 'staging', 'test', 'dev']);
    }, 2000);
    return () => {
      handle && clearTimeout(handle);
    };
  }, []);

  return (
    <div>
      <p>Selected branch: {selectedBranch || ''}</p>
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

Demo:

<code src="./Demo.tsx"></code>

js Demo:

<code src="./js/Demo.jsx"></code>
