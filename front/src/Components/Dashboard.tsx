import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import NavBar from "./NavBar";
import FriendsList from "./FriendsList";
import QuizzesGallery from "./QuizzesGallery";
import axios from "axios";
import { QuizScore } from "./utils";

interface Quiz {
  description: string;
  id: number;
  name: string;
  pregenerated: boolean;
  username: string | null;
}

function Dashboard() {
  const { auth, user } = useContext(AuthContext);

  const [temp, setTemp] = useState<string>("");
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    auth ? setTemp(`Hello, ${user}!`) : navigate("/");
  }, [auth]);

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get("/api/quizzes");

        if (response.status == 200) {
          setQuizzes(response.data.quizzes);
        }
      } catch (error) {
        //TODO: Implement error handling
        console.log("ERROR HAS BEEN ENCOUNTERED:");
        console.log(error);
      }
    })();

    (async () => {
      try {
        let response = await axios.get(`/api/quizscores/${user}`);

        if (response.status == 200) {
          const quizzesData = response.data.quizscores.map(
            ({
              quizid,
              quiz: { name, description },
            }: {
              quizid: number;
              quiz: Quiz;
            }) => ({
              quizid: quizid,
              name: name,
              description: description,
              score: 0, //TODO: change the score once the score column is added to QuizScore table
            })
          );
          setQuizScores(quizzesData);
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
      <h3>Quizzes from us</h3>
      <QuizzesGallery quizzes={quizzes.filter((quiz) => quiz.pregenerated)} />
      <h3>Quizzes from users</h3>
      <QuizzesGallery quizzes={quizzes.filter((quiz) => !quiz.pregenerated)} />
      <h3>Quizzes you've taken</h3>
      <QuizzesGallery quizzes={quizScores} />
      {/* <QuizzesGallery quizzes={} /> */}
      <FriendsList />
    </>
  );
}

export default Dashboard;
