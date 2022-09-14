import { useState } from 'react';

const useDefault = (defaultState, initialState) => {
  const [value, setValue] = useState(initialState);

  const isEmptyValue = value === undefined || value === null;

  return [isEmptyValue ? defaultState : value, setValue];
};

export default useDefault;
