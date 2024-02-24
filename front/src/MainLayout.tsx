import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <div>
      <h1>Choose a region:</h1>
      <ul>
        <li>
          <Link to="/quiz/europe">Europe</Link>
        </li>
        <li>
          <Link to="/quiz/asia">Asia</Link>
        </li>
        <li>
          <Link to="/quiz/africa">Africa</Link>
        </li>
        <li>
          <Link to="/quiz/americas">Americas</Link>
        </li>
        <li>
          <Link to="/quiz/oceania">Oceania</Link>
        </li>
      </ul>
    </div>
  );
}

function MainLayout() {
  return (
    <>
      <nav>
        <Header></Header>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default MainLayout;
