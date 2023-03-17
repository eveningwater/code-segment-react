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
