| title                | tags               | firstSeen  | lastUpdated |
| -------------------- | ------------------ | ---------- | ----------- |
| React usePortal hook | hooks,effect,state | 2022/10/23 | 2022/10/23  |

Creates a portal, allowing rendering of children outside the parent component.

- Use the useState() hook to create a state variable that holds the render() and remove() functions for the portal.
- Use ReactDOM.createPortal() and ReactDOM.unmountComponentAtNode() to create a portal and a function to remove it. Use the useCallback() hook to wrap and memoize these functions as createPortal().
- Use the useEffect() hook to call createPortal() and update the state variable any time el's value changes.
- Finally, return the render() function of the state variable.

#### usePortal.ts

```ts
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
  if (!el) {
    return () => null;
  }

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
```

#### Demo

```tsx | pure
import React, { JSXElementConstructor } from 'react';
import usePortal from './usePortal';

const Demo = () => {
  const Portal = usePortal(
    document.querySelector('.title')!,
  ) as JSXElementConstructor<any>;

  return (
    <p>
      hello,world!
      <Portal>Portalized Title</Portal>
    </p>
  );
};

export default Demo;
```

#### usePortal.js

```js
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
```

#### js Demo

```jsx | pure
import React, { JSXElementConstructor } from 'react';
import usePortal from './usePortal';

const Demo = () => {
  const Portal = usePortal(document.querySelector('.title'));

  return (
    <p>
      hello,world!
      <Portal>Portalized Title</Portal>
    </p>
  );
};

export default Demo;
```

Demo:

<code src="./Demo.tsx" id="portalTsDemo"></code>

js Demo:

<code src="./js/Demo.jsx" id="portalJsDemo"></code>
