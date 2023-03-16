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
