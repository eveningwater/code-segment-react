| title                   | tags       | firstSeen | lastUpdated |
| ----------------------- | ---------- | --------- | ----------- |
| Callable telephone link | components | 2022/7/12 | 2022/7/12   |

Renders a link formatted to call a phone number (tel: link).

- Use phone to create a `<a>` element with an appropriate href attribute.
- Render the link with children as its content.

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
interface CallToType {
  phone: string;
  children: ReactNode;
}
const CallTo = (props: Partial<CallToType>) => {
  const { phone, children } = props;
  return (
    <Link href={`tel:${phone}`} className="tel-link">
      {children}
    </Link>
  );
};

const Demo = () => {
  return <CallTo phone="18283984473">eveningwater</CallTo>;
};

export default Demo;
```

demo:

<code src="./CallTo.tsx"></code>
