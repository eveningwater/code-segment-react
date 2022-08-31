import { css } from '@emotion/css';
import React from 'react';
const SimpleStyleDataList = css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  position: relative;
  &.bordered {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
`;
const SimpleDataListItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:last-of-type {
    border-bottom: 0;
  }
`;
const SimpleDataList = (props) => {
  const { data, isOrdered = false, isBordered = true } = props;
  const List = data?.map((val, index) => (
    <li className={SimpleDataListItem} key={`${val}-${index}`}>
      {val}
    </li>
  ));
  const containerClassName = `${SimpleStyleDataList}${
    isBordered ? ' bordered' : ''
  }`;
  return isOrdered ? (
    <ol className={containerClassName}>{List}</ol>
  ) : (
    <ul className={containerClassName}>{List}</ul>
  );
};

export default SimpleDataList;
