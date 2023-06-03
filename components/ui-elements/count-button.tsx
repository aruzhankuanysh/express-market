import { useState } from "react";
import { Button } from "react-bootstrap";

const Counter = ({ increment, decrement, count = 0 }: { increment: Function, decrement: Function, count: number }): JSX.Element => {
  return (
    <>
      {count > 0 ? 
      <div className="rounded-4 w-100 text-light counter_button py-2 ">
        <button className=" mobile-text ms-0 ps-0 count" onClick={(e) => {e.stopPropagation(); decrement();}}>-</button>
        <span className="mobile-text">{count} шт.</span>
        <button className="mobile-text ms-0 ps-0 count" onClick={(e) => {e.stopPropagation(); increment();}}>+</button>
      </div> :
        <Button onClick={(e) => {
          e.stopPropagation();
          increment();
        }} className="btn_orange_gradient rounded-4 w-100 text-light py-2 py-sm-3 "
            style={{minWidth:'100px', display:"flex", justifyContent:"center", boxSizing:"border-box",}}
        >
          <h4 className="mobile-text m-auto">В корзину</h4>
        </Button>}
    </>
  );
};

export default Counter;
