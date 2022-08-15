import React, { useState, useEffect } from 'react';
import '../button.less';
import classnames from '../../../utils/classnames';
import Loader from '../../Loader/Loader';
const Button = (props) => {
  const {
    type,
    block,
    ripple,
    nativeType = 'button',
    disabled,
    children,
    href,
    shape,
    target,
    danger,
    loading,
    icon,
    size,
    onClick,
    ...rest
  } = props;

  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else {
      setIsRippling(false);
    }
  }, [coords]);

  useEffect(() => {
    if (!isRippling) {
      setCoords({ x: -1, y: -1 });
    }
  }, [isRippling]);

  const classNames = {
    'ew-btn': true,
    [`ew-btn-${type}`]: !href,
    'ew-btn-ripple': ripple,
    'ew-btn-link': type === 'link',
    'ew-btn-block': block,
    'ew-btn-disabled': disabled,
    [`ew-btn-${shape}`]: !href,
    'ew-btn-danger': danger,
    [`ew-btn-${size}`]: size,
  };
  const classContentNames = {
    'ew-btn-content': true,
    'ew-btn-ripple-content': ripple,
  };

  const onClickHandler = (e) => {
    if (ripple) {
      const event = e.nativeEvent;
      const rect = e.target.getBoundingClientRect();
      setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      {href ? (
        <a
          href={href}
          className={classnames(classNames)}
          target={target}
          onClick={onClickHandler}
          {...rest}
        >
          <span className={classnames(classContentNames)}>
            {icon}
            {loading ? <Loader size={24} /> : children}
          </span>
        </a>
      ) : (
        <button
          type={nativeType}
          disabled={disabled}
          className={classnames(classNames)}
          onClick={onClickHandler}
          {...rest}
        >
          {isRippling && ripple ? (
            <span
              className="ripple"
              style={{ left: coords.x, top: coords.y }}
            ></span>
          ) : null}
          <span className={classnames(classContentNames)}>
            {icon}
            {loading ? <Loader size={24} /> : children}
          </span>
        </button>
      )}
    </>
  );
};

export default Button;
