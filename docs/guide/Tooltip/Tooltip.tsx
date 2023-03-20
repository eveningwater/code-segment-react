import React, { useState, ReactNode } from 'react';
import './tooltip.less';

export interface TooltipProps extends Record<string, any> {
  children: ReactNode;
  text: ReactNode;
}

const getVisible = (v: boolean) => {
  if (v) {
    return 'visible';
  }
  return '';
};
const Tooltip = (props: Partial<TooltipProps>) => {
  const { text, children, ...rest } = props;
  const [show, setShow] = useState(false);
  return (
    <div className="ew-tooltip">
      <div className={['ew-tooltip-box', getVisible(show)].join(' ')}>
        {text}
        <span className="ew-tooltip-arrow"></span>
      </div>
      <div
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="ew-tooltip-hover"
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
