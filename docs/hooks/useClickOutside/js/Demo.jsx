import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useClickOutside from './useClickOutside';

const ClickStyleBox = styled.div`
  border: 2px dashed #2396ef;
  height: 200px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ClickBox = (props) => {
  const { onClickOutside } = props;
  const clickRef = useRef(null);
  useClickOutside(clickRef, () => {
    if (onClickOutside) {
      onClickOutside();
    }
  });
  return (
    <ClickStyleBox ref={clickRef}>
      <p>Click out of this element</p>
    </ClickStyleBox>
  );
};
const Demo = () => {
  return <ClickBox onClickOutside={() => alert('click outside')}></ClickBox>;
};

export default Demo;
