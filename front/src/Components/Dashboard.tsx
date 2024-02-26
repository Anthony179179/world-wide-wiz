import { Button } from "@mui/joy";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";

function Dashboard() {

    const { auth, user, setAuth, setUser } = useContext(AuthContext);

    const [temp, setTemp] = useState<string>("")

    const navigate = useNavigate();

    useEffect(() => {
        auth ? setTemp(`You're logged in, ${user}!`) : navigate("/");
    }, [auth])

    async function handleLogout() {
        let logoutRes = await axios.post("/api/logout");
        console.log(logoutRes.status);
        if (logoutRes.status === 200) {
            setUser(null);
            setAuth(false);
            navigate("/");
        }
    }

    return (
        <>
            <h2>{temp}</h2>
            <Link to={"/"}>Go to Homepage    </Link>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    )

}

export default Dashboard