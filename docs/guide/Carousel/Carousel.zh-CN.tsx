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
          return cloneElement(item, {
            ...rest,
          });
        })}
      </div>
    </div>
  );
};

const Demo = () => {
  return (
    <Carousel defaultKey="2">
      <CarouselItem key="1">轮播图1</CarouselItem>
      <CarouselItem key="2">轮播图 2</CarouselItem>
      <CarouselItem key="3">轮播图 3</CarouselItem>
    </Carousel>
  );
};

export default Demo;
