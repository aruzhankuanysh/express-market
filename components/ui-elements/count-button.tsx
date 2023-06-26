import { useState } from "react";
import { Button } from "react-bootstrap";

const Counter = ({ increment, decrement, count = 0 }: { increment: Function, decrement: Function, count: number }): JSX.Element => {
  return (
    <>
      {count > 0 ? 
      <div style={{minWidth:'80px', }} className=" rounded-5 w-100 text-light counter_button ">
        <button className=" mobile-text m-0 p-0 count" onClick={(e) => {e.stopPropagation(); decrement();}}><span className="ms-2 " >-</span></button>
           <span style={{fontSize:"20px"}} className="mobile-text">{count} </span>
        <button className="mobile-text m-0 p-0 count " style={{}} onClick={(e) => {e.stopPropagation(); increment();}}><span className="me-2 ">+</span></button>
      </div> :
        <button onClick={(e) => {
          e.stopPropagation();
          increment();
        }} className="rounded-5  w-100 py-2 py-sm-3 counter_button "
            style={{minWidth:'80px', display:"flex", justifyContent:"center",maxHeight:"45px", border:'none', background:'white', boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.25)"}}
        >
          <h4 className="mobile-text mt-1">В корзину</h4>
        </button>}
    </>
  );
};

export default Counter;
