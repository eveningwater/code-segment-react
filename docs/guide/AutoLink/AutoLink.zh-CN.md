---
title: 自动文本链接组件
nav: 指南
---

| 标题         | 标签                     | 首次添加时间 | 更新时间  |
| ------------ | ------------------------ | ------------ | --------- |
| 自动文本链接 | 组件,碎片节点,正则表达式 | 2022/7/11    | 2022/7/11 |

将字符串呈现为纯文本，并将 URL 转换为适当的链接元素。

- 使用带有正则表达式的 String.prototype.split() 和 String.prototype.match() 来查找字符串中的 URL。
- 返回呈现为 `<a>` 元素的匹配 URL，如有必要，处理缺少的协议前缀。
- 将字符串的其余部分呈现为纯文本。

#### AutoLink.tsx

```tsx | pure
import React from 'react';
import styled from '@emotion/styled';

const LinkContainer = styled.span`
  display: inline-block;
  a {
    line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    touch-action: manipulation;
    height: 32px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 2px;
    color: #1890ff;
    background: transparent;
    text-decoration: none;
    &:hover {
      color: #40a9ff;
    }
  }
`;

interface AutoLinkPropType {
  text: string;
}
const AutoLink = (props: Partial<AutoLinkPropType>) => {
  const { text } = props;
  const delimiter =
    /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;
  return (
    <LinkContainer>
      {text?.split(delimiter).map((word) => {
        const match = word.match(delimiter);
        if (match) {
          const url = match[0];
          return (
            <a
              href={url.startsWith('http') ? url : `http://${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </a>
          );
        }
        return word;
      })}
    </LinkContainer>
  );
};
export default AutoLink;
```

#### AutoLink.jsx

```jsx | pure
import React from 'react';
import styled from '@emotion/styled';

const LinkContainer = styled.span`
  display: inline-block;
  a {
    line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    touch-action: manipulation;
    height: 32px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 2px;
    color: #1890ff;
    background: transparent;
    text-decoration: none;
    &:hover {
      color: #40a9ff;
    }
  }
`;

const AutoLink = (props) => {
  const { text } = props;
  const delimiter =
    /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;
  return (
    <LinkContainer>
      {text?.split(delimiter).map((word) => {
        const match = word.match(delimiter);
        if (match) {
          const url = match[0];
          return (
            <a
              href={url.startsWith('http') ? url : `http://${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </a>
          );
        }
        return word;
      })}
    </LinkContainer>
  );
};

export default AutoLink;
```

示例:

<code src="./Demo.zh-CN.tsx" id="autolinkTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="autolinkTsxDemoZH"></code>
