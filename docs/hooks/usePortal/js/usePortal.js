import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
const usePortal = (el) => {
  if (!el) {
    return () => null;
  }
  const [portal, setPortal] = useState({
    render: () => null,
    remove: () => null,
  });

  const createPortal = useCallback((el) => {
    const Portal = (props) => ReactDOM.createPortal(props.children, el);
    const remove = () => ReactDOM.unmountComponentAtNode(el);

    return {
      render: Portal,
      remove,
    };
  }, []);

  useEffect(() => {
    if (el) {
      portal.remove();
    }
    const newPortal = createPortal(el);
    setPortal(newPortal);

    return () => {
      newPortal.remove();
    };
  }, [el]);

  return portal.render;
};

export default usePortal;
