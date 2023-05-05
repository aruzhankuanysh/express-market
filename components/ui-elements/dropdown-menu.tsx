import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import BurgMenu from './burg-button';
import MenuSideNav from '../catalog/menu-side-nav';


function DropdownMenu() {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <Dropdown
      show={show}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Dropdown.Toggle as={BurgMenu}>Каталог</Dropdown.Toggle>
      <Dropdown.Menu className="dropdown_wrapper">
        <MenuSideNav/>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;