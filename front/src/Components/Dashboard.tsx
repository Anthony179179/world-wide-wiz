import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import NavBar from "./NavBar";
import FriendsList from "./FriendsList";
import QuizzesGallery from "./QuizzesGallery";

function Dashboard() {
  const { auth, user } = useContext(AuthContext);

  const [temp, setTemp] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    auth ? setTemp(`Hello, ${user}!`) : navigate("/");
  }, [auth]);

  return (
    <>
      <NavBar helloText={temp} />
      <QuizzesGallery />
      <FriendsList />
    </>
  );
}

export default Dashboard;
