import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import React, { useState } from 'react';
import type { MouseEventHandler } from 'react';

interface LoadingButtonProps extends Omit<ButtonProps, 'loading'> {
  duration?: number;
}
const LoadingButton = (props: LoadingButtonProps) => {
  const { onClick, duration, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const onClickHandler: MouseEventHandler<HTMLElement> = async (e) => {
    if (onClick) {
      setLoading(true);
      onClick(e);
      setTimeout(() => {
        setLoading(false);
      }, Math.min(10000, duration || 1000));
    }
  };
  return <Button {...rest} onClick={onClickHandler} loading={loading}></Button>;
};

export default LoadingButton;
