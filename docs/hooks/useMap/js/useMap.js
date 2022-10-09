import { useState, useMemo } from 'react';

const useMap = (initialValue) => {
  const [map, setMap] = useState(new Map(initialValue));

  const actions = useMemo(
    () => ({
      set: (key, value) =>
        setMap((prevMap) => {
          const nextMap = new Map(prevMap);
          nextMap.set(key, value);
          return nextMap;
        }),
      remove: (key) =>
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
