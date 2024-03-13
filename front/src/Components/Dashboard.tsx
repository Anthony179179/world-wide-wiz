import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import NavBar from "./NavBar";
import FriendsList from "./FriendsList";
import QuizzesCarousel from "./QuizzesCarousel";
import axios from "axios";
import { QuizzesWithScoresLinks } from "./utils";
import { Link } from "react-router-dom";
import { quizIds } from "./utils";
interface Quiz {
  description: string;
  id: number;
  name: string;
  pregenerated: boolean;
  scores: [{ score: number }] | [];
}

const mapQuizzes = (
  quizzes: Quiz[],
  pregenerated: boolean
): QuizzesWithScoresLinks[] =>
  quizzes
    .filter((quiz: Quiz) => quiz.pregenerated === pregenerated)
    .map((quiz: Quiz) => ({
      quizid: quiz.id,
      name: quiz.name,
      description: quiz.description,
      score: quiz.scores.length !== 0 ? quiz.scores[0].score : "Not Taken",
      link: Object.values(quizIds).includes(quiz.id)
        ? `/quiz/${Object.keys(quizIds)
            .find((key) => quizIds[key] === quiz.id)
            ?.replace("_", "/")}`
        : `/quiz/${quiz.id}`,
    }));

function Dashboard() {
  const { auth, user } = useContext(AuthContext);

  const [helloText, setHelloText] = useState<string>("");
  const [quizScores, setQuizScores] = useState<QuizzesWithScoresLinks[]>([]);
  const [pregeneratedQuizzes, setPregeneratedQuizzes] = useState<
    QuizzesWithScoresLinks[]
  >([]);
  const [usergeneratedQuizzes, setUsergeneratedQuizzes] = useState<
    QuizzesWithScoresLinks[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    auth ? setHelloText(`Hello, ${user}!`) : navigate("/");
  }, [auth]);

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(`/api/quizzes/quizscores/${user}`);

        if (response.status == 200) {
          setPregeneratedQuizzes(mapQuizzes(response.data.quizzes, true));
          setUsergeneratedQuizzes(mapQuizzes(response.data.quizzes, false));
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
              link: Object.values(quizIds).includes(quizid)
                ? `/quiz/${Object.keys(quizIds)
                    .find((key) => quizIds[key] === quizid)
                    ?.replace("_", "/")}`
                : `/quiz/${quizid}`,
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
      <NavBar helloText={helloText} />
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
