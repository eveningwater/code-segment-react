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
