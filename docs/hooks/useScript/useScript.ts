import { useState, useEffect } from 'react';

const useScript = (src: string): string => {
  const [status, setStatus] = useState(src ? 'loading' : 'idle');
  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    let script = document.querySelector(
      `script[src="${src}"]`,
    ) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script') as HTMLScriptElement;
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);

      const setDataStatus = (event: Event) => {
        script.setAttribute(
          'data-status',
          event.type === 'load' ? 'ready' : 'error',
        );
      };

      script.addEventListener('load', setDataStatus);
      script.addEventListener('error', setDataStatus);
    } else {
      setStatus(script.getAttribute('data-status') as string);
    }

    const setStateStatus = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };

    script.addEventListener('load', setStateStatus);
    script.addEventListener('error', setStateStatus);

    return () => {
      if (script) {
        script.removeEventListener('load', setStateStatus);
        script.removeEventListener('error', setStateStatus);
      }
    };
  }, [src]);
  return status;
};

export default useScript;
