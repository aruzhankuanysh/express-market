import { Container, Image } from "react-bootstrap";

function TopMenu(): JSX.Element {
  return (
    <>
      <Container className="top_menu_wrapper mb-5">
        <Container className="image_wrapper" >
          <div >
            <Image className="plate_image" src="menu-plate-1.png"/>
                <p className="top_menu_text">Скидки и кэшбэк</p>
          </div>
        </Container>
        <Container>
            <div className="image_wrapper_side">
                <Image className="plate_image_side" src="menu-plate-2.png"/>
                <p className="top_menu_text_side">Так еще вкуснее</p>

            </div>
            <div className="image_wrapper_side">
                <Image className="plate_image_side" src="menu-plate-3.png"/>
                <p className="top_menu_text_side">Без сахара</p>

            </div>
        </Container>
      </Container>
    </>
  );
}

export default TopMenu;
