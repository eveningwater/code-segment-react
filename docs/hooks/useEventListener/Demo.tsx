import React, { useState, useCallback } from 'react';
import useEventListener from './useEventListener';

const Demo = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const updateCoords = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords],
  );

  useEventListener('mousemove', updateCoords);
  return (
    <p>
      Mouse coordinates: {coords.x},{coords.y}
    </p>
  );
};

export default Demo;
