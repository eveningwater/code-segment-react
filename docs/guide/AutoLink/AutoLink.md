| title                  | tags                       | firstSeen | lastUpdated |
| ---------------------- | -------------------------- | --------- | ----------- |
| Automatic text linking | components,fragment,regexp | 2022/7/11 | 2022/7/11   |

Renders a string as plaintext, with URLs converted to appropriate link elements.

- Use String.prototype.split() and String.prototype.match() with a regular expression to find URLs in a string.
- Return matched URLs rendered as `<a>` elements, dealing with missing protocol prefixes if necessary.
- Render the rest of the string as plaintext.

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

Demo:

<code src="./Demo.tsx" id="autolinkTsxDemo"></code>

jsx Demo:

<code src="./jsx/Demo.jsx" id="autolinkTsxDemo"></code>
