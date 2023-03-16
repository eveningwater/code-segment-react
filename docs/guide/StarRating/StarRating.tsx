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
