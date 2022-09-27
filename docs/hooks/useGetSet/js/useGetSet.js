import { useRef, useReducer, useMemo } from 'react';

const useGetSet = (initialState) => {
  const state = useRef(initialState);
  const [, update] = useReducer(() => ({}));
  return useMemo(
    () => [
      () => state.current,
      (newState) => {
        state.current = newState;
        update?.();
      },
    ],
    [],
  );
};

export default useGetSet;
