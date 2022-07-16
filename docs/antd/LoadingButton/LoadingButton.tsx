import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import React, { useState } from 'react';
import type { MouseEventHandler } from 'react';

interface LoadingButtonProps extends Omit<ButtonProps, 'loading'> {
  duration?: number;
  isUseDuration?: boolean;
}
const LoadingButton = (props: LoadingButtonProps) => {
  const { onClick, isUseDuration, duration, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const onClickHandler: MouseEventHandler<HTMLElement> = async (e) => {
    setLoading(true);
    if (onClick) {
      if (isUseDuration) {
        onClick(e);
        setTimeout(() => {
          setLoading(false);
        }, Math.min(10000, duration || 1000));
      } else {
        try {
          await onClick(e);
        } finally {
          setLoading(false);
        }
      }
    }
  };
  return <Button {...rest} onClick={onClickHandler} loading={loading}></Button>;
};

export default LoadingButton;
