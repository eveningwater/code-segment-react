import { useEffect } from 'react';

const useComponentWillUnmount = (onUnmountHandler) => {
  useEffect(() => () => onUnmountHandler?.(), []);
};

export default useComponentWillUnmount;
