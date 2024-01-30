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
        Click to Copy!
      </Button>
      <span>{copied && 'Copied!'}</span>
    </Space>
  );
};

const Demo = () => <TextCopy text="The copy text!" />;

export default Demo;
