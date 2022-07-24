import styled from '@emotion/styled';
import React from 'react';
import type { ReactNode } from 'react';

const Link = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.85);
  font-size: 18px;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #2396ef;
  }
`;

interface MailtoProps extends Record<string, unknown> {
  email: string;
  subject: string;
  body: string;
  children: ReactNode;
}

const Mailto = (props: Partial<MailtoProps>) => {
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
