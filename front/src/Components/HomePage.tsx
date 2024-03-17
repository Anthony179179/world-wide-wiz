import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../authContext";
import NavBar from "./NavBar";

function HomePage() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <NavBar helloText="" loggedIn={false}></NavBar>
      <div style={{ height: "100vh" }}>
        <div
          style={{
            backgroundImage: "url(/earth.jpg)",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          <h1>Welcome!</h1>
          <Link
            style={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              margin: "10px",
            }}
            to={auth ? "/dashboard" : "/login"}
          >
            {" "}
            Log In{" "}
          </Link>
          <Link
            style={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              margin: "10px",
            }}
            to={auth ? "/dashboard" : "/signup"}
          >
            {" "}
            Sign Up{" "}
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
