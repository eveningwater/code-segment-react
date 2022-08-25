import React, { useRef, useState, useCallback, useEffect } from 'react';
const LazyLoadingImage = (props) => {
  const {
    alt,
    src,
    className,
    loadInitially = false,
    observerOptions = { root: null, rootMargin: '200px 0px' },
    ...rest
  } = props;
  const observerRef = useRef(null);
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const observerCallback = useCallback(
    (entries) => {
      if (entries[0].isIntersecting) {
        observerRef.current?.disconnect();
        setIsLoaded(true);
      }
    },
    [observerRef],
  );
  useEffect(() => {
    if (loadInitially) {
      return;
    }
    if ('loading' in HTMLImageElement.prototype) {
      setIsLoaded(true);
      return;
    }
    observerRef.current = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    observerRef.current.observe(imgRef.current);
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <img
      src={isLoaded ? src : ''}
      alt={alt}
      ref={imgRef}
      className={className}
      loading={loadInitially ? undefined : 'lazy'}
      {...rest}
    />
  );
};
export default LazyLoadingImage;
