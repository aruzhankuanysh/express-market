import { useState } from "react";

const Counter = ({increment, decrement, count = 0}:{increment: Function, decrement: Function, count: number}): JSX.Element => {
  return (
    <>
      < div className="counter_button">
        <button className="ms-3" onClick={() => decrement()}>-</button>
        <span>{count} шт.</span>
        <button className="me-3" onClick={() => increment()}>+</button>
      </div>
    </>
  );
};

export default Counter;
