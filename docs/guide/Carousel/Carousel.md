| title    | tags                             | firstSeen | lastUpdated |
| -------- | -------------------------------- | --------- | ----------- |
| Carousel | components,children,state,effect | 2022/7/13 | 2022/7/13   |

Renders a carousel component.

- Use the useState() hook to create the active state variable and give it a value of 0 (index of the first item).
- Use the useEffect() hook to update the value of active to the index of the next item, using setTimeout().
- Compute the className for each carousel item while mapping over them and applying it accordingly.
- Render the carousel items using React.cloneElement() and pass down ...rest along with the computed className.

```tsx | pure

```

demo:

<code src="./Carousel.tsx"></code>
