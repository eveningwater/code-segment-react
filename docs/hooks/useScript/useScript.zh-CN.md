| 标题             | 标签                       | 首次添加时间 | 更新时间   |
| ---------------- | -------------------------- | ------------ | ---------- |
| 动态脚本钩子函数 | 钩子函数,副作用，状态,事件 | 2022/10/27   | 2022/10/27 |

动态加载外部脚本。

- 使用 useState() 钩子为脚本的加载状态创建一个状态变量。
- 使用 useEffect() 钩子在 src 更改时处理加载和卸载脚本的所有逻辑。
- 如果不存在 src 值，则将状态设置为“空闲”并返回。
- 使用 Document.querySelector() 检查是否存在具有适当 src 值的 `<script>` 元素。
- 如果不存在相关元素，请使用 Document.createElement() 创建一个并为其赋予适当的属性。
- 使用 data-status 属性作为指示脚本状态的一种方式，最初将其设置为“正在加载”。
- 如果存在相关元素，则跳过初始化并从其 data-status 属性更新状态。这确保不会创建重复的元素。
- 使用 EventTarget.addEventListener() 来监听“加载”和“错误”事件，并通过更新数据状态属性和状态状态变量来处理它们。
- 最后，当组件卸载时，使用 Document.removeEventListener() 删除绑定到元素的所有侦听器。

#### useScript.ts

```ts
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
```

#### 示例

```tsx | pure
import React from 'react';
import useScript from './useScript';
const script =
  'data:text/plain;charset=utf-8;base64,KGZ1bmN0aW9uKCl7IGNvbnNvbGUubG9nKCdIZWxsbycpIH0pKCk7';

const Child = () => {
  const status = useScript(script);
  return <p>子元素状态: {status}</p>;
};

const Demo = () => {
  const status = useScript(script);
  return (
    <>
      <p>父元素状态: {status}</p>
      <Child />
    </>
  );
};

export default Demo;
```

#### useScript.js

```js
import { useState, useEffect } from 'react';

const useScript = (src) => {
  const [status, setStatus] = useState(src ? 'loading' : 'idle');
  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);

      const setDataStatus = (event) => {
        script.setAttribute(
          'data-status',
          event.type === 'load' ? 'ready' : 'error',
        );
      };

      script.addEventListener('load', setDataStatus);
      script.addEventListener('error', setDataStatus);
    } else {
      setStatus(script.getAttribute('data-status'));
    }

    const setStateStatus = (event) => {
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
```

#### js 示例

```jsx | pure
import React from 'react';
import useScript from './useScript';
const script =
  'data:text/plain;charset=utf-8;base64,KGZ1bmN0aW9uKCl7IGNvbnNvbGUubG9nKCdIZWxsbycpIH0pKCk7';

const Child = () => {
  const status = useScript(script);
  return <p>子元素状态: {status}</p>;
};

const Demo = () => {
  const status = useScript(script);
  return (
    <>
      <p>父元素状态: {status}</p>
      <Child />
    </>
  );
};

export default Demo;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

js 示例:

<code src="./js/Demo.zh-CN.jsx"></code>
