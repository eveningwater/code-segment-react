| 标题         | 标签                          | 首次添加时间 | 更新时间  |
| ------------ | ----------------------------- | ------------ | --------- |
| 拖拽文件组件 | 组件,输入框,状态,副作用，事件 | 2022/7/19    | 2022/7/19 |

创建一个名为 dropRef 的引用，并将其绑定到组件的包装器。

- 使用 useState()钩子创建拖动和文件名变量。分别将它们初始化为 false 和''。
- 变量 dragCounter 和 drag 用于确定一个文件是否被拖动，而 filename 用于存储被拖放的文件的名称。
- 创建 handleDrag, handleDragIn, handleDragOut 和 handleDrop 方法来处理拖放功能。
- handleDrag 用于阻止浏览器打开被拖动的文件。handleDragIn 和 handleDragOut 处理被拖动的文件进入和退出组件。handleDrop \*处理正在被删除的文件并将其传递给 onDrop。
- 使用 useEffect()钩子使用前面创建的方法来处理每个拖放事件。

```tsx | pure
import React, { createRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
const DropContainer = styled.div`
  min-height: 120px;
  border: 3px solid #d3d3d3;
  text-align: center;
  font-size: 24px;
  padding: 32px;
  border-radius: 4px;
  &.drag {
    border: 3px dashed #1e90ff;
  }
  &.ready {
    border: 3px solid #32cd32;
  }
`;
interface FileDropProps {
  onDrop(file?: File): void;
}
const FileDrop = (props: Partial<FileDropProps>) => {
  const { onDrop } = props;
  const [drag, setDrag] = useState(false);
  const [filename, setFilename] = useState('');
  const dropRef = createRef<HTMLDivElement>();
  let dragCount = 0;
  const commonHandler = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDragEnterHandler = (e: Event) => {
    commonHandler(e);
    dragCount++;
    const event = e as DragEvent;
    if (event.dataTransfer?.items && event.dataTransfer.items.length) {
      setDrag(true);
    }
  };
  const onDragLeaveHandler = (e: Event) => {
    commonHandler(e);
    dragCount--;
    if (dragCount === 0) {
      setDrag(false);
    }
  };
  const onDragOverHandler = (e: Event) => {
    commonHandler(e);
  };
  const onDropHandler = (e: Event) => {
    commonHandler(e);
    setDrag(false);
    const event = e as DragEvent;
    if (event.dataTransfer?.files && event.dataTransfer.files.length) {
      if (onDrop) {
        onDrop(event.dataTransfer?.files[0]);
        setFilename(event.dataTransfer?.files[0].name);
        event.dataTransfer.clearData();
        dragCount = 0;
      }
    }
  };
  const events = [
    { type: 'dragenter', handlerName: onDragEnterHandler },
    { type: 'dragleave', handlerName: onDragLeaveHandler },
    { type: 'dragover', handlerName: onDragOverHandler },
    { type: 'drop', handlerName: onDropHandler },
  ];
  useEffect(() => {
    const container = dropRef.current;
    events.forEach((item) =>
      container?.addEventListener(item.type, item.handlerName),
    );
    return () => {
      events.forEach((item) =>
        container?.removeEventListener(item.type, item.handlerName),
      );
    };
  }, []);

  return (
    <DropContainer ref={dropRef}>
      {filename && !drag ? filename : 'Drop a file here!'}
    </DropContainer>
  );
};
export default FileDrop;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>
