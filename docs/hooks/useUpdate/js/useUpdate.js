import { useReducer } from 'react';
const useUpdate = () => {
  const [, update] = useReducer(() => Object.create(null), void 0);
  return update;
};

export default useUpdate;
