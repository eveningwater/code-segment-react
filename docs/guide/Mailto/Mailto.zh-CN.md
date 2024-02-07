| 标题         | 标签 | 首次添加时间 | 更新时间  |
| ------------ | ---- | ------------ | --------- |
| 邮件链接组件 | 组件 | 2022/7/24    | 2022/7/24 |

呈现格式化为发送电子邮件的链接（mailto：链接）。

- 使用 email、subject 和 body 属性创建一个带有适当 href 属性的 `<a>` 元素。
- 使用 encodeURIcomponent 将主题和正文安全地编码到链接 URL 中。
- 呈现带有子项的链接作为其内容。

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

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
