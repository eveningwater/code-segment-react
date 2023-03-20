import React, { useState } from 'react';
import '../tooltip.less';

const getVisible = (v) => {
  if (v) {
    return 'visible';
  }
  return '';
};
const Tooltip = (props) => {
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
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
