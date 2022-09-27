import { useRef, useReducer, useMemo } from 'react';

const useGetSet = <T>(initialState?: T) => {
  const state = useRef(initialState);
  const [, update] = useReducer(() => ({}), {});
  return useMemo(
    () => [
      () => state.current,
      (newState?: T) => {
        state.current = newState;
        update();
      },
    ],
    [],
  );
};

export default useGetSet;
