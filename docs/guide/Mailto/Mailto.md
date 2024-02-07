| title      | tags       | firstSeen | lastUpdated |
| ---------- | ---------- | --------- | ----------- |
| Email link | components | 2022/7/24 | 2022/7/24   |

Renders a link formatted to send an email (mailto: link).

- Use the email, subject and body props to create a `<a>` element with an appropriate href attribute.
- Use encodeURIcomponent to safely encode the subject and body into the link URL.
- Render the link with children as its content.

#### Mailto.tsx

```tsx | pure
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
```

#### Mailto.jsx

```jsx | pure
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
```

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
