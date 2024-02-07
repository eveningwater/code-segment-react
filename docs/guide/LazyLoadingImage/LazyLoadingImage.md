| title              | tags                    | firstSeen | lastUpdated |
| ------------------ | ----------------------- | --------- | ----------- |
| Lazy-loading image | components,effect,state | 2022/7/20 | 2022/7/20   |

Renders an image that supports lazy loading.

- Use the useState() hook to create a stateful value that indicates if the image has been loaded.
- Use the useEffect() hook to check if the HTMLImageElement.prototype contains 'loading', effectively checking if lazy loading is supported natively. If not, create a new IntersectionObserver and use IntersectionObserver.observer() to observer the `<img>` element. Use the return value of the hook to clean up when the component unmounts.
- Use the useCallback() hook to memoize a callback function for the IntersectionObserver. This callback will update the isLoaded state variable and use IntersectionObserver.disconnect() to disconnect the IntersectionObserver instance.
- Use the useRef() hook to create two refs. One will hold the `<img>` element and the other the IntersectionObserver instance, if necessary.
- Finally, render the `<img>` element with the given attributes. Apply loading='lazy' to make it load lazily, if necessary. Use isLoaded to determine the value of the src attribute.

#### LazyLoadingImage.tsx

```tsx | pure
import React, { useRef, useState, useCallback, useEffect } from 'react';
export interface LazyLoadingImageProps {
  className: string;
  alt: string;
  src: string;
  loadInitially: boolean;
  observerOptions: Record<string, null | string | unknown>;
}
const LazyLoadingImage = (props: Partial<LazyLoadingImageProps>) => {
  const {
    alt,
    src,
    className,
    loadInitially = false,
    observerOptions = { root: null, rootMargin: '200px 0px' },
    ...rest
  } = props;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
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
    observerRef.current.observe(imgRef.current as HTMLImageElement);
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
```

#### LazyLoadingImage.jsx

```jsx | pure
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
```

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
