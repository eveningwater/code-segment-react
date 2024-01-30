---
title: 懒加载图片组件
nav: 指南
---

| 标题       | 标签             | 首次添加时间 | 更新时间  |
| ---------- | ---------------- | ------------ | --------- |
| 懒加载图片 | 组件,副作用,状态 | 2022/7/20    | 2022/7/20 |

渲染支持延迟加载的图像。

- 使用 useState() 挂钩创建一个有状态值，指示图像是否已加载。
- 使用 useEffect() 钩子检查 HTMLImageElement.prototype 是否包含“正在加载”，有效地检查本机是否支持延迟加载。如果没有，创建一个新的 IntersectionObserver 并使用 IntersectionObserver.observer() 来观察 `<img>` 元素。组件卸载时使用钩子的返回值进行清理。
- 使用 useCallback() 挂钩来记忆 IntersectionObserver 的回调函数。此回调将更新 isLoaded 状态变量并使用 IntersectionObserver.disconnect() 断开 IntersectionObserver 实例。
- 使用 useRef() 钩子创建两个 refs。如有必要，一个将持有`<img>` 元素，另一个持有 IntersectionObserver 实例。
- 最后，使用给定的属性渲染 `<img>` 元素。如有必要，应用 loading='lazy' 使其延迟加载。使用 isLoaded 来确定 src 属性的值。

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

示例:

<code src="./Demo.zh-CN.tsx" id="lazyLoadingImageTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="lazyLoadingImageJsxDemoZH"></code>
