| title                     | tags                   | firstSeen | lastUpdated |
| ------------------------- | ---------------------- | --------- | ----------- |
| Show/hide password toggle | components,input,state | 2022/7/28 | 2022/7/28   |

Renders a password input field with a reveal button.

- Use the useState() hook to create the shown state variable and set its value to false.
- When the `span` is clicked, execute setShown, toggling the type of the `<input>` between 'text' and 'password'.

#### PasswordRevealer.less

```less
@baseSelector: ant-;

.@{baseSelector}password {
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  display: inline-flex;
  padding: 4px 11px;
  &-suffix {
    margin-left: 4px;
    display: flex;
    flex: none;
    align-items: center;
    cursor: pointer;
    &-icon {
      &:hover {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
  &-input {
    box-sizing: border-box;
    margin: 0;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    outline: none;
    line-height: 1.5715;
    background-color: #fff;
    background-image: none;
    border: none;
    border-radius: 2px;
    transition: all 0.3s;
  }
  &.is-focused {
    border-color: #40a9ff;
  }
}
```

#### PasswordRevealer.tsx

```tsx | pure
import React, { useState } from 'react';
import type { SyntheticEvent } from 'react';
import './passwordRevealer.less';

export interface PasswordRevealerProps extends Record<string, any> {
  value: string;
  onChange(v: string): void;
  placeholder: string;
}

const Eye = () => (
  <svg
    viewBox="64 64 896 896"
    className="ant-password-suffix-icon"
    data-icon="eye"
    width="1em"
    height="1em"
    fill="currentColor"
  >
    <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
  </svg>
);
const EyeClose = () => (
  <svg
    viewBox="64 64 896 896"
    data-icon="eye-invisible"
    className="ant-password-suffix-icon"
    width="1em"
    height="1em"
    fill="currentColor"
  >
    <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
    <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
  </svg>
);

const PasswordRevealer = (props: Partial<PasswordRevealerProps>) => {
  const {
    value,
    onChange,
    placeholder = 'Please Input the password',
    ...rest
  } = props;
  const [isShown, setIsShown] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const onChangeHandler = (e: SyntheticEvent) => {
    const v = (e.target as HTMLInputElement).value;
    if (onChange) {
      onChange(v);
    }
  };
  return (
    <span className={`ant-password${isFocus ? ' is-focused' : ''}`} {...rest}>
      <input
        type={isShown ? 'text' : 'password'}
        className="ant-password-input"
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <span
        className="ant-password-suffix"
        onClick={() => setIsShown(!isShown)}
      >
        {isShown ? <Eye /> : <EyeClose />}
      </span>
    </span>
  );
};

export default PasswordRevealer;
```

#### PasswordRevealer.jsx

```jsx | pure
import React, { useState } from 'react';
import '../passwordRevealer.less';

const Eye = () => (
  <svg
    viewBox="64 64 896 896"
    className="ant-password-suffix-icon"
    data-icon="eye"
    width="1em"
    height="1em"
    fill="currentColor"
  >
    <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
  </svg>
);
const EyeClose = () => (
  <svg
    viewBox="64 64 896 896"
    data-icon="eye-invisible"
    className="ant-password-suffix-icon"
    width="1em"
    height="1em"
    fill="currentColor"
  >
    <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
    <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
  </svg>
);

const PasswordRevealer = (props) => {
  const {
    value,
    onChange,
    placeholder = 'Please Input the password',
    ...rest
  } = props;
  const [isShown, setIsShown] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const onChangeHandler = (e) => {
    const v = e.target.value;
    onChange?.(v);
  };
  return (
    <span className={`ant-password${isFocus ? ' is-focused' : ''}`} {...rest}>
      <input
        type={isShown ? 'text' : 'password'}
        className="ant-password-input"
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <span
        className="ant-password-suffix"
        onClick={() => setIsShown(!isShown)}
      >
        {isShown ? <Eye /> : <EyeClose />}
      </span>
    </span>
  );
};

export default PasswordRevealer;
```

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
