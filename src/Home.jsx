import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))

  if(!user) {
    navigate("/");
  }

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <Link to="/">
        <button className="btn btn-danger" onClick={() => localStorage.removeItem("user")}>Logout</button>
      </Link>
    </div>
  );
}

export default Home;