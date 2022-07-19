| title                   | tags                                | firstSeen | lastUpdated |
| ----------------------- | ----------------------------------- | --------- | ----------- |
| File drag and drop area | components,input,state,effect,event | 2022/7/19 | 2022/7/19   |

Renders a file drag and drop component for a single file.

- Create a ref, called dropRef and bind it to the component's wrapper.
- Use the useState() hook to create the drag and filename variables. Initialize them to false and '' respectively.
- The variables dragCounter and drag are used to determine if a file is being dragged, while filename is used to store the dropped file's name.
- Create the handleDrag, handleDragIn, handleDragOut and handleDrop methods to handle drag and drop functionality.
- handleDrag prevents the browser from opening the dragged file. handleDragIn and handleDragOut handle the dragged file entering and exiting the component. handleDrop \* handles the file being dropped and passes it to onDrop.
- Use the useEffect() hook to handle each of the drag and drop events using the previously created methods.

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

Demo:

<code src="./Demo.tsx"></code>
