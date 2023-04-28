import { Button } from "react-bootstrap";

function Login ():JSX.Element {
    return<>
        <Button className='btn_primary btn_login' size="lg">
           <span className="text_size">Войти</span>
        </Button>
    </>
}

export default Login;
