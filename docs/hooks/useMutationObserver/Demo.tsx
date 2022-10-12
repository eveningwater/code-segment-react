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
  const [content, setContent] = useState('hello,world!');

  return (
    <>
      <label htmlFor="content-input">Edit this to update the text:</label>
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
          <h2>Resize or change the content:</h2>
          <p>{content}</p>
        </div>
        <div>
          <h3>Mutation count {mutationCount}</h3>
        </div>
      </div>
    </>
  );
};

export default Demo;
