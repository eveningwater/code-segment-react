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
  const stateReducer = (_, action: ActionType) => {
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
