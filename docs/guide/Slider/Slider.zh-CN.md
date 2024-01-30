---
title: 滑块组件
nav: 指南
---

| 标题     | 标签        | 首次添加时间 | 上次更新时间 |
| -------- | ----------- | ------------ | ------------ |
| 滑块组件 | 组件,输入框 | 2023/3/21    | 2023/3/22    |

呈现一个不受控制的范围输入元素，该元素使用回调函数将其值传递给父组件。

- 将 `<input>` 元素的类型设置为“范围”以创建滑块。
- 使用从父级传下来的默认值作为非受控输入字段的初始值。
- 使用 onChange 事件触发 onValueChange 回调并将新值发送给父级。

#### Slider.tsx

```tsx | pure
import React, {
  useState,
  SyntheticEvent,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import styled from '@emotion/styled';
import { scale } from '../../utils/scale';
import { getElementStyle } from '../../utils/getElementStyle';

const StyleSlider = styled.div`
  position: relative;
`;
const StyleSliderInput = styled.input`
  min-width: 330px;
  width: 100%;
  display: block;
  margin: 18px 0;
  -webkit-appearance: none;
  ::-webkit-slider-runnable-track {
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    height: 13px;
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
  }
  ::-webkit-slider-thumb {
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
    width: 25px;
    height: 25px;
    -webkit-appearance: none;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-top: -6px;
  }
  ::-moz-range-track {
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    height: 13px;
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
  }
  ::-moz-range-thumb {
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
    width: 25px;
    height: 25px;
    -webkit-appearance: none;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-top: -6px;
  }
  :-ms-range-track {
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    height: 13px;
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
  }
  :-ms-thumb {
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
    width: 25px;
    height: 25px;
    -webkit-appearance: none;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-top: -6px;
  }
`;
const StyleSliderLabel = styled.label`
  position: absolute;
  text-align: center;
  border-radius: 6px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 5px 0;
  width: 80px;
  top: -45px;
  color: #fff;
  background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
`;
export interface SliderProps extends Record<string, any> {
  min: number;
  max: number;
  defaultValue: string;
  onChange: (v: string) => void;
}

const Slider = (props: Partial<SliderProps>) => {
  const { min = 0, max = 100, defaultValue = 50, onChange, ...rest } = props;
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [left, setLeft] = useState<number>(+defaultValue);
  const [value, setValue] = useState(defaultValue);
  const computedLeft = useCallback(
    (
      input: HTMLInputElement | null,
      label: HTMLLabelElement | null,
    ): number => {
      if (!input || !label) {
        return 0;
      }
      const numValue = +input.value;
      const rangeWidth = getElementStyle(input, 'width'),
        labelWidth = getElementStyle(label, 'width');
      const numWidth = +rangeWidth.slice(0, -2),
        numLabelWidth = +labelWidth.slice(0, -2);
      const min = +input.min,
        max = +input.max;
      const left =
        numValue * (numWidth / max) -
        numLabelWidth / 2 +
        scale(numValue, min, max, 10, -10);
      return left;
    },
    [],
  );
  const onInputHandler = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const label = labelRef.current;
    setLeft(computedLeft(target, label));
    setValue(target.value);
  };
  useEffect(() => {
    if (
      inputRef.current instanceof HTMLInputElement &&
      labelRef.current instanceof HTMLLabelElement
    ) {
      setLeft(computedLeft(inputRef.current, labelRef.current));
    }
  }, []);
  return (
    <StyleSlider>
      <StyleSliderInput
        type="range"
        min={min}
        max={max}
        ref={inputRef}
        {...rest}
        onChange={() => onChange?.(`${value}`)}
        onInput={onInputHandler}
        value={value}
      />
      <StyleSliderLabel ref={labelRef} style={{ left: left + 'px' }}>
        {value}
      </StyleSliderLabel>
    </StyleSlider>
  );
};

export default Slider;
```

#### Slider.jsx

```jsx | pure
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { scale } from '../../../utils/scale';
import { getElementStyle } from '../../../utils/getElementStyle';

const StyleSlider = styled.div`
  position: relative;
`;
const StyleSliderInput = styled.input`
  min-width: 330px;
  width: 100%;
  display: block;
  margin: 18px 0;
  -webkit-appearance: none;
  ::-webkit-slider-runnable-track {
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    height: 13px;
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
  }
  ::-webkit-slider-thumb {
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
    width: 25px;
    height: 25px;
    -webkit-appearance: none;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-top: -6px;
  }
  ::-moz-range-track {
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    height: 13px;
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
  }
  ::-moz-range-thumb {
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
    width: 25px;
    height: 25px;
    -webkit-appearance: none;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-top: -6px;
  }
  :-ms-range-track {
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    height: 13px;
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
  }
  :-ms-thumb {
    background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
    width: 25px;
    height: 25px;
    -webkit-appearance: none;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-top: -6px;
  }
`;
const StyleSliderLabel = styled.label`
  position: absolute;
  text-align: center;
  border-radius: 6px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 5px 0;
  width: 80px;
  top: -45px;
  color: #fff;
  background: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
`;

const Slider = (props) => {
  const { min = 0, max = 100, defaultValue = 50, onChange, ...rest } = props;
  const labelRef = useRef(null);
  const inputRef = useRef(null);
  const [left, setLeft] = useState(+defaultValue);
  const [value, setValue] = useState(defaultValue);
  const computedLeft = useCallback((input, label) => {
    if (!input || !label) {
      return 0;
    }
    const numValue = +input.value;
    const rangeWidth = getElementStyle(input, 'width'),
      labelWidth = getElementStyle(label, 'width');
    const numWidth = +rangeWidth.slice(0, -2),
      numLabelWidth = +labelWidth.slice(0, -2);
    const min = +input.min,
      max = +input.max;
    const left =
      numValue * (numWidth / max) -
      numLabelWidth / 2 +
      scale(numValue, min, max, 10, -10);
    return left;
  }, []);
  const onInputHandler = (e) => {
    const target = e.target;
    const label = labelRef.current;
    setLeft(computedLeft(target, label));
    setValue(target.value);
  };
  useEffect(() => {
    if (
      inputRef.current instanceof HTMLInputElement &&
      labelRef.current instanceof HTMLLabelElement
    ) {
      setLeft(computedLeft(inputRef.current, labelRef.current));
    }
  }, []);
  return (
    <StyleSlider>
      <StyleSliderInput
        type="range"
        min={min}
        max={max}
        ref={inputRef}
        {...rest}
        onChange={() => onChange?.(`${value}`)}
        onInput={onInputHandler}
        value={value}
      />
      <StyleSliderLabel ref={labelRef} style={{ left: left + 'px' }}>
        {value}
      </StyleSliderLabel>
    </StyleSlider>
  );
};

export default Slider;
```

示例:

<code src="./Demo.zh-CN.tsx" id="sliderTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="sliderJsxDemoZH"></code>
