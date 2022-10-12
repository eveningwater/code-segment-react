import React, { useRef, useState } from 'react';
import type { RefObject } from 'react';
import { Input } from 'antd';
import useMutationObserver from './useMutationObserver';

const { TextArea } = Input;

const Demo = () => {
  const mutationRef = useRef<HTMLDivElement>(null);
  const [mutationCount, setMutationCount] = useState(0);
  const incrementCount = () => setMutationCount(mutationCount + 1);
  useMutationObserver(mutationRef as RefObject<HTMLElement>, incrementCount);
  const [content, setContent] = useState('你好，世界！');

  return (
    <>
      <label htmlFor="content-input">编辑这个更改文本:</label>
      <TextArea
        id="content-input"
        style={{ width: '100%' }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></TextArea>
      <div style={{ width: '100%' }} ref={mutationRef}>
        <div
          style={{
            resize: 'both',
            overflow: 'auto',
            maxWidth: '100%',
            border: '1px solid black',
          }}
        >
          <h2>调整大小或更改内容：</h2>
          <p>{content}</p>
        </div>
        <div>
          <h3>变动的计数 {mutationCount}</h3>
        </div>
      </div>
    </>
  );
};

export default Demo;
