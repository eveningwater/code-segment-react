import { useState, useCallback } from 'react';

const useToggler = (initialState) => {
  const [value, setValue] = useState(initialState);
  const toggleValue = useCallback(() => setValue((prev) => !prev), []);
  return [value, toggleValue];
};

export default useToggler;
