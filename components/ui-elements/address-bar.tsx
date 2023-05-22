import { useState } from "react";
import Form from "react-bootstrap/Form";

function AdressBar(): JSX.Element {
  const addresses = [
    { id: 0, address: "Улица Пушкина" },
    { id: 1, address: "Золотушкина" },
  ];
  return (
    <>
      <Form.Select
        aria-label="Default select example"
        className="input rounded-4 height-3 ms-4"
        id="adress_bar"
      >
        {addresses.map((addresses) => (
          <option value={addresses.id}>{addresses.address}</option>
        ))}
      </Form.Select>
    </>
  );
}

export default AdressBar;

// id="adress_bar" className="input rounded-4 height-3 ms-4"
