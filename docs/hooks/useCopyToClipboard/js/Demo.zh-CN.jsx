import React from 'react';
import useCopyToClipboard from './useCopyToClipboard';
import { Space } from 'antd';
import Button from '../../../guide/Button/jsx/Button';

const TextCopy = (props) => {
  const { text = 'Lorem ipsum' } = props;
  const [copied, copy] = useCopyToClipboard(text);
  return (
    <Space>
      <Button
        type="primary"
        ripple
        onClick={copy}
      >
        点击这里复制!
      </Button>
      <span>{copied && '已复制!'}</span>
    </Space>
  );
};

const Demo = () => <TextCopy text="复制的文本!" />;

export default Demo;
