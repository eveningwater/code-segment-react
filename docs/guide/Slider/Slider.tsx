import React from 'react';
import './slider.less';
import classnames from '../../utils/classnames';

export interface SliderProps extends Record<string, any> {
  direction: 'horizontal' | 'vertical';
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  value: number;
}

const Slider = (props: Partial<SliderProps>) => {
  const { direction = 'horizontal' } = props;

  const prefixClasses = {
    'ew-slider': true,
    [`ew-slider-${direction}`]: direction,
  };

  return (
    <div className={classnames(prefixClasses)}>
      <div className="ew-slider-rail"></div>
      <div className="ew-slider-track"></div>
      <div className="ew-slider-step"></div>
      <div className="ew-slider-handle"></div>
    </div>
  );
};

export default Slider;
