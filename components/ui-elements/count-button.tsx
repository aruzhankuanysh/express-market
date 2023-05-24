import { useState } from "react";
import { Button } from "react-bootstrap";

const Counter = ({ increment, decrement, count = 0 }: { increment: Function, decrement: Function, count: number }): JSX.Element => {
  return (
    <>
      {count > 0 ? 
      <div className="rounded-4 w-100 text-light counter_button">
        <Button className="ms-3" onClick={(e) => {e.stopPropagation(); decrement();}}>-</Button>
        <span>{count} шт.</span>
        <Button className="me-3" onClick={(e) => {e.stopPropagation(); increment();}}>+</Button>
      </div> :
        <Button onClick={(e) => {
          e.stopPropagation();
          increment();
        }} className="btn_orange_gradient rounded-4 w-100 text-light py-2">
          <h4>В корзину</h4>
        </Button>}
    </>
  );
};

export default Counter;
