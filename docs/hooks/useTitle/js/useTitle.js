import { useRef, useEffect } from 'react';

const useTitle = (title) => {
  const isDocumentDefined = typeof document !== 'undefined';
  const originalTitle =
    useRef < string > (isDocumentDefined ? document.title : '');

  useEffect(() => {
    if (!isDocumentDefined) {
      return;
    }

    if (document.title !== title) {
      document.title = title;
    }

    return () => {
      document.title = originalTitle.current;
    };
  }, []);
};

export default useTitle;
