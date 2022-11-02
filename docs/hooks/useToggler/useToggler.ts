import { useState, useCallback } from 'react';

const useToggler = (initialState: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initialState);
  const toggleValue = useCallback(() => setValue((prev: boolean) => !prev), []);
  return [value, toggleValue];
};

export default useToggler;
