| title       | tags                            | firstSeen | lastUpdated |
| ----------- | ------------------------------- | --------- | ----------- |
| Star rating | components,children,input,state | 2023/3/16 | 2023/3/16   |

Renders a star rating component.

- Define a Star component. It renders each individual star with the appropriate appearance, based on the parent component's state.
- Define a StarRating component. Use the useState() hook to define the rating and selection state variables with the appropriate initial values.
- Create a method, hoverOver, that updates selected according to the provided event, using the .data-star-id attribute of the \* event's target or resets it to 0 if called with a null argument.
- Use Array.from() to create an array of 5 elements and Array.prototype.map() to create individual `<Star />` components.
- Handle the onMouseOver and onMouseLeave events of the wrapping element using hoverOver. Handle the onClick event using setRating.

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

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
