---
title: 星级评分组件
nav: 指南
---

| 标题         | 标签                     | 首次添加时间 | 上次更新时间 |
| ------------ | ------------------------ | ------------ | ------------ |
| 星级评分组件 | 组件，子组件，输入，状态 | 2023/3/16    | 2023/3/16    |

呈现星级评分组件。

- 定义一个星形组件。 它根据父组件的状态，以适当的外观呈现每个单独的星星。
- 定义一个 StarRating 组件。 使用 useState() 挂钩来定义具有适当初始值的评级和选择状态变量。
- 创建一个方法 hoverOver，根据提供的事件更新选择，使用 \* 事件目标的 .data-star-id 属性，或者如果使用 null 参数调用将其重置为 0。
- 使用 Array.from() 创建一个包含 5 个元素的数组，使用 Array.prototype.map() 创建单独的 `<Star />` 组件。
- 使用 hoverOver 处理包装元素的 onMouseOver 和 onMouseLeave 事件。 使用 setRating 处理 onClick 事件。

#### starRating.less

```less
@prefix: ew-;
@starColor: #ff9933;
.@{prefix}star {
  color: @starColor;
  cursor: pointer;
}
```

#### StarRating.tsx

```tsx | pure
import React, { useState, SyntheticEvent } from 'react';
import './starRating.less';
export interface StarProps extends Record<string, any> {
  marked: boolean;
  starId: number;
}
export interface StarRatingProps extends Record<string, any> {
  value: string | number;
  totalStar: string | number;
}
const Star = (props: Partial<StarProps>) => {
  const { marked = false, starId } = props;
  return (
    <span role="button" data-star-id={starId} className="ew-star">
      {marked ? '\u2605' : '\u2606'}
    </span>
  );
};
const StarRating = (props: Partial<StarRatingProps>) => {
  const { value = '', totalStar = '' } = props;
  const [rating, setRating] = useState(parseInt('' + value) || 0);
  const [selection, setSelection] = useState(0);
  const total = parseInt('' + totalStar) || 5;
  const hoverOver = (e: SyntheticEvent | null) => {
    let val = 0;
    if (e && e.target) {
      const target = e.target as HTMLElement;
      const id = target.getAttribute('data-star-id');
      val = parseInt(id || '');
    }
    setSelection(val);
  };
  const onClickHandler = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    const id = target.getAttribute('data-star-id') || '';
    setRating(+id || rating);
  };
  return (
    <div
      onMouseOver={hoverOver}
      onMouseOut={() => hoverOver(null)}
      onClick={onClickHandler}
    >
      {Array.from({ length: total }).map((v, i: number) => (
        <Star
          starId={i + 1}
          key={`ew-star-${i + 1}`}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        ></Star>
      ))}
    </div>
  );
};
export default StarRating;
```

#### StarRating.jsx

```jsx | pure
import React, { useState } from 'react';
import '../starRating.less';
const Star = (props) => {
  const { marked = false, starId } = props;
  return (
    <span role="button" data-star-id={starId} className="ew-star">
      {marked ? '\u2605' : '\u2606'}
    </span>
  );
};
const StarRating = (props) => {
  const { value = '', totalStar = '' } = props;
  const [rating, setRating] = useState(parseInt(value) || 0);
  const [selection, setSelection] = useState(0);
  const total = parseInt('' + totalStar) || 5;
  const hoverOver = (e) => {
    let val = 0;
    if (e && e.target) {
      const target = e.target;
      const id = target.getAttribute('data-star-id');
      val = parseInt(id || '');
    }
    setSelection(val);
  };
  const onClickHandler = (e) => {
    const target = e.target;
    const id = target.getAttribute('data-star-id') || '';
    setRating(+id || rating);
  };
  return (
    <div
      onMouseOver={hoverOver}
      onMouseOut={() => hoverOver(null)}
      onClick={onClickHandler}
    >
      {Array.from({ length: total }).map((v, i) => (
        <Star
          starId={i + 1}
          key={`ew-star-${i + 1}`}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        ></Star>
      ))}
    </div>
  );
};
export default StarRating;
```

示例:

<code src="./Demo.zh-CN.tsx" id="starRatingTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="starRatingJsxDemoZH"></code>
