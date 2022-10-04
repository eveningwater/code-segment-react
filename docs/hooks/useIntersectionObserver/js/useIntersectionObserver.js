import { useEffect, useState } from 'react';
const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIsInterSecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInterSecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return isIntersecting;
};

export default useIntersectionObserver;
