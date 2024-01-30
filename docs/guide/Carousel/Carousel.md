| title    | tags                             | firstSeen | lastUpdated |
| -------- | -------------------------------- | --------- | ----------- |
| Carousel | components,children,state,effect | 2022/7/13 | 2022/7/13   |

Renders a carousel component.

- Use the useState() hook to create the active state variable and give it a value of 0 (index of the first item).
- Use the useEffect() hook to update the value of active to the index of the next item, using setTimeout().
- Compute the className for each carousel item while mapping over them and applying it accordingly.
- Render the carousel items using React.cloneElement() and pass down ...rest along with the computed className.

#### Carousel.tsx

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
CarouselItem.displayName = 'CarouselItem';

const Carousel = (props: Partial<CarouselProps>) => {
  const { options, duration, children, defaultKey, ...rest } = props;
  const [active, setActive] = useState(Number(defaultKey || 1) - 1);
  let timer: number | undefined;
  const width = window.innerWidth;
  const items =
    Array.isArray(options) && options.length
      ? options
      : children?.filter(
          (item) => item?.type?.displayName === 'CarouselItem',
        ) || [];
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

#### Carousel.jsx

```jsx | pure
import React, { useState, useEffect, cloneElement } from 'react';
import '../Carousel.less';

const CarouselItem = (props) => {
  const { children } = props;
  return <div className="carousel-item">{children}</div>;
};
CarouselItem.displayName = 'CarouselItem';

const Carousel = (props) => {
  const { options, duration, children, defaultKey, ...rest } = props;
  const [active, setActive] = useState(Number(defaultKey || 1) - 1);
  let timer;
  const width = window.innerWidth;
  const items =
    Array.isArray(options) && options.length
      ? options
      : children?.filter(
          (item) => item?.type?.displayName === 'CarouselItem',
        ) || [];
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

demo:

<code src="./Demo.tsx" id="carouselTsxDemo"></code>

jsx demo:

<code src="./jsx/Demo.jsx" id="carouselJsxDemo"></code>
