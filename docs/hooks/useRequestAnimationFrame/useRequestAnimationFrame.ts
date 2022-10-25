import { useRef, useEffect } from 'react';

export type requestAnimationReturnValue = ReturnType<
  typeof requestAnimationFrame
>;
const useRequestAnimationFrame = (callback: (...args: any) => any) => {
  const requestRef = useRef<requestAnimationReturnValue>();
  const previousRef = useRef<requestAnimationReturnValue>();

  const animate = (time: number) => {
    if (previousRef.current) {
      callback(time - previousRef.current);
    }
    previousRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current!);
    };
  }, []);
};

export default useRequestAnimationFrame;
