import React, { useRef } from 'react';
import styled from '@emotion/styled';
import useClickInside from './useClickInside';
import Modal from '../../guide/Modal/Modal';

const ClickStyleBox = styled.div`
  border: 2px dashed #2396ef;
  height: 200px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface ClickBoxProps {
  onClickInside(): void;
}
const ClickBox = (props: Partial<ClickBoxProps>) => {
  const { onClickInside } = props;
  const clickRef = useRef<HTMLDivElement | null>(null);
  useClickInside(clickRef, () => {
    if (onClickInside) {
      onClickInside();
    }
  });
  return (
    <ClickStyleBox ref={clickRef}>
      <p>点击这个元素之内的区域</p>
    </ClickStyleBox>
  );
};
const Demo = () => {
  return (
    <ClickBox onClickInside={() => Modal.confirm('点击了该区域内')}></ClickBox>
  );
};

export default Demo;
