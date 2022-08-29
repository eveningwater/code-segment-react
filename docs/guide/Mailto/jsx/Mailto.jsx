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

const Mailto = (props) => {
  const { email, subject = '', body = '', children, ...rest } = props;
  let params = subject || body ? '?' : '';
  if (subject) {
    params += `subject=${encodeURIComponent(subject)}`;
  }
  if (body) {
    params += `body=${encodeURIComponent(body)}`;
  }
  return (
    <Link href={`mailto:${email}${params}`} className="mail-link" {...rest}>
      {children}
    </Link>
  );
};

export default Mailto;
