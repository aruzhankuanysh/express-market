import { useState } from "react";

const Counter = (): JSX.Element => {
  const [count, setCount] = useState(0);

  const decrement = () => {
    setCount(count - 1);
  };
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      < div className="counter_button">
        <button className="ms-3" onClick={decrement}>-</button>
        <span>{count} шт.</span>
        <button className="me-3" onClick={increment}>+</button>
      </div>
    </>
  );
};

export default Counter;
