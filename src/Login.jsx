import { Link } from "react-router-dom";
import { useState } from 'react';
import './Login.css';

function Login() {

  const [toggleForm, setToggleForm] = useState(true);

  return (
    <>
    {toggleForm &&
    <form id="form">
        <h1>Sign in</h1>
        <input type="text" className="form-control" id="inputUsername" placeholder="Username"/>
        <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
        <Link to="/Home">
            <button className="btn btn-success buttonLogin">Login</button>
        </Link>
        <p id="orTextLogin">or</p>
        <button className="btn btn-secondary buttonOrRegister" onClick={() => setToggleForm(!toggleForm)}>Register</button>
    </form>}
    {!toggleForm &&
    <form id="form">
        <h1>Sign up</h1>
        <input type="text" className="form-control" id="inputUsername" placeholder="Username"/>
        <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
        <Link to="/Home">
            <button className="btn btn-success buttonLogin">Register</button>
        </Link>
        <p id="orTextRegister">or</p>
        <button className="btn btn-secondary buttonOrLogin" onClick={() => setToggleForm(toggleForm)}>Login</button>
    </form>}
    </>
  );
}

export default Login;
