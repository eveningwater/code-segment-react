import { useRef, useEffect } from 'react';

const useRequestAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousRef = useRef();

  const animate = (time) => {
    if (previousRef.current) {
      callback(time - previousRef.current);
    }
    previousRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
};

export default useRequestAnimationFrame;
