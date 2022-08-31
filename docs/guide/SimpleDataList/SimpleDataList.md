| title     | tags       | firstSeen | lastUpdated |
| --------- | ---------- | --------- | ----------- |
| Data list | components | 2022/7/17 | 2022/7/17   |

Renders a list of elements from an array of primitives.

- Use the value of the isOrdered prop to conditionally render an `<ol>` or a `<ul>` list.
- Use Array.prototype.map() to render every item in data as a `<li>` element with an appropriate key.
- Use the value of the isBordered prop to add border styles to list container elements.

#### SimpleDataList.tsx

```tsx | pure
import { css } from '@emotion/css';
import React from 'react';

interface DataListProps {
  data: string[];
  isOrdered: boolean;
  isBordered: boolean;
}
const SimpleStyleDataList = css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  position: relative;
  &.bordered {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
`;
const SimpleDataListItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:last-of-type {
    border-bottom: 0;
  }
`;
const SimpleDataList = (props: Partial<DataListProps>) => {
  const { data, isOrdered = false, isBordered = true } = props;
  const List = data?.map((val, index) => (
    <li className={SimpleDataListItem} key={`${val}-${index}`}>
      {val}
    </li>
  ));
  const containerClassName = `${SimpleStyleDataList}${
    isBordered ? ' bordered' : ''
  }`;
  return isOrdered ? (
    <ol className={containerClassName}>{List}</ol>
  ) : (
    <ul className={containerClassName}>{List}</ul>
  );
};

export default SimpleDataList;
```

#### SimpleDataList.jsx

```jsx | pure
import { css } from '@emotion/css';
import React from 'react';
const SimpleStyleDataList = css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  position: relative;
  &.bordered {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
`;
const SimpleDataListItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:last-of-type {
    border-bottom: 0;
  }
`;
const SimpleDataList = (props) => {
  const { data, isOrdered = false, isBordered = true } = props;
  const List = data?.map((val, index) => (
    <li className={SimpleDataListItem} key={`${val}-${index}`}>
      {val}
    </li>
  ));
  const containerClassName = `${SimpleStyleDataList}${
    isBordered ? ' bordered' : ''
  }`;
  return isOrdered ? (
    <ol className={containerClassName}>{List}</ol>
  ) : (
    <ul className={containerClassName}>{List}</ul>
  );
};

export default SimpleDataList;
```

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
