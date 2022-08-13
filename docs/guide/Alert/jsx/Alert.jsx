import React, { useState, useEffect } from 'react';
import '../alert.less';

const Alert = (props) => {
  const {
    isDefaultShown,
    timeout = 250,
    type,
    message,
    showClose,
    block,
  } = props;
  const [isShown, setIsShown] = useState(isDefaultShown);
  const [isLeaving, setIsLeaving] = useState(false);

  let timer = null;
  useEffect(() => {
    setIsShown(true);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeout, timer, isDefaultShown]);

  const closeAlert = () => {
    setIsLeaving(true);
    timer = setTimeout(() => {
      setIsLeaving(false);
      setIsShown(false);
    }, timeout);
  };

  return isShown ? (
    <div
      className={`alert ${'alert-' + type}${isLeaving ? ' leaving' : ''}${
        block ? ' alert-block' : ''
      }`}
      role="alert"
    >
      <button
        className="alert-close"
        onClick={closeAlert}
        style={{ display: showClose ? 'block' : 'none' }}
      >
        &times;
      </button>
      {message}
    </div>
  ) : null;
};

export default Alert;
