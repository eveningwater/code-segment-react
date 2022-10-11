import { useState } from 'react';

const useMergeState = <T>(
  initialState: Record<string, T> = {},
): [
  Record<string, T>,
  (v: Record<string, T> | ((...args: any) => any)) => void,
] => {
  const [value, setValue] = useState(initialState);

  const mergeState = (
    newState: Record<string, T> | ((...args: any) => any),
  ) => {
    if (typeof newState === 'function') {
      newState = newState(value);
    }
    setValue({
      ...value,
      ...newState,
    });
  };

  return [value, mergeState];
};

export default useMergeState;
