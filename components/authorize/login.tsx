import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SmsModal from "./sms-code-modal";
import EmailCode from "./email-code-modal";
import LoginPhone from "./login-phone";
import LoginEmail from "./login-email";

function Login(): JSX.Element {
  const [radio, setRadio] = useState(-1);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  useEffect(() => {
    if (radio === 0) {
      setShowModal1(true);
    }
    if (radio === 1) {
      setShowModal2(true);
    }
    if (radio === 2) {
      setShowModal3(true);
    }
    if (radio === 3) {
      setShowModal4(true);
    }
  }, [radio]);

  return (
    <>
      <Button
        className="btn_grey ms-4 rounded-4 height-3 px-3"
        onClick={() => setShowModal1(true)}
      >
        <span className="text_size">Войти</span>
      </Button>

      <LoginPhone
        show={showModal1}
        onClose={() => setShowModal1(!showModal1)}
        onBack={(value:number) => setRadio(value)}
      />
      <SmsModal
        show={showModal2}
        onClose={() => setShowModal2(!showModal2)}
        onBack={(value:number) => setRadio(value)}
      />

      {/* <LoginEmail
        show={showModal3}
        onClose={() => setShowModal3(!showModal3)}
        onBack={(value:number) => setRadio(value)}
      />
      <EmailCode
        show={showModal4}
        onClose={() => setShowModal4(!showModal4)}
        onBack={(value:number) => setRadio(value)}
      />
       */}
    </>
  );
}

export default Login;
