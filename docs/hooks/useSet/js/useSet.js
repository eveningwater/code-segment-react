import { useState, useMemo } from 'react';

const useSet = (initialValue) => {
  const [set, setSet] = useState(new Set(initialValue));
  const actions = useMemo(
    () => ({
      add: (item) => setSet((prevSet) => new Set([...prevSet, item])),
      remove: (item) =>
        setSet((prevSet) => new Set([...prevSet].filter((i) => i !== item))),
      clear: () => setSet(new Set()),
    }),
    [setSet],
  );

  return [set, actions];
};

export default useSet;
