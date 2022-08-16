import { useReducer } from 'react';

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
