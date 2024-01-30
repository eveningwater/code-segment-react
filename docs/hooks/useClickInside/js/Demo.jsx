import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useClickInside from './useClickInside';
import Modal from '../../../guide/Modal/jsx/Modal';

const ClickStyleBox = styled.div`
  border: 2px dashed #2396ef;
  height: 200px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClickBox = (props) => {
  const { onClickInside } = props;
  const clickRef = useRef(null);
  useClickInside(clickRef, () => {
    if (onClickInside) {
      onClickInside();
    }
  });
  return (
    <ClickStyleBox ref={clickRef}>
      <p>Click inside this element</p>
    </ClickStyleBox>
  );
};
const Demo = () => {
  return (
    <ClickBox
      onClickInside={() =>
        Modal.confirm({
          content: 'click inside',
          cancelText: 'Cancel',
          okText: 'Ok',
        })
      }
    ></ClickBox>
  );
};

export default Demo;
