import { useState, useEffect } from 'react';

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);
  const onDownHandler = (e) => {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };
  const onUpHandler = (e) => {
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', onDownHandler);
    window.addEventListener('keyup', onUpHandler);
    return () => {
      window.removeEventListener('keydown', onDownHandler);
      window.removeEventListener('keyup', onUpHandler);
    };
  }, []);
  return keyPressed;
};

export default useKeyPress;
