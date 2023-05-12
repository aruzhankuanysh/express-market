import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import MenuSideNav from "../catalog/menu-side-nav";

function DropdownMenu() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Dropdown
      show={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Dropdown.Toggle className="burger_menu" disabled>
        <img className="burger_menu_image" src="img/burger.svg" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown_wrapper">
        <MenuSideNav />
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;