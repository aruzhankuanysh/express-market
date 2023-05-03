import { Button } from "react-bootstrap";

function Login ():JSX.Element {
    return<>
        <Button className='btn_grey ms-4 rounded-4 height-3 px-3'>
           <span className="text_size"><h5>Войти</h5></span>
        </Button>
    </>
}

export default Login;