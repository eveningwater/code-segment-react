### 手写一个 mini 版本的 React 状态管理工具

目前在 React 中，有很多各式各样的状态管理工具，如：

- [React Redux](https://react-redux.js.org/)
- [Mobx](https://mobx.js.org/README.html)
- [Hox](https://github.com/umijs/hox)

每一个状态管理工具都有着不尽相同的 API 和使用方式，而且都有一定的学习成本，而且这些状态管理工具也有一定的复杂度，并没有做到极致的简单。在开发者的眼中，只有用起来比较简单，那么才会有更多的人去使用它，Vue 不就是因为使用简单，上手快，而流行的吗？

有时候我们只需要一个全局的状态，防治一些状态和更改状态的函数就足够了，这样也达到了最简化原则。

下面让我们一起来实现一个最简单的状态管理工具吧。

这个状态管理工具的核心就使用到了[Context API](https://reactjs.org/docs/context.html),在了解本文之前务必先了解并熟悉使用这个 API 的用法。

首先我们来看这个状态管理工具是如何使用的。假设有一个计数器状态，然后我们通过二个方法分别去修改计数器，也就是做加法和减法，换句话说我们需要用到一个计数器状态，二个方法来修改这个状态。在 React 函数组件中，我们使用 useState 方法来初始化一个状态，因此，我们可以很容易的写出如下代码：

```ts | pure
import { useState } from 'react';
const useCounter = (initialCount = 0) => {
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return {
    count,
    increment,
    decrement,
  };
};
export default useCounter;
```

现在，让我们创建一个组件来使用这个 useCounter 钩子函数，如下:

```tsx | pure
import React from 'react';
import useCounter from './useCounter';

const Counter = () => {
  const { count, increment, decrement } = useCounter();
  return (
    <div className="counter">
      {count}
      <button type="button" onClick={increment}>
        add
      </button>
      <button type="button" onClick={decrement}>
        plus
      </button>
    </div>
  );
};
```

然后在根组件 App 当中使用，如下:

```tsx | pure
import React from 'react';
const App = () => {
  return (
    <div className="App">
      <Counter />
      <Counter />
    </div>
  );
};
```

这样，一个计数器组件就大功告成了，可是真的只是这样吗？

首先，我们应该知道计数器组件的状态应该是一致的，也就是说我们的计数器组件应该是共享同一个状态，那么如何共享同一个状态？这时候就需要 Context 出场了。将以上的组件改造一下，我们将状态放在根组件 App 当中初始化，并且传到子组件中去。先修改 App 根组件的代码如下:

新建一个 CounterContext.ts 文件，代码如下:

```ts | pure
const CounterContext = createContext();
export default CounterContext;
```

```tsx | pure
import React, { createContext } from 'react';
import CounterContext from './CounterContext';

const App = () => {
  const { count, increment, decrement } = useCounter();
  return (
    <div className="App">
      <CounterContext.Provider value={{ count, increment, decrement }}>
        <Counter />
        <Counter />
      </CounterContext.Provider>
    </div>
  );
};
```

然后在 Counter 组件代码我们也修改如下:

```tsx | pure
import React, { useContext } from 'react';
import CounterContext from './CounterContext';

const Counter = () => {
  const { count, increment, decrement } = useContext(CounterContext);
  return (
    <div className="counter">
      {count}
      <button type="button" onClick={increment}>
        add
      </button>
      <button type="button" onClick={decrement}>
        plus
      </button>
    </div>
  );
};
```

如此一来，我们就可以共享 count 状态，无论是在多深的子组件当中使用都没有问题，但是这并没有结束，让我们继续。

虽然这样使用解决了共享状态的问题，可是我们发现，我们在使用的时候还要额外的传入一个 context 名，所以我们需要包装一下，到最后，我们只需要像如下这样使用：

```ts | pure
const Counter = createModel(useCounter);
export default Counter;
```

```tsx | pure
const { Provider, useModel } = Counter;
```

然后我们的 App 组件就应该是这样:

```tsx | pure
import React, { createContext } from 'react';
import counter from './Counter';

const App = () => {
  const { Provider } = counter;
  return (
    <div className="App">
      <Provider>
        <Counter />
        <Counter />
      </Provider>
    </div>
  );
};
```

继续修改我们的 Counter 组件，如下:

```tsx | pure
import React, { useContext } from 'react';
import counter from './Counter';

const Counter = () => {
  const { count, increment, decrement } = counter.useModel();
  return (
    <div className="counter">
      {count}
      <button type="button" onClick={increment}>
        add
      </button>
      <button type="button" onClick={decrement}>
        plus
      </button>
    </div>
  );
};
```

通过以上代码的展示，其实我们也就明白了，我们无非是将 useContext 和 createContext 内置到我们封装的 Model 里面去了。

接下来我们就来揭开这个状态管理工具的神秘面纱，首先要用到 React 相关的 API，所以我们需要导入进来。如下:

```tsx | pure
// 导入类型
import type { ReactNode, ComponentType } from 'react';
import { createContext, useContext } from 'react';
```

接下来定义一个唯一标识，用于确定传入的 Context，并且这个用来确定使用者使用 Context 时是正确使用的。

```tsx | pure
const EMPTY: unique symbol = Symbol();
```

接下来我们要定义 Provider 的类型。如下:

```tsx | pure
export interface ModelProviderProps<State = void> {
  initialState?: State;
  children: ReactNode;
}
```

以上我们定义了 context 的状态类型，是一个泛型，参数就是状态的类型，默认初始化为 undefined 类型，并且定义了一个 children 的类型，因为 Provider 的子节点是一个 React 节点，所以也就定义成 ReactNode 类型。

然后就是我们的 Model 类型，如下:

```tsx | pure
export interface Model<Value, State = void> {
  Provider: ComponentType<ModelProviderProps<State>>;
  useModel: () => Value;
}
```

这个也很好理解，因为 Model 暴露了两个东西，第一个是 Provider，第二个就是 useContext，只是换了一个名字而已，定义这两个的类型就够了。

接下来就是我们的核心函数 createModel 函数的实现，我们一步一步来，首先当然是定义这个函数，注意类型，如下:

```tsx | pure
export const createModel = <Value, State = void>(
  useHook: (initialState?: State) => Value,
): Model<Value, State> => {
  //核心代码
};
```

以上函数难以理解的应该是类型的定义，我们 createModel 函数传入一个 hook 函数，hook 函数传入一个状态作为参数，然后返回值就是我们定义好的 Model 泛型，参数为类型就是我们定义好的这个函数的泛型。

接下来，我们要做的自然是创建一个 context，如下:

```tsx | pure
//创建一个context
const context = createContext<Value | typeof EMPTY>(EMPTY);
```

然后我们要创建一个 Provider 函数，本质上也是一个 React 组件，如下:

```tsx | pure
const Provider = (props: ModelProviderProps<State>) => {
  // 这里使用ModelProvider主要是不能和定义的函数名起冲突
  const { Provider: ModelProvider } = context;
  const { initialState, children } = props;
  const value = useHook(initialState);
  return <ModelProvider value={value}>{children}</ModelProvider>;
};
```

这里也很好理解，实际上就是通过父组件拿到初始状态和子节点，从 context 中拿到 Provider 组件，然后返回即可，注意我们的 value 是通过传入的自定义 hook 函数包装后的值。

第三步，我们就需要定义一个 hook 函数拿到这个自定义的 Context，如下:

```tsx | pure
const useModel = (): Value => {
  const value = useContext(context);
  // 这里确定一下用户是否正确使用Provider
  if (value === EMPTY) {
    //抛出异常，使用者并没有用Provider包裹组件
    throw new Error('Component must be wrapped with <Container.Provider>');
  }
  // 返回context
  return value;
};
```

这个函数的实现也很好理解，就是获取 context，判断 context 是否正确使用，然后返回。

最后我们在这个函数内部返回这 2 个东西，即返回 Provider 和 useModel 两个函数。如下:

```tsx | pure
return { Provider, useModel };
```

把以上代码全部合并起来，createModel 函数就大功告成啦。

最后，我们把所有代码合并起来，这个状态管理工具也就完成了。

```tsx | pure
// 导入类型
import type { ReactNode, ComponentType } from 'react';
import { createContext, useContext } from 'react';
const EMPTY: unique symbol = Symbol();
export interface ModelProviderProps<State = void> {
  initialState?: State;
  children: ReactNode;
}
export interface Model<Value, State = void> {
  Provider: ComponentType<ModelProviderProps<State>>;
  useModel: () => Value;
}
export const createModel = <Value, State = void>(
  useHook: (initialState?: State) => Value,
): Model<Value, State> => {
  //创建一个context
  const context = createContext<Value | typeof EMPTY>(EMPTY);
  // 定义Provider函数
  const Provider = (props: ModelProviderProps<State>) => {
    const { Provider: ModelProvider } = context;
    const { initialState, children } = props;
    const value = useHook(initialState);
    return <ModelProvider value={value}>{children}</ModelProvider>;
  };
  // 定义useModel函数
  const useModel = (): Value => {
    const value = useContext(context);
    // 这里确定一下用户是否正确使用Provider
    if (value === EMPTY) {
      //抛出异常，使用者并没有用Provider包裹组件
      throw new Error('Component must be wrapped with <Container.Provider>');
    }
    // 返回context
    return value;
  };
  return { Provider, useModel };
};
```

更进一步，我们再导出一个 useModel 函数，如下:

```tsx | pure
export const useModel = <Value, State = void>(
  model: Model<Value, State>,
): Value => {
  return model.useModel();
};
```

到目前为止，我们的整个状态管理工具就完成啦，使用起来也很简单，很多轻量的共享状态项目当中我们也就再也不需要使用像 Redux 这样的比较复杂的状态管理工具了。

在线示例:

<code src="./Demo.zh-CN.tsx"></code>

当然这个想法也并不是我本人想的，文末已注明来源，本文对源码做了一遍分析。

[源码地址](https://github.com/eveningwater/code-segment-react/docs/model/model.zh-CN.md)

> PS: 本文源码来自[unstated-next](https://github.com/jamiebuilds/unstated-next/blob/master/src/unstated-next.tsx)。
