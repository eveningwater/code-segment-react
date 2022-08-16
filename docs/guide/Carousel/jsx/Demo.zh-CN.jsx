import React from 'react';
import Carousel from './Carousel';

const { CarouselItem } = Carousel;

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
