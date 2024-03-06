import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import NavBar from "./NavBar";
import FriendsList from "./FriendsList";
import QuizzesGallery from "./QuizzesGallery";
import axios from "axios";
function Dashboard() {
  const { auth, user } = useContext(AuthContext);

  const [temp, setTemp] = useState<string>("");
  const [quizScores, setQuizScores] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    auth ? setTemp(`Hello, ${user}!`) : navigate("/");
  }, [auth]);

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(`/api/quizscores/${user}`);

        if (response.status == 200) {
          console.log(response.data.quizscores);
          setQuizScores(response.data.quizscores);
        }
      } catch (error) {
        //TODO: Implement error handling
        console.log("ERROR HAS BEEN ENCOUNTERED:");
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <NavBar helloText={temp} />
      <QuizzesGallery />
      <QuizzesGallery />
      <FriendsList />
    </>
  );
}

export default Dashboard;
