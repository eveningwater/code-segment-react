| title    | tags                   | firstSeen | lastUpdated |
| -------- | ---------------------- | --------- | ----------- |
| TagInput | components,input,state | 2023/3/17 | 2023/3/17   |

Renders a tag input field.

- Define a TagInput component and use the useState() hook to initialize an array from tags.
- Use Array.prototype.map() on the collected nodes to render the list of tags.
- Define the addTagData method, which will be executed when pressing the Enter key.
- The addTagData method calls setTagData to add the new tag using the spread (...) operator to prepend the existing tags and add the new tag at the end of the tagData array.
- Define the removeTagData method, which will be executed on clicking the delete icon in the tag.
- Use Array.prototype.filter() in the removeTagData method to remove the tag using its index to filter it out from the tagData array.

#### tagInput.less

```less
@prefix: ew-tags-input;
@tagInputborderColor: #d6d8da;
@white: #fff;
@tagBgColor: #2396ef;
@closeBtnColor: #2396ef;
@closeBtnBgColor: @white;
.@{prefix}{
    display: flex;
    flex-wrap: wrap;
    min-height: 48px;
    padding: 0 8px;
    border-radius: 6px;
    border: 1px solid @tagInputborderColor;
    &-inner {
        border: none;
        flex: 1;
        outline: none;
        height: 46px;
        font-size: 14px;
        padding: 4px 0 0;
    }
    &-list {
        margin: 8px 0 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        &-item {
            width: auto;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: @white;
            font-size: 14px;
            background-color: @tagBgColor;
            border-radius: 6px;
            list-style: none;
            padding: 0 8px;
            margin: 0 8px 8px 0;
            &-text {
                margin-top: 3px;
            }
            &-close-btn {
                width: 16px;
                height: 16px;
                display: block;
                line-height: 16px;
                text-align: center;
                margin-left: 8px;
                font-size: 14px;
                background-color: @closeBtnBgColor;
                color: @closeBtnColor;
                border-radius: percentage(.5);
                cursor: pointer;
            }
        }
    }
}
```

#### TagInput.tsx

```tsx | pure
import React, { ReactNode, useState, SyntheticEvent } from 'react';
import './tagInput.less';
export type TagItem = {
  label: ReactNode;
  key: string | number;
};
export interface TagInputProps extends Record<string, any> {
  tags: TagItem[];
  inputPlaceholder: string;
}
const TagInput = (props: Partial<TagInputProps>) => {
  const { tags = [], inputPlaceholder = 'Press enter to add a tag' } = props;
  const [tagsData, setTagsData] = useState(tags);
  const removeTagHandler = (removeIndex: number) => {
    setTagsData([...tagsData].filter((_, index) => removeIndex !== index));
  };
  const addTagHandler = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    if (value.trim()) {
      setTagsData([...tagsData, { label: value, key: tagsData.length + 1 }]);
      target.value = '';
    }
  };
  return (
    <div className="ew-tags-input">
      <ul className="ew-tags-input-list">
        {tagsData.map((item, index) => (
          <li className="ew-tags-input-list-item" key={item.key}>
            <span className="ew-tags-input-list-item-text">{item.label}</span>
            <span
              className="ew-tags-input-list-item-close-btn"
              onClick={() => removeTagHandler(index)}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="ew-tags-input-inner"
        placeholder={inputPlaceholder}
        onKeyUp={(e) => (e.key === 'Enter' ? addTagHandler(e) : null)}
      />
    </div>
  );
};

export default TagInput;
```

#### TagInput.jsx

```jsx | pure
import React, { useState } from 'react';
import '../tagInput.less';
const TagInput = (props) => {
  const { tags = [], inputPlaceholder = 'Press enter to add a tag' } = props;
  const [tagsData, setTagsData] = useState(tags);
  const removeTagHandler = (removeIndex) => {
    setTagsData([...tagsData].filter((_, index) => removeIndex !== index));
  };
  const addTagHandler = (e) => {
    const target = e.target;
    const value = target.value;
    if (value.trim()) {
      setTagsData([...tagsData, { label: value, key: tagsData.length + 1 }]);
      target.value = '';
    }
  };
  return (
    <div className="ew-tags-input">
      <ul className="ew-tags-input-list">
        {tagsData.map((item, index) => (
          <li className="ew-tags-input-list-item" key={item.key}>
            <span className="ew-tags-input-list-item-text">{item.label}</span>
            <span
              className="ew-tags-input-list-item-close-btn"
              onClick={() => removeTagHandler(index)}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="ew-tags-input-inner"
        placeholder={inputPlaceholder}
        onKeyUp={(e) => (e.key === 'Enter' ? addTagHandler(e) : null)}
      />
    </div>
  );
};

export default TagInput;
```

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
