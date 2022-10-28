import { useState, useCallback, useEffect } from 'react';

const events = ['popstate', 'pushstate', 'replacestate'];
const useSearchParam = (param: string): (() => string | null) => {
  const getValue = useCallback(
    () => () => new URLSearchParams(window.location.search).get(param),
    [param],
  );

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const onChange = () => {
      debugger;
      setValue(getValue());
    };

    events.forEach((type) => window.addEventListener(type, onChange));

    return () => {
      events.forEach((type) => window.removeEventListener(type, onChange));
    };
  }, []);

  return value;
};

export default useSearchParam;
