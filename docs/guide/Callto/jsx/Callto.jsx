import styled from '@emotion/styled';
import React from 'react';

const Link = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.85);
  font-size: 18px;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #2396ef;
  }
`;

const CallTo = (props) => {
  const { phone, children } = props;
  return (
    <Link href={`tel:${phone}`} className="tel-link">
      {children}
    </Link>
  );
};

export default CallTo;
