import { useEffect } from 'react';
const useComponentDidMount = (onMountHandler) => {
  useEffect(() => {
    onMountHandler();
  }, []);
};
export default useComponentDidMount;
