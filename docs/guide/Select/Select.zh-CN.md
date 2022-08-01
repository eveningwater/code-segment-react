| 标题       | 标签              | 首次添加时间 | 更新时间  |
| ---------- | ----------------- | ------------ | --------- |
| 选择器组件 | 组件,状态，选择器 | 2022/7/31    | 2022/7/31 |

渲染一个不受控制的 `<select>` 元素，该元素使用回调函数将其值传递给父组件。

- 使用 selectedValue 属性作为 `<select>` 元素的默认值来设置它的初始值。
- 使用 onChange 事件触发 onValueChange 回调并将新值发送给父级。
- 在 values 数组上使用 Array.prototype.map() 为每个传递的值创建一个 `<option>` 元素。
- values 中的每个项目都必须是一个 2 元素数组，其中第一个元素是项目的值，第二个元素是它的显示文本。

useClickOutside:

```ts
import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

const useClickOutside = (ref: MutableRefObject<any>, callback: Function) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
};

export default useClickOutside;
```

```less
@prefix: ew-;

.@{prefix}select {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  cursor: pointer;
  border-radius: 4px;
  min-width: 120px;

  &-disabled {
    .@{prefix}select-selector {
      background: #f5f5f5;
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.25);
    }

    .@{prefix}select-arrow {
      cursor: not-allowed;
    }
  }

  &:not(.@{prefix}select-disabled):hover &-selector,
  &:not(.@{prefix}select-disabled):active &-selector {
    border-color: #2396ef;
  }

  &-selector {
    position: relative;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: flex;
    width: 100%;
    height: 32px;
    padding: 0 11px;

    &-value {
      padding-right: 18px;
      line-height: 30px;
    }
  }

  &:not(.@{prefix}select-disabled):hover &-value {
    border-color: #2396ef;
    border-right-width: 1px;
  }

  &-arrow {
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    top: 50%;
    right: 11px;
    display: flex;
    align-items: center;
    margin-top: -6px;
    font-size: 12px;
    line-height: 1;
    text-align: center;

    &-icon,
    .@{prefix}select-clear-icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      color: rgba(0, 0, 0, 0.25);
    }
  }

  .@{prefix}select-clear-icon {
    position: relative;
    top: -2px;
  }

  &-dropdown {
    margin: 0;
    color: rgba(0, 0, 0.85);
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum';
    position: absolute;
    z-index: 1050;
    box-sizing: border-box;
    padding: 4px 0;
    overflow: hidden;
    font-size: 14px;
    font-variant: initial;
    background-color: #fff;
    border-radius: 2px;
    outline: none;
    width: 100%;
    top: 40px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;

    &-option {
      position: relative;
      display: flex;
      min-height: 32px;
      padding: 5px 12px;
      color: rgba(0, 0, 0.85);
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      transition: background 0.3s ease;
      flex: auto;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &-disabled {
        color: rgba(0, 0, 0, 0.25);
        cursor: not-allowed;
      }

      &:not(:last-of-type) {
        margin-bottom: 8px;
      }

      &:not(&-disabled):hover {
        background-color: #f5f5f5;
      }

      &:not(&-disabled).active {
        background-color: #e6f7ff;
      }
    }
  }
}
```

Option:

```tsx | pure
import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import classnames from '../../utils/classnames';
export interface OptionValueProps {
  label: string;
  value: string;
}
export interface OptionProps extends Record<string, any>, OptionValueProps {
  disabled: boolean;
  children: ReactNode;
  defaultValue: string;
  onOptionChange(v: Partial<OptionValueProps>): void;
  active: boolean;
}
const Option = (props: Partial<OptionProps>) => {
  const {
    label,
    value,
    disabled,
    defaultValue,
    children,
    onOptionChange,
    active,
    ...rest
  } = props;
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    defaultValue,
  );

  const classNames = {
    'ew-select-dropdown-option': true,
    'ew-select-dropdown-option-disabled': disabled,
    active: active,
  };
  const onChangeHandler = (options: Partial<OptionValueProps>) => {
    if (disabled) {
      return;
    }

    setCurrentValue(options.value);
    if (onOptionChange) {
      onOptionChange(options);
    }
  };

  useEffect(() => {
    if (currentValue) {
      if (onOptionChange) {
        onOptionChange({ label, value });
      }
    }
  }, [currentValue]);
  return (
    <div
      className={classnames(classNames)}
      data-value={currentValue}
      {...rest}
      onClick={() => onChangeHandler({ label, value })}
    >
      {children ? children : label ? label : ''}
    </div>
  );
};
export default Option;
```

Select:

```tsx | pure
import React, {
  useState,
  useEffect,
  cloneElement,
  createRef,
  forwardRef,
} from 'react';
import type { OptionValueProps } from './Option';
import classnames from '../../utils/classnames';
import useClickOutside from '../../utils/useClickOutside';
import Option from './Option';
import './select.less';

export interface SelectProps extends Record<string, any> {
  disabled: boolean;
  defaultValue: string;
  value: string;
  onChange(v: Partial<OptionValueProps>): void;
  placeholder: string;
  children: JSX.Element[] | JSX.Element;
  allowClear: boolean;
  labelProps: string;
}
const ClearIcon = forwardRef(
  (props: Partial<Record<string, any>>, ref: any) => {
    const { onClick, ...rest } = props;
    return (
      <svg
        className="ew-select-clear-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2381"
        ref={ref}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
        {...rest}
      >
        <path
          d="M512 39.384615C250.092308 39.384615 39.384615 250.092308 39.384615 512s210.707692 472.615385 472.615385 472.615385 472.615385-210.707692 472.615385-472.615385S773.907692 39.384615 512 39.384615z m96.492308 488.369231l153.6 153.6c7.876923 7.876923 7.876923 19.692308 0 27.569231l-55.138462 55.138461c-7.876923 7.876923-19.692308 7.876923-27.569231 0L525.784615 610.461538c-7.876923-7.876923-19.692308-7.876923-27.56923 0l-153.6 153.6c-7.876923 7.876923-19.692308 7.876923-27.569231 0L261.907692 708.923077c-7.876923-7.876923-7.876923-19.692308 0-27.569231l153.6-153.6c7.876923-7.876923 7.876923-19.692308 0-27.569231l-155.56923-155.56923c-7.876923-7.876923-7.876923-19.692308 0-27.569231l55.138461-55.138462c7.876923-7.876923 19.692308-7.876923 27.569231 0l155.569231 155.569231c7.876923 7.876923 19.692308 7.876923 27.56923 0l153.6-153.6c7.876923-7.876923 19.692308-7.876923 27.569231 0l55.138462 55.138462c7.876923 7.876923 7.876923 19.692308 0 27.56923l-153.6 153.6c-5.907692 7.876923-5.907692 19.692308 0 27.569231z"
          p-id="2382"
          fill="#dbdbdb"
          className="ew-select-clear-icon-path"
        ></path>
      </svg>
    );
  },
);
const ArrowIcon = () => (
  <svg
    className="ew-select-arrow-icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2216"
  >
    <path
      d="M512 714.666667c-8.533333 0-17.066667-2.133333-23.466667-8.533334l-341.333333-341.333333c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.866667 317.866667-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333333 704c-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z"
      p-id="2217"
    ></path>
  </svg>
);
const Select = (
  props: Partial<Omit<SelectProps, 'children'>> & Pick<SelectProps, 'children'>,
) => {
  const {
    disabled,
    defaultValue,
    value,
    onChange,
    placeholder = '请输入',
    allowClear = true,
    children,
    labelProps = 'label',
    ...rest
  } = props;
  const dropdownRef = createRef<HTMLDivElement>();
  const clearIconRef = createRef<HTMLOrSVGElement>();
  const [selectValue, setSelectValue] = useState<string | undefined>(
    defaultValue,
  );
  const [option, setOption] = useState<Partial<OptionValueProps>>({});
  const [visible, setVisible] = useState(false);
  const [showClear, setShowClear] = useState(false);

  const optionChildren = Array.isArray(children)
    ? children
    : [children]?.filter((item) => item?.type?.name === 'Option') || [];

  useEffect(() => {
    if (typeof value === 'string') {
      setSelectValue(value);
    }
  }, [value]);

  const onChangeHandler = (v: Partial<OptionValueProps>) => {
    setOption(v);
    setSelectValue(v.value);
    if (!disabled) {
      setVisible(false);
      setShowClear(false);
    }
    if (onChange) {
      onChange(v);
    }
  };
  const onClearHandler = () => {
    if (disabled) {
      return;
    }
    setOption({ label: '', value: '' });
    setSelectValue('');
  };
  const selectClassNames = {
    'ew-select': true,
    'ew-select-disabled': disabled,
  };
  const valueClassNames = {
    'ew-select-selector': true,
    'ew-select-value-placeholder': !selectValue,
  };
  useClickOutside(dropdownRef, () => {
    if (!disabled) {
      setVisible(false);
    }
  });
  return (
    <div
      className={classnames(selectClassNames)}
      {...rest}
      ref={dropdownRef}
      onMouseEnter={() => {
        if (!disabled) {
          setShowClear(true);
        }
      }}
      onMouseLeave={() => {
        if (!disabled) {
          setShowClear(false);
        }
      }}
    >
      <div
        className={classnames(valueClassNames)}
        placeholder={placeholder}
        onClick={() => {
          if (!disabled) {
            setVisible(!visible);
          }
        }}
      >
        <span className="ew-select-selector-value">{option[labelProps]}</span>
      </div>
      <div className="ew-select-arrow">
        {allowClear && selectValue && showClear ? (
          <ClearIcon onClick={onClearHandler} ref={clearIconRef} />
        ) : (
          <ArrowIcon />
        )}
      </div>
      <div
        className="ew-select-dropdown"
        style={{ display: visible ? 'block' : 'none' }}
      >
        {optionChildren.map((item, index) =>
          cloneElement(item, {
            onOptionChange: onChangeHandler,
            defaultValue: selectValue,
            key: item.key || String(index + 1),
            active: item.props.value === selectValue,
          }),
        )}
      </div>
    </div>
  );
};
Select.Option = Option;
export default Select;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>
