import Image from "react-bootstrap/Image";

function BurgMenu(): JSX.Element {
  return (
    <>
      <button className="burger_menu">
        <Image className="burger_menu_image" src="img/burger.svg" />
      </button>
    </>
  );
}

export default BurgMenu;
