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
