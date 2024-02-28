import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";

function HomePage() {

    const { auth } = useContext(AuthContext);

    return (
        <>
            <h2>Welcome to the homepage!</h2>
            <Link to={auth ? "/dashboard" : "/login"}>  Log In  </Link>
            <Link to={auth ? "/dashboard" : "/signup"}>  Sign Up  </Link>
        </>
    )
}

export default HomePage