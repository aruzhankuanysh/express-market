 import { Dropdown } from "react-bootstrap";
 import Cart from "../cart";
import { useState } from "react";

function DropdownCart (): JSX.Element {
    const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <Dropdown
      
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Dropdown.Toggle as={Cart}>Каталог</Dropdown.Toggle>
      <Dropdown.Menu show={show} className="dropdown_wrapper">
      </Dropdown.Menu>
    </Dropdown>
    );
}

export default DropdownCart;