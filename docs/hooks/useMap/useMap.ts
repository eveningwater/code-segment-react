import { useState, useMemo } from 'react';

const useMap = (
  initialValue: Iterable<[any, any]>,
): [
  Map<any, any>,
  {
    set: (key: any, value: any) => void;
    remove: (key: any) => void;
    clear: () => void;
  },
] => {
  const [map, setMap] = useState(new Map(initialValue));

  const actions = useMemo(
    () => ({
      set: (key: any, value: any) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.set(key, value);
          return nextMap;
        }),
      remove: (key: any) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.delete(key);
          return nextMap;
        }),
      clear: () => setMap(new Map()),
    }),
    [setMap],
  );

  return [map, actions];
};

export default useMap;
