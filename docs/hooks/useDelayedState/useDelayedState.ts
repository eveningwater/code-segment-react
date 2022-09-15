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
