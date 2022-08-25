import React from 'react';
import LazyLoadingImage from './LazyLoadImage';
import styled from '@emotion/styled';

const LazyStyleLoadingImage = styled(LazyLoadingImage)`
  max-width: 100%;
  min-width: 200px;
`;
const Demo = () => {
  return (
    <LazyStyleLoadingImage src="https://www.eveningwater.com/static/page/CSS/css-code-50-image/comic-girl-02.jpg" />
  );
};
export default Demo;
