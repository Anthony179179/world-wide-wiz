import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Question } from "./utils";
import { Input } from "@mui/joy";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


function CreateQuiz() {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [refresh, setRefresh] = useState<number>(0);

    type QuestionType = "multiple-choice" | "true-false" | "input"

    const [numOptions, setNumOptions] = useState(4);

    const [newQuestionType, setNewQuestionType] = useState<string>("multiple-choice")
    const [newQuestionQuestion, setNewQuestionQuestion] = useState<string>("");
    const [newQuestionAnswer, setNewQuestionAnswer] = useState<string>("");
    const [newQuestionScore, setNewQuestionScore] = useState<number>(10);
    const [newQuestionOptions, setNewQuestionOptions] = useState<string[]>([]);

    const { auth, currentQuiz } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (!auth) {
                navigate("/login");
            }
            let res = await axios.get(`/api/questions/${currentQuiz}`);
            console.log("Questions:", res.data.questions);
            setQuestions(res.data.questions);
        })();
    }, [refresh])

    
    async function handleSubmit() {
        if (newQuestionType == "true-false") {
            await axios.post("/api/questions", { question: newQuestionQuestion, answer: newQuestionAnswer, options: ["True", "False"], quizId: currentQuiz, score: newQuestionScore, order: -1 });
        }
        else {
            await axios.post("/api/questions", { question: newQuestionQuestion, answer: newQuestionAnswer, options: newQuestionOptions, quizId: currentQuiz, score: newQuestionScore, order: -1 });
            setNewQuestionAnswer("");
            setNewQuestionOptions([]);
        }
        setNewQuestionScore(NaN);
        setNewQuestionQuestion("");
        setRefresh(refresh + 1);
    }

    // Add styling and drag and drop functionality with react-beautiful-dnd
    // Upload image functionality to associate with a specific question
    // Edit Question Button --> Maybe add same layout with inputs for questions???

    return (
        <div className="container">
            <Link to={"/myquizzes"}>Back</Link>
            <h3>Current Quiz ID: {currentQuiz}</h3>
            {questions.map((question) => {
                return (
                <>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <h2>Question: {question.question}</h2>
                    <h2>Answer: {question.answer}</h2>
                    <h3>Options: {question.options.map((option) => option)}</h3>
                    <h3>Points: {question.score}</h3>
                    <Button onClick={async () => {
                        await axios.delete(`/api/questions/${question.id}`);
                        setRefresh(refresh + 1);
                    }}>Delete</Button>
                </Box>
                </>
                )
            })}
            <h2>Create New Question</h2>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "end", gap: "1.5vw"}}>
                <div>
                    <h3>Question</h3>
                    <Input value={newQuestionQuestion} onChange={(e) => setNewQuestionQuestion(e.target.value)}></Input>
                </div>
                <div>
                    <h3>Answer</h3>
                    {newQuestionType == "true-false" ? 
                    <Box sx={{ width: "10vw" }}>
                        <FormControl fullWidth>
                            <Select
                                id="question-type"
                                value={newQuestionAnswer}
                                onChange={(e) => typeof(e.target.value) == "string" && setNewQuestionAnswer(e.target.value)}
                            >
                                <MenuItem value={"True"}>True</MenuItem>
                                <MenuItem value={"False"}>False</MenuItem>
                            </Select>
                        </FormControl>
                    </Box> : <Input value={newQuestionAnswer} onChange={(e) => setNewQuestionAnswer(e.target.value)}></Input>}
                </div>
                <div>
                    <h3>Score</h3>
                    <Input value={newQuestionScore}  type="number" onChange={(e) => setNewQuestionScore(parseInt(e.target.value))}></Input>
                </div>
                {/* Dropdown or Selection Button/Menu: Multiple Choice, True/False, Input  */}
                <Box sx={{ width: "10vw" }}>
                    <FormControl fullWidth>
                        <InputLabel id="question-type-label">Question Type</InputLabel>
                        <Select
                            labelId="question-type-label"
                            id="question-type"
                            value={newQuestionType}
                            label="Question Type"
                            onChange={(e) => typeof(e.target.value) == "string" && setNewQuestionType(e.target.value)}
                        >
                            <MenuItem value={"multiple-choice"}>Multiple Choice</MenuItem>
                            <MenuItem value={"true-false"}>True/False</MenuItem>
                            <MenuItem value={"input"}>Input</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                
                {/* For multiple choice, have an input field for number of choices (up to 8 probably for user experience)
                <Box sx={{ width: "8vw" }}>
                    <FormControl fullWidth>
                        <InputLabel id="num-options-label">Number of Options</InputLabel>
                        <Select
                            labelId="num-options-label"
                            id="num-options"
                            value={numOptions}
                            label="Number of Options"
                            onChange={(e) => (typeof(e.target.value) == "number") ? setNumOptions(e.target.value) : setNumOptions(parseInt(e.target.value))}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>
                </Box> */}
            </Box>

            {newQuestionType == "multiple-choice" && <div><h2>Options (Comma-separated)</h2><Input value={newQuestionOptions} onChange={(e) => setNewQuestionOptions(e.target.value.split(","))}></Input></div>}

            
           
            

            <Button onClick={handleSubmit}>Create New Question</Button>
            
        </div>
    )
}

export default CreateQuiz;