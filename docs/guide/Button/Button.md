| title  | tags                    | firstSeen | lastUpdated |
| ------ | ----------------------- | --------- | ----------- |
| Button | components,state,effect | 2022/7/29 | 2022/7/30   |

Renders a button that animates a ripple effect when clicked.

- Use the useState() hook to create the coords and isRippling state variables. These are used for the pointer's coordinates and the animation state of the button respectively.
- Use a useEffect() hook to change the value of isRippling every time the coords state variable changes, starting the animation.
- Use setTimeout() in the previous hook to clear the animation after it's done playing.
- Use a useEffect() hook to reset coords whenever the isRippling state variable is false.
- Handle the onClick event by updating the coords state variable and calling the passed callback.

```less
@prefix: ew-;

.@{prefix}btn {
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.85);
  border-color: #d9d9d9;
  background: #fff;
  outline: none;
  &.@{prefix}btn-large {
    height: 40px;
    padding: 6.4px 15px;
    font-size: 16px;
    border-radius: 2px;
  }
  &.@{prefix}btn-small {
    height: 24px;
    padding: 0 7px;
    font-size: 14px;
    border-radius: 2px;
  }
  &.@{prefix}btn-danger {
    color: #ff4d4f;
    border-color: #ff4d4f;
    background: #fff;

    &:hover,
    &:active {
      color: #ff7875;
      border-color: #ff7875;
    }
  }

  &[disabled],
  &[disabled]:hover,
  &[disabled]:active {
    color: rgba(0, 0, 0, 0.25);
    border-color: #d9d9d9;
    background: #f5f5f5;
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
  }

  &.@{prefix}btn-block {
    width: percentage(1);
  }

  &:hover,
  &:active {
    color: #40a9ff;
    border-color: #40a9ff;
  }

  &-link {
    text-decoration: none;
    border-color: transparent;
    background: 0 0;
    box-shadow: none;
    color: #1890ff;

    &:hover,
    &:active {
      border-color: transparent;
      background: 0 0;
      color: #40a9ff;
    }

    &.@{prefix}btn-danger {
      color: #ff4d4f;
      border-color: transparent;
      background: transparent;

      &:hover {
        color: #ff7875;
        border-color: transparent;
        background: transparent;
      }
    }
  }

  &-primary {
    color: #fff;
    border-color: #1890ff;
    background: #1890ff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px rgba(0, 0, 0, 0.05);

    &.@{prefix}btn-danger {
      color: #fff;
      border-color: #ff4d4f;
      background: #ff4d4f;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px rgba(0, 0, 0, 0.04);

      &:hover {
        color: #fff;
        border-color: #ff7875;
        background: #ff7875;
      }
    }

    &[disabled],
    &[disabled]:hover,
    &[disabled]:active {
      color: rgba(0, 0, 0, 0.25);
      border-color: #d9d9d9;
      background: #f5f5f5;
      text-shadow: none;
      box-shadow: none;
    }

    &:hover {
      border-color: #40a9ff;
      background: #40a9ff;
      color: #fff;
    }

    &:active {
      border-color: #096dd9;
      background: #096dd9;
      color: #fff;
    }
  }

  &-dashed {
    color: rgba(0, 0, 0, 0.85);
    border-color: #d9d9d9;
    background: #fff;
    border-style: dashed;

    &:hover {
      border-color: #40a9ff;
      color: #40a9ff;
      background: #fff;
    }

    &:active {
      border-color: #096dd9;
      color: #096dd9;
      background: #fff;
    }
  }

  &-text {
    color: rgba(0, 0, 0, 0.85);
    border-color: transparent;
    background: 0 0;
    box-shadow: none;

    &.@{prefix}btn-danger {
      color: #ff4d4f;
      border-color: transparent;
      background: transparent;

      &:hover {
        color: #ff7875;
        border-color: transparent;
        background: rgba(0, 0, 0, 0.018);
      }
    }

    &:hover {
      border-color: transparent;
      color: rgba(0, 0, 0, 0.85);
      background: rgba(0, 0, 0, 0.018);
    }

    &:active {
      border-color: transparent;
      color: rgba(0, 0, 0, 0.85);
      background: rgba(0, 0, 0, 0.028);
    }

    &[disabled],
    &[disabled]:hover,
    &[disabled]:active {
      color: rgba(0, 0, 0, 0.25);
      border-color: transparent;
      background: 0 0;
      text-shadow: none;
      box-shadow: none;
    }
  }

  &-ripple {
    overflow: hidden;

    .ripple {
      width: 10px;
      height: 10px;
      position: absolute;
      background: #dfdfdf;
      display: block;
      content: '';
      border-radius: 50%;
      opacity: 1;
      animation: 0.8s ease 1 forwards ripple-effect;
    }

    &-content {
      position: relative;
      z-index: 2;
    }
  }

  @keyframes ripple-effect {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(6);
      opacity: 0.375;
    }

    100% {
      transform: scale(12);
      opacity: 0;
    }
  }
}
```

```tsx | pure
import React, { useState, useEffect } from 'react';
import type { SyntheticEvent, ReactNode } from 'react';
import './button.less';
import classnames from './classnames';
import Loader from '../Loader/Loader';
export interface ButtonProps extends Record<string, any> {
  ripple: boolean;
  block: boolean;
  danger: boolean;
  disabled: boolean;
  type: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  size: 'large' | 'default' | 'small';
  loading: boolean;
  target: string;
  href: string;
  shape: 'default' | 'circle' | 'round';
  nativeType: 'submit' | 'reset' | 'button';
  children: ReactNode;
  icon: ReactNode;
  onClick(e: SyntheticEvent): void;
}

const Button = (props: Partial<ButtonProps>) => {
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

  const onClickHandler = (e: SyntheticEvent) => {
    if (ripple) {
      const event = e.nativeEvent as MouseEvent;
      const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
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
```

Demo:

<code src="./Demo.tsx"></code>
