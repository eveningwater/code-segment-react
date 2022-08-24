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
const FileDrop = (props) => {
  const { onDrop, emptyText } = props;
  const [drag, setDrag] = useState(false);
  const [filename, setFilename] = useState('');
  const dropRef = createRef();
  let dragCount = 0;
  const commonHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDragEnterHandler = (e) => {
    commonHandler(e);
    dragCount++;
    const event = e;
    if (event.dataTransfer?.items && event.dataTransfer.items.length) {
      setDrag(true);
    }
  };
  const onDragLeaveHandler = (e) => {
    commonHandler(e);
    dragCount--;
    if (dragCount === 0) {
      setDrag(false);
    }
  };
  const onDragOverHandler = (e) => {
    commonHandler(e);
  };
  const onDropHandler = (e) => {
    commonHandler(e);
    setDrag(false);
    const event = e;
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
    <DropContainer
      ref={dropRef}
      className={drag ? ' drag' : filename ? ' ready' : ''}
    >
      {filename && !drag ? filename : emptyText || 'Drop a file here!'}
    </DropContainer>
  );
};
export default FileDrop;
