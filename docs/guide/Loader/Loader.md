| title           | tags       | firstSeen | lastUpdated |
| --------------- | ---------- | --------- | ----------- |
| Spinning loader | components | 2022/7/23 | 2022/7/23   |

Renders a spinning loader component.

- Render an SVG, whose height and width are determined by the size prop.
- Use CSS to animate the SVG, creating a spinning animation.

#### Loader.tsx

```tsx | pure
import React from 'react';
import styled from '@emotion/styled';
const StyleLoader = styled.svg`
  animation: rotate 2s linear infinite;
  & circle {
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
export interface LoaderProps extends Record<string, unknown> {
  size: number | string;
}
const Loader = (props: Partial<LoaderProps>) => {
  const { size, ...rest } = props;

  return (
    <StyleLoader
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </StyleLoader>
  );
};

export default Loader;
```

#### Loader.jsx

```jsx | pure
import React from 'react';
import styled from '@emotion/styled';
const StyleLoader = styled.svg`
  animation: rotate 2s linear infinite;
  & circle {
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
const Loader = (props) => {
  const { size, ...rest } = props;

  return (
    <StyleLoader
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </StyleLoader>
  );
};

export default Loader;
```

Demo:

<code src="./Demo.tsx" id="loaderTsxDemo"></code>

jsx Demo:

<code src="./jsx/Demo.jsx" id="loaderJsxDemo"></code>
