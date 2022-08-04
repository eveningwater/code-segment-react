| 标题                     | 标签             | 首次添加时间 | 更新时间  |
| ------------------------ | ---------------- | ------------ | --------- |
| 锁定 body 滚动的钩子函数 | 钩子函数，副作用 | 2022/8/04    | 2022/8/04 |

启用正文滚动锁定。

- 使用带有空数组的 useLayoutEffect() 作为第二个参数，仅在安装组件时执行一次提供的回调。
- 使用 Window.getComputedStyle() 获取 body 元素的溢出值并将其存储在变量中。
- 将 body 元素的溢出值替换为'hidden'，卸载时恢复为原始值。

钩子函数代码:

```ts
import { useLayoutEffect } from 'react';

const useBodyScrollLock = () => {
  useLayoutEffect(() => {
    const container = document.body;
    const originOverflowStyle = window.getComputedStyle(container!).overflow;
    container!.style.overflow = 'hidden';
    return () => {
      container!.style.overflow = originOverflowStyle;
    };
  }, []);
};

export default useBodyScrollLock;
```

使用示例代码:

```tsx | pure
import React, { useState } from 'react';
import Modal from '../../guide/Modal/Modal';
import Button from '../../guide/Button/Button';
import useBodyScrollLock from './useBodyScrollLock';
import styled from '@emotion/styled';

export interface ScrollModalProps {
  visible: boolean;
  onCancel(): void;
  onOk(): void;
}
const ScrollModal = (props: ScrollModalProps) => {
  const { visible, onCancel, onOk } = props;

  useBodyScrollLock();

  return (
    <Modal
      title="scrollModal"
      visible={visible}
      showCancel
      cancelText="Cancel"
      okText="Ok"
      onCancel={onCancel}
      onOk={onOk}
    >
      滚动被锁定! <br />
      <Button onClick={onCancel}>点击我解除锁定</Button>
    </Modal>
  );
};

const DemoContainer = styled.div`
  height: 400vh;
  text-align: center;
  padding-top: 100px;
  overflow: auto;
`;

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const handleClose = () => setVisible(false);
  return (
    <DemoContainer>
      <Button onClick={() => setVisible(true)}>打开弹出框</Button>
      {visible && (
        <ScrollModal
          visible={visible}
          onCancel={handleClose}
          onOk={handleClose}
        ></ScrollModal>
      )}
    </DemoContainer>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>
