| 标题                       | 标签                          | 首次添加时间 | 更新时间 |
| -------------------------- | ----------------------------- | ------------ | -------- |
| 复制文本到剪贴板的钩子函数 | 钩子函数,副作用,状态,回调函数 | 2022/8/7     | 2022/8/7 |

将给定的文本复制到剪贴板。

- 使用 [copyToClipboard](https://github.com/eveningwater/code-segment-react/tree/main/docs/hooks/useCopyToClipboard) 片段将文本复制到剪贴板。
- 使用 useState() 挂钩来初始化复制的变量。
- 使用 useCallback() 挂钩为 copyToClipboard 方法创建回调。
- 如果文本更改，请使用 useEffect() 挂钩重置复制的状态变量。
- 返回复制的状态变量和复制回调。

钩子函数代码:

```ts
import { useState, useCallback, useEffect } from 'react';

const useCopyToClipboard = (text: string) => {
  const copyToClipboard = (str: string) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
      document.getSelection()!.rangeCount > 0
        ? document.getSelection()?.getRangeAt(0)
        : false;
    el.select();
    const success = document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection()?.removeAllRanges();
      document.getSelection()?.addRange(selected);
    }
    return success;
  };

  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    if (!copied) {
      setCopied(copyToClipboard(text));
    }
  }, [text]);

  useEffect(() => () => setCopied(false), [text]);

  return [copied, copy];
};

export default useCopyToClipboard;
```

示例代码:

```tsx | pure
import React, { SyntheticEvent } from 'react';
import useCopyToClipboard from './useCopyToClipboard';
import { Space } from 'antd';
import Button from '../../guide/Button/Button';

export interface TextCopyProps {
  text: string;
}

const TextCopy = (props: Partial<TextCopyProps>) => {
  const { text = 'Lorem ipsum' } = props;
  const [copied, copy] = useCopyToClipboard(text);
  return (
    <Space>
      <Button
        type="primary"
        ripple
        onClick={copy as (e: SyntheticEvent) => void}
      >
        点击这里复制!
      </Button>
      <span>{copied && '已复制!'}</span>
    </Space>
  );
};

const Demo = () => <TextCopy text="复制的文本!" />;

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>
