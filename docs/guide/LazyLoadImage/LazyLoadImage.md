| title              | tags                    | firstSeen | lastUpdated |
| ------------------ | ----------------------- | --------- | ----------- |
| Lazy-loading image | components,effect,state | 2022/7/20 | 2022/7/20   |

Renders an image that supports lazy loading.

- Use the useState() hook to create a stateful value that indicates if the image has been loaded.
- Use the useEffect() hook to check if the HTMLImageElement.prototype contains 'loading', effectively checking if lazy loading is supported natively. If not, create a new IntersectionObserver and use IntersectionObserver.observer() to observer the `<img>` element. Use the return value of the hook to clean up when the component unmounts.
- Use the useCallback() hook to memoize a callback function for the IntersectionObserver. This callback will update the isLoaded state variable and use IntersectionObserver.disconnect() to disconnect the IntersectionObserver instance.
- Use the useRef() hook to create two refs. One will hold the `<img>` element and the other the IntersectionObserver instance, if necessary.
- Finally, render the `<img>` element with the given attributes. Apply loading='lazy' to make it load lazily, if necessary. Use isLoaded to determine the value of the src attribute.
