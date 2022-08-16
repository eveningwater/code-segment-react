| 标题   | 标签                    | 首次添加时间 | 更新时间  |
| ------ | ----------------------- | ------------ | --------- |
| 轮播图 | 组件,子节点,状态,副作用 | 2022/7/13    | 2022/7/13 |

渲染轮播组件。

- 使用 useState() 钩子创建活动状态变量并将其值设为 0（第一项的索引）。
- 使用 useEffect() 挂钩将 active 的值更新为下一项的索引，使用 setTimeout()。
- 计算每个轮播项目的类名，同时映射它们并相应地应用它。
- 使用 React.cloneElement() 渲染轮播项目，并将 ...rest 与计算的 className 一起传递。

tsx:

```tsx | pure
import React, { useState, useEffect, cloneElement } from 'react';
import type { ReactNode } from 'react';
import './Carousel.less';

interface CarouselItemProps {
  children: ReactNode;
  className: string | Record<string, string | number>;
}

interface CarouselProps {
  options: ReactNode[];
  duration: number;
  children: JSX.Element[];
  defaultKey: string;
}

const CarouselItem = (props: Partial<CarouselItemProps>) => {
  const { children } = props;
  return <div className="carousel-item">{children}</div>;
};

const Carousel = (props: Partial<CarouselProps>) => {
  const { options, duration, children, defaultKey, ...rest } = props;
  const [active, setActive] = useState(Number(defaultKey || 1) - 1);
  let timer: number | undefined;
  const width = window.innerWidth;
  const items =
    Array.isArray(options) && options.length
      ? options
      : children?.filter((item) => item?.type?.name === 'CarouselItem') || [];
  useEffect(() => {
    timer = setTimeout(() => {
      setActive((active + 1) % items?.length);
    }, duration || 2000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="carousel">
      <div
        className="carousel-slide"
        style={{
          width: items.length * width,
          transform: `translate3d(-${active * 200}px, 0px, 0px)`,
        }}
      >
        {items?.map((item) => {
          return cloneElement(<CarouselItem key={item}>{item}</CarouselItem>, {
            ...rest,
          });
        })}
      </div>
    </div>
  );
};

Carousel.CarouselItem = CarouselItem;

export default Carousel;
```

jsx:

```jsx | pure
import React, { useState, useEffect, cloneElement } from 'react';
import '../Carousel.less';

const CarouselItem = (props) => {
  const { children } = props;
  return <div className="carousel-item">{children}</div>;
};

const Carousel = (props) => {
  const { options, duration, children, defaultKey, ...rest } = props;
  const [active, setActive] = useState(Number(defaultKey || 1) - 1);
  let timer;
  const width = window.innerWidth;
  const items =
    Array.isArray(options) && options.length
      ? options
      : children?.filter((item) => item?.type?.name === 'CarouselItem') || [];
  useEffect(() => {
    timer = setTimeout(() => {
      setActive((active + 1) % items?.length);
    }, duration || 2000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="carousel">
      <div
        className="carousel-slide"
        style={{
          width: items.length * width,
          transform: `translate3d(-${active * 200}px, 0px, 0px)`,
        }}
      >
        {items?.map((item) => {
          return cloneElement(<CarouselItem key={item}>{item}</CarouselItem>, {
            ...rest,
          });
        })}
      </div>
    </div>
  );
};

Carousel.CarouselItem = CarouselItem;

export default Carousel;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
