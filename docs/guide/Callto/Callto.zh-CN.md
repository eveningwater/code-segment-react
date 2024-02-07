| 标题   | 标签 | 首次添加时间 | 更新时间  |
| ------ | ---- | ------------ | --------- |
| 拨电至 | 组件 | 2022/7/12    | 2022/7/12 |

呈现格式化为拨打电话号码的链接（电话：链接）。

- 使用 phone 创建一个具有适当 href 属性的 `<a>` 元素。
- 呈现带有子项的链接作为其内容。

#### Callto.tsx

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

export default CallTo;
```

#### Callto.jsx

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

const CallTo = (props) => {
  const { phone, children } = props;
  return (
    <Link href={`tel:${phone}`} className="tel-link">
      {children}
    </Link>
  );
};

export default CallTo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
