import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../authContext";
import NavBar from "./NavBar";

function HomePage() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <NavBar helloText="" loggedIn={false}></NavBar>
      <h2>Welcome to the homepage!</h2>
      <Link to={auth ? "/dashboard" : "/login"}> Log In </Link>
      <Link to={auth ? "/dashboard" : "/signup"}> Sign Up </Link>
    </>
  );
}

export default HomePage;
