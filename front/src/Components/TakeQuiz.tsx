import axios, { AxiosResponse } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Question } from "./utils";
import { useContext, useEffect, useState } from "react";
import { Input } from "@mui/joy";
import { Button } from "@mui/material";
import { AuthContext } from "../authContext";


function TakeQuiz() {

    const { quizID } = useParams();
    let quizIDN: number;
    if (quizID) quizIDN = parseInt(quizID);

    const [questions, setQuestions] = useState<Question[]>([]);
    const quizLength: number = questions.length;

    const [questionIndex, setQuestionIndex] = useState<number>(-1);
    const [questionQuestion, setQuestionQuestion] = useState<string>("");
    const [questionAnswer, setQuestionAnswer] = useState<string>("");
    const [questionOptions, setQuestionOptions] = useState<string[]>([]);
    const [questionScore, setQuestionScore] = useState<number>(0);

    const [currentQuestionType, setCurrentQuestionType] = useState<string>("");

    const [answer, setAnswer] = useState<string>("");
    const [questionScores, setQuestionScores] = useState<number[]>([]);

    const { user, auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // if (!auth) navigate("/");
        (async () => {
            const res: AxiosResponse<{questions: Question[]}> = await axios.get(`/api/questions/${quizID}`);
            console.log(res.data.questions);
            setQuestions(res.data.questions);
            setQuestionIndex(0);
        })();
    }, [])

    useEffect(() => {
        if (questionIndex >= 0 && questionIndex < quizLength) {
            setQuestionQuestion(questions[questionIndex].question);
            setQuestionAnswer(questions[questionIndex].answer);
            setQuestionOptions(questions[questionIndex].options);
            setQuestionScore(questions[questionIndex].score);

            // if (questionOptions.length === 0) {
            //     setCurrentQuestionType("input");
            // }
            // else if (questionOptions[0] == "True" && questionOptions[1] == "False") {
            //     setCurrentQuestionType("true-false");
            // }
            // else {
            //     setCurrentQuestionType("multiple-choice");
            // }
        }
    }, [questionIndex]);

    if (questionIndex < quizLength) {
        return (
            <>
                <Link to={"/dashboard"}>Quit Without Saving</Link>
                <h1>{questionIndex + 1}: {questionQuestion} - {questionScore} Points</h1>
                {questionOptions.length == 0 ? 
                    <>
                        <Input value={answer} onChange={(e) => setAnswer(e.target.value)}></Input> 
                        <Button onClick={() => {
                            const currentScores = questionScores;
                            answer == questionAnswer ? currentScores.push(questionScore) : currentScores.push(0);
                            setAnswer("");
                            setQuestionScores(currentScores);
                            setQuestionIndex(questionIndex + 1);
                        }}>Submit Answer</Button>
                    </> :
                    questionOptions.map((option) => (
                        <>
                            <Button onClick={() => {
                                const currentScores = questionScores;
                                option == questionAnswer ? currentScores.push(questionScore) : currentScores.push(0);
                                setQuestionScores(currentScores);
                                setQuestionIndex(questionIndex + 1);
                            }}>{option}</Button>
                        </>
                    ))}
            </>
        )
    }
    else {
        const playerScore: number = questionScores.reduce((acc, currentValue) => {return acc + currentValue}, 0);
        const totalScore: number = questions.map((question) => question.score).reduce((acc, currentValue) => {return acc + currentValue}, 0);
        const percentage: number = playerScore/totalScore;
        console.log(playerScore, totalScore, questionScores);
        return (
            <>
                <h1>Total Score: {playerScore} | {(percentage*100).toFixed(2)}%</h1>
                <h2>Score by Question</h2>
                {questionScores.map((score, index) => {
                    <h3>{index + 1} - {score}</h3>
                })}

                {percentage < 0.5 && <h2>That was terrible, sorry. Try again!</h2>}
                {percentage >= 0.5 && percentage < 0.75 && <h2>Eh, that wasn't too bad. You should definitely brush up on the topic!</h2>}
                {percentage >= 0.75 && percentage < 0.90 && <h2>Nice try! You'll get even better next time!</h2>}
                {percentage >= 0.90 && percentage < 1 && <h2>Wow, almost perfect!</h2>}
                {percentage == 1 && <h2>Wow, a perfect score! Congratulations, that's impressive!</h2>}
                <Button onClick={async () => {
                    console.log({ username: user, score: totalScore, quizid: quizIDN });
                    await axios.post("/api/quizscores", { username: user, score: playerScore, quizid: quizIDN, maxscore: totalScore });
                    navigate("/dashboard"); // Navigate to new page: /leaderboard/:quizID maybe?
                }}>Save and Exit</Button>
            </>
        )
    }
            
}

export default TakeQuiz;