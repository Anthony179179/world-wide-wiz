import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import NavBar from "./NavBar";
import FriendsList from "./FriendsList";
import QuizzesCarousel from "./QuizzesCarousel";
import axios from "axios";
import { QuizScore } from "./utils";
import { Link } from "react-router-dom";
import { quizIds } from "./utils";
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
  const [pregeneratedQuizzes, setPregeneratedQuizzes] = useState<QuizScore[]>(
    []
  );
  const [usergeneratedQuizzes, setUsergeneratedQuizzes] = useState<QuizScore[]>(
    []
  );

  const navigate = useNavigate();

  useEffect(() => {
    auth ? setTemp(`Hello, ${user}!`) : navigate("/");
  }, [auth]);

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get("/api/quizzes");

        if (response.status == 200) {
          //TODO: make this more efficient
          const pregeneratedQuizzesData: QuizScore[] = response.data.quizzes
            .filter((quiz: Quiz) => quiz.pregenerated)
            .map((quiz: Quiz) => ({
              quizid: quiz.id,
              name: quiz.name,
              description: quiz.description,
              score: null,
            }));
          setPregeneratedQuizzes(pregeneratedQuizzesData);
          const usergeneratedQuizzesData: QuizScore[] = response.data.quizzes
            .filter((quiz: Quiz) => !quiz.pregenerated)
            .map((quiz: Quiz) => ({
              quizid: quiz.id,
              name: quiz.name,
              description: quiz.description,
              score: null,
            }));
          setUsergeneratedQuizzes(usergeneratedQuizzesData);
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
        console.log(response)
        if (response.status == 200) {
          const quizzesData = response.data.quizscores.map(
            ({
              quizid,
              score,
              quiz: { name, description },
            }: {
              quizid: number;
              score: number;
              quiz: Quiz;
            }) => ({
              quizid: quizid,
              name: name,
              description: description,
              score: score, 
              link: Object.values(quizIds).includes(quizid) ? `/quiz/${Object.keys(quizIds).find(key =>
                quizIds[key] === quizid)}` : `/quiz/${quizid}`
            })
          );
          console.log(`/quiz/${quizIds[4]}`);
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
      <Link to="/myquizzes"></Link>
      {pregeneratedQuizzes.length != 0 && (
        <>
          <h3>Quizzes from us</h3>
          <QuizzesCarousel quizzes={pregeneratedQuizzes} />
        </>
      )}

      {usergeneratedQuizzes.length != 0 && (
        <>
          <h3>Quizzes from users</h3>
          <QuizzesCarousel quizzes={usergeneratedQuizzes} />
        </>
      )}

      {quizScores.length != 0 && (
        <>
          <h3>Quizzes you've taken</h3>
          <QuizzesCarousel quizzes={quizScores} />
        </>
      )}

      <FriendsList />
    </>
  );
}

export default Dashboard;
