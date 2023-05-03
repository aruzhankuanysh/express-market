import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function AdressBar(): JSX.Element {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button id="adress_bar" className="input rounded-4 height-3 ms-4" onClick={handleShow}></Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default AdressBar;