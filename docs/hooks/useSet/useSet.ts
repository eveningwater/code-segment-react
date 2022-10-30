import { useState, useMemo } from 'react';

export interface ReturnValue {
  add: (i: Iterable<any>) => void;
  remove: (i: Iterable<any>) => void;
  clear: () => void;
}
const useSet = <T>(initialValue: Iterable<T>): [Set<T>, ReturnValue] => {
  const [set, setSet] = useState(new Set(initialValue));
  const actions = useMemo(
    () => ({
      add: (item: Iterable<any>) =>
        setSet((prevSet: Iterable<any>) => new Set([...prevSet, item])),
      remove: (item: Iterable<any>) =>
        setSet(
          (prevSet: Iterable<any>) =>
            new Set([...prevSet].filter((i) => i !== item)),
        ),
      clear: () => setSet(new Set()),
    }),
    [setSet],
  );

  return [set, actions];
};

export default useSet;
