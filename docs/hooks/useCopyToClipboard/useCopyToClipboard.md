| title                         | tags                        | firstSeen | lastUpdated |
| ----------------------------- | --------------------------- | --------- | ----------- |
| React useCopyToClipboard hook | hooks,effect,state,callback | 2022/8/7  | 2022/8/7    |

Copies the given text to the clipboard.

- Use the [copyToClipboard](https://github.com/eveningwater/code-segment-react/tree/main/docs/hooks/useCopyToClipboard) snippet to copy the text to clipboard.
- Use the useState() hook to initialize the copied variable.
- Use the useCallback() hook to create a callback for the copyToClipboard method.
- Use the useEffect() hook to reset the copied state variable if the text changes.
- Return the copied state variable and the copy callback.

hooks:

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

Demo:

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
        Click to Copy!
      </Button>
      <span>{copied && 'Copied!'}</span>
    </Space>
  );
};

const Demo = () => <TextCopy text="The copy text!" />;

export default Demo;
```

Demo:

<code src="./Demo.tsx"></code>
