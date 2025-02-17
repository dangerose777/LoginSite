import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Strona About</h1>
      <Link to="/">
        <button>Wróć do Strony Głównej</button>
      </Link>
    </div>
  );
}

export default Home;
