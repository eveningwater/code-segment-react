import { useState, useCallback, useRef } from 'react';

const useHover = (): [(node: HTMLElement | null) => void, boolean] => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseOver = useCallback(() => {
    setIsHovering(true);
  }, []);
  const onMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  const nodeRef = useRef<HTMLElement | null>(null);
  const callbackRef = useCallback(
    (node: HTMLElement | null) => {
      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', onMouseOver);
        nodeRef.current.addEventListener('mouseout', onMouseOut);
      }
      nodeRef.current = node;
      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', onMouseOver);
        nodeRef.current.addEventListener('mouseout', onMouseOut);
      }
    },
    [onMouseOver, onMouseOut],
  );
  return [callbackRef, isHovering];
};

export default useHover;
