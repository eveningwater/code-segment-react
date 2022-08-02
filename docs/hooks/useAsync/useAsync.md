| title               | tags                | firstSeen | lastUpdated |
| ------------------- | ------------------- | --------- | ----------- |
| React useAsync hook | hooks,state,reducer | 2022/8/2  | 2022/8/2    |

Handles asynchronous calls.

- Create a custom hook that takes a handler function, handler.
- Define a reducer function and an initial state for the custom hook's state.
- Use the useReducer() hook to initialize the state variable and the dispatch function.
- Define an asynchronous run function that will run the provided callback, handler, while using dispatch to update state as necessary.
- Return an object containing the properties of state (value, error and loading) and the run function.
