import React, { useState } from 'react';
import { createModel } from './createModel';
import { Space, Button } from 'antd';

function useCounter(initialState = 0) {
  let [count, setCount] = useState(initialState);
  let decrement = () => setCount(count - 1);
  let increment = () => setCount(count + 1);
  return { count, decrement, increment };
}

let Counter = createModel(useCounter);

function CounterDisplay() {
  let counter = Counter.useModel();
  return (
    <Space wrap>
      <Button onClick={counter.decrement}>-</Button>
      <span>{counter.count}</span>
      <Button onClick={counter.increment}>+</Button>
    </Space>
  );
}

function Demo() {
  return (
    <Counter.Provider>
      <CounterDisplay />
      <Counter.Provider initialState={2}>
        <div>
          <div>
            <CounterDisplay />
          </div>
        </div>
      </Counter.Provider>
    </Counter.Provider>
  );
}

export default Demo;
