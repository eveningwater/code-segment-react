import { useState, useCallback, useEffect } from 'react';

const useCopyToClipboard = (text: string) => {
  const copyToClipboard = (str: string) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const getSelection = document.getSelection;
    const selected =
      getSelection()!.rangeCount > 0
        ? getSelection()?.getRangeAt(0)
        : false;
    el.select();
    const success = document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      getSelection()?.removeAllRanges();
      getSelection()?.addRange(selected);
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
