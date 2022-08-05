import { useEffect } from 'react';
const useComponentDidMount = (onMountHandler: Function) => {
  useEffect(() => {
    onMountHandler();
  }, []);
};
export default useComponentDidMount;
