### Handwritten a mini version of the React state management tool

Currently in React, there are many and various state management tools, such as:

- [React Redux](https://react-redux.js.org/)
- [Mobx](https://mobx.js.org/README.html)
- [Hox](https://github.com/umijs/hox)

Each state management tool has different APIs and usage methods, and has a certain learning cost, and these state management tools also have a certain degree of complexity, and they are not extremely simple. In the eyes of developers, only if it is easier to use, more people will use it. Isn't Vue popular because it is easy to use and quick to use?

Sometimes we only need a global state, and it is enough to prevent some states and functions that change the state, which also achieves the principle of simplification.

Let's implement one of the simplest state management tools together.

The core of this state management tool uses the [Context API](https://reactjs.org/docs/context.html). Before understanding this article, you must first understand and be familiar with the usage of this API.

First, let's look at how this state management tool is used. Suppose there is a counter state, and then we modify the counter by two methods, that is, addition and subtraction. In other words, we need to use a counter state and two methods to modify this state. In React functional components, we use the useState method to initialize a state, so we can easily write the following code:

```tsx | pure
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

Now, let's create a component to use this useCounter hook function as follows:

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

Then use it in the root component App, as follows:

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

So, a counter component is done, but is that really all there is to it?

First of all, we should know that the state of the counter component should be consistent, that is to say, our counter component should share the same state, so how to share the same state? At this time, Context is needed. After transforming the above components, we initialize the state in the root component App and pass it to the child components. First modify the code of the App root component as follows:

Create a new `CounterContext.ts` file with the following code:

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

Then in the Counter component code we also modify it as follows:

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

This way, we can share the count state, no matter how deep the child component is, but that's not the end, let's move on.

Although this use solves the problem of shared state, we found that we need to pass in an additional context name when using it, so we need to wrap it up. In the end, we only need to use it like the following:

```ts | pure
const Counter = createModel(useCounter);
export default Counter;
```

```tsx | pure
const { Provider, useModel } = Counter;
```

Then our App component should look like this:

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

Continue to modify our Counter component as follows:

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

Through the display of the above code, we actually understand that we just built useContext and createContext into our encapsulated Model.

Next, we will unveil the mystery of this state management tool. First, we need to use the API related to React, so we need to import it. as follows:

```tsx | pure
// Import the type
import type { ReactNode, ComponentType } from 'react';
import { createContext, useContext } from 'react';
```

Next, define a unique identifier to determine the incoming Context, and this is used to determine that the user uses the Context correctly.

```tsx | pure
const EMPTY: unique symbol = Symbol();
```

Next we need to define the type of provider. as follows:

```tsx | pure
export interface ModelProviderProps<State = void> {
  initialState?: State;
  children: ReactNode;
}
```

Above we have defined the state type of context, which is a generic type. The parameter is the type of state. It is initialized to undefined by default, and a type of children is defined. Because the child node of Provider is a React node, it is also defined as ReactNode. type.

Then there is our Model type, as follows:

```tsx | pure
export interface Model<Value, State = void> {
  Provider: ComponentType<ModelProviderProps<State>>;
  useModel: () => Value;
}
```

This is also easy to understand, because the Model exposes two things, the first is the Provider, and the second is the useContext, just by changing the name, it is enough to define the types of these two.

Next is the implementation of our core function createModel function. Let's go step by step. First of all, of course, define this function, pay attention to the type, as follows:

```tsx | pure
export const createModel = <Value, State = void>(
  useHook: (initialState?: State) => Value,
): Model<Value, State> => {
  //core code
};
```

The above functions are difficult to understand should be the definition of the type. Our createModel function passes in a hook function, the hook function passes in a state as a parameter, and then the return value is the Model generic type we defined, and the parameter is the type we defined. Generics of functions.

Next, what we need to do is to create a context, as follows:

```tsx | pure
//create a context
const context = createContext<Value | typeof EMPTY>(EMPTY);
```

Then we need to create a Provider function, which is essentially a React component, as follows:

```tsx | pure
const Provider = (props: ModelProviderProps<State>) => {
  // The ModelProvider used here is mainly because it cannot conflict with the defined function name
  const { Provider: ModelProvider } = context;
  const { initialState, children } = props;
  const value = useHook(initialState);
  return <ModelProvider value={value}>{children}</ModelProvider>;
};
```

It is also well understood here. In fact, it is to get the initial state and child nodes through the parent component, get the Provider component from the context, and then return it. Note that our value is the value wrapped by the incoming custom hook function.

In the third step, we need to define a hook function to get this custom Context, as follows:

```tsx | pure
const useModel = (): Value => {
  const value = useContext(context);
  // Here to determine whether the user is using the Provider correctly
  if (value === EMPTY) {
    //Throw an exception, the user does not wrap the component with Provider
    throw new Error('Component must be wrapped with <Container.Provider>');
  }
  // Return the context
  return value;
};
```

The implementation of this function is also well understood, that is, to get the context, determine whether the context is used correctly, and then return.

Finally, we return these two things inside this function, that is, return the two functions of Provider and useModel. as follows:

```tsx | pure
return { Provider, useModel };
```

Combine all the above codes, and the createModel function is done.

Finally, we merge all the code and the state management tool is complete.

```tsx | pure
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
  const context = createContext<Value | typeof EMPTY>(EMPTY);
  const Provider = (props: ModelProviderProps<State>) => {
    const { Provider: ModelProvider } = context;
    const { initialState, children } = props;
    const value = useHook(initialState);
    return <ModelProvider value={value}>{children}</ModelProvider>;
  };
  const useModel = (): Value => {
    const value = useContext(context);
    if (value === EMPTY) {
      throw new Error('Component must be wrapped with <Container.Provider>');
    }
    return value;
  };
  return { Provider, useModel };
};
```

Going a step further, we export a useModel function as follows:

```tsx | pure
export const useModel = <Value, State = void>(
  model: Model<Value, State>,
): Value => {
  return model.useModel();
};
```

So far, our entire state management tool is complete, and it is very simple to use. In many lightweight shared state projects, we no longer need to use more complex state management tools like Redux.

Demo:

<code src="./Demo.tsx"></code>

Of course, this idea is not my own. The source has been indicated at the end of the article. This article has made an analysis of the source code.

[source code](https://eveningwater.github.io/code-segment-react/model/model)

> PS: The source code of this article comes from [unstated-next](https://github.com/jamiebuilds/unstated-next/blob/master/src/unstated-next.tsx).
