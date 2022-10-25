import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
export type ReturnPortalType = React.ReactPortal | (() => null);
export type RenderType =
  | ((props: React.PropsWithChildren) => React.ReactPortal)
  | (() => null);
export type PortalType = {
  render: RenderType;
  remove: (() => boolean) | (() => null);
};
const usePortal = <T extends Element>(el: T): ReturnPortalType => {
  const [portal, setPortal] = useState<PortalType>({
    render: () => null,
    remove: () => null,
  });
  const createPortal = useCallback((el: T) => {
    const Portal = (props: React.PropsWithChildren) =>
      ReactDOM.createPortal(props.children, el);
    const remove = () => ReactDOM.unmountComponentAtNode(el);

    return {
      render: Portal,
      remove,
    };
  }, []);

  useEffect(() => {
    if (!el) {
      return;
    }
    if (el) {
      portal.remove();
    }
    const newPortal = createPortal(el);
    setPortal(newPortal as PortalType);

    return () => {
      newPortal.remove();
    };
  }, [el]);

  return portal.render as ReturnPortalType;
};

export default usePortal;
