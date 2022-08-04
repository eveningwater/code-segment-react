| title                        | tags         | firstSeen | lastUpdated |
| ---------------------------- | ------------ | --------- | ----------- |
| React useBodyScrollLock hook | hooks,effect | 2022/8/4  | 2022/8/4    |

Enables body scroll locking.

- Use the useLayoutEffect() with an empty array as the second argument to execute the provided callback only once when the component is mounted.
- Use Window.getComputedStyle() to get the overflow value of the body element and store it in a variable.
- Replace the overflow value of the body element with 'hidden' and restore it to its original value when unmounting.

useBodyScrollLock.ts:

```tsx | pure
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

Demo:

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
      Scroll locked! <br />
      <Button onClick={onCancel}>Click me to unlock</Button>
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
      <Button onClick={() => setVisible(true)}>open the modal</Button>
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

Demo:

<code src="./Demo.tsx"></code>
