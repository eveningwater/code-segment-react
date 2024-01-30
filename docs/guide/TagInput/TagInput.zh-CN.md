---
title: 标签输入框组件
nav: 指南
---

| 标题           | 标签              | 首次添加时间 | 上次更新时间 |
| -------------- | ----------------- | ------------ | ------------ |
| 标签输入框组件 | 组件，输入框,状态 | 2023/3/17    | 2023/3/17    |

呈现标签输入字段。

- 定义一个 `TagInput` 组件并使用 useState() 挂钩从标签初始化一个数组。
- 在收集的节点上使用 Array.prototype.map() 来呈现标签列表。
- 定义 addTagData 方法，当按下 Enter 键时将执行该方法。
- addTagData 方法调用 setTagData 以使用扩展 (...) 运算符添加新标签以添加现有标签并将新标签添加到 tagData 数组的末尾。
- 定义 removeTagData 方法，该方法将在点击标签中的删除图标时执行。
- 在 removeTagData 方法中使用 Array.prototype.filter() 来删除标签，使用其索引将其从 tagData 数组中过滤掉。
-

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

示例:

<code src="./Demo.zh-CN.tsx" id="tagInputTsxDemoZH"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx" id="tagInputJsxDemoZH"></code>
