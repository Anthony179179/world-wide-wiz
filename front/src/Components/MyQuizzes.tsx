import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Quiz } from "./utils";
import { Alert, Button, Snackbar } from "@mui/material";
import { Input } from "@mui/joy";


function MyQuizzes() {

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    
    const [newQuizTitle, setNewQuizTitle] = useState<string>("");
    const [newQuizDescription, setNewQuizDescription] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const { auth, user, setCurrentQuiz } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (!auth) navigate("/login");
            let res = await axios.get(`/api/quizzes/${user}`);
            setQuizzes(res.data.quizzes);
        })();
    }, [refresh])

    async function handleSubmit() {
        console.log({ name: newQuizTitle, description: newQuizDescription, username: user });
        let res = await axios.post("/api/quizzes", { name: newQuizTitle, description: newQuizDescription, username: user });
        setRefresh(refresh + 1);
        // Add error handling: if res.status === 201, or not. If not, print error in snackbar component.
        // For now, that's enough
    }

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    return (
        <>
            <Link to={"/dashboard"}>Back</Link>
            <h3>User: {user}</h3>
            <h1>Quizzes</h1>
            {quizzes.map((quiz) => (
                <Button onClick={() => {
                    setCurrentQuiz(quiz.id);
                    navigate("/createquiz");
                }}>{quiz.name}</Button>
            ))}
            <h2>New Quiz</h2>
            <h3>Title</h3>
            <Input value={newQuizTitle} onChange={(e) => setNewQuizTitle(e.target.value)}></Input>
            <h3>Description</h3>
            <Input value={newQuizDescription} onChange={(e) => setNewQuizDescription(e.target.value)}></Input>
            <Button onClick={handleSubmit}>Create New Quiz</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={errorMessage}>
                    <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>{errorMessage}</Alert>
            </Snackbar>
        </>
    )
}

export default MyQuizzes;