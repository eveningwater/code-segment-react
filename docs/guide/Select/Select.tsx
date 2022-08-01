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
const ArrowIcon = forwardRef(
  (props: Partial<Record<string, any>>, ref: any) => (
    <svg
      className="ew-select-arrow-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2216"
      ref={ref}
      {...props}
    >
      <path
        d="M512 714.666667c-8.533333 0-17.066667-2.133333-23.466667-8.533334l-341.333333-341.333333c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.866667 317.866667-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333333 704c-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z"
        p-id="2217"
      ></path>
    </svg>
  ),
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
          <ArrowIcon
            onClick={() => {
              if (!disabled) {
                setVisible(!visible);
              }
            }}
          />
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
