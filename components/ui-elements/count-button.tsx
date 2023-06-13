import { useState } from "react";
import { Button } from "react-bootstrap";

const Counter = ({ increment, decrement, count = 0 }: { increment: Function, decrement: Function, count: number }): JSX.Element => {
  return (
    <>
      {count > 0 ? 
      <div style={{minWidth:'100px', minHeight:"45px"}} className=" rounded-4 w-100 text-light counter_button ">
        <button className=" mobile-text m-0 p-0 count" onClick={(e) => {e.stopPropagation(); decrement();}}><span className="ms-2 ">-</span></button>
           <span style={{fontSize:"20px"}} className="mobile-text">{count} шт.</span>
        <button className="mobile-text m-0 p-0 count " style={{}} onClick={(e) => {e.stopPropagation(); increment();}}><span className="me-2 ">+</span></button>
      </div> :
        <button onClick={(e) => {
          e.stopPropagation();
          increment();
        }} className="rounded-4 btn_orange_gradient  w-100 text-light py-2 py-sm-3 counter_button "
            style={{minWidth:'100px', display:"flex", justifyContent:"center",maxHeight:"45px", border:'none'}}
        >
          <h4 className="mobile-text mt-1">В корзину</h4>
        </button>}
    </>
  );
};

export default Counter;
