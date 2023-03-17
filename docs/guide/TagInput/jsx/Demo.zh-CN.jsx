import React from 'react';
import TagInput from './TagInput';
const Demo = () => {
  const tagsData = [
    {
      label: 'html',
      key: '1',
    },
    {
      label: 'css',
      key: '2',
    },
    {
      label: 'javascript',
      key: '3',
    },
  ];
  return <TagInput tags={tagsData} inputPlaceholder="请输入标签内容" />;
};
export default Demo;
