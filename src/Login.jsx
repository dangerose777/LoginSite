import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Login.css';
import axios from "axios";

function Login() {

  const [toggleForm, setToggleForm] = useState(true);
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Password:", password);

    try {
      const response = await axios.post("http://localhost:8000/login.php", {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response.data);
    
      if (response.data.success) {
        const { id, is_admin } = response.data;
        const isAdmin = parseInt(is_admin, 10) === 1;

        localStorage.setItem("user", JSON.stringify({ id, username, is_admin: isAdmin }));
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }
      else {
        setError(response.data.message);
      }
    }
    catch (error) {
      console.error("Login error: ", error);
      setError("Server Error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8000/register.php", {
        username,
        password
      });

      if (response.data.success) {
        setMessage("User added");
        setToggleForm(true);
      }
      else {
        setError(response.data.message);
      }
    }
    catch (error) {
      console.error("Registration error: ", error);
      setError("Server Error")
    }
  };

  const handleToggleForm = (e) => {
    e.preventDefault();
    setToggleForm(!toggleForm);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/dbGet.php")
      .then(response => {
        setUsers(response.data);
      })
    .catch(error => {
      console.log("Data Error", error);
    });
  }, []);

  return (
    <>
    {toggleForm &&
    <form id="form" onSubmit={handleLogin}>
        <h1>Sign in</h1>
        <input type="text" className="form-control" id="inputUsername" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        <div className="password-container">
            <input 
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="inputPassword"
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />} {}
            </span>
          </div>
        {error && <p id="loginError">{error}</p>}
        <button type="submit" className="btn btn-success buttonLogin">Login</button>
        <p id="orTextLogin">or</p>
        <button className="btn btn-secondary buttonOrRegister" onClick={handleToggleForm}>Register</button>
    </form>}
    {!toggleForm &&
    <form id="form" onSubmit={handleRegister}>
        <h1>Sign up</h1>
        <input type="text" className="form-control" id="inputUsername" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        <div className="password-container">
            <input 
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="inputPassword"
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />} {}
            </span>
          </div>
        {error && <p id="loginError">{error}</p>}
        {message && <p id="loginError">{message}</p>}
        <button type="submit" className="btn btn-success buttonLogin">Register</button>
        <p id="orTextRegister">or</p>
        <button className="btn btn-secondary buttonOrLogin" onClick={handleToggleForm}>Login</button>
    </form>}

    <div className="usersList">
      <h1>Users:</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} {user.password}</li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default Login;