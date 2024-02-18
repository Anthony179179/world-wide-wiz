import express from "express";
import { z } from "zod";

let app = express();

let port = 3000;
let host = "localhost";
let protocol = "http";

app.listen(port, host, () => {
  console.log(`${protocol}://${host}:${port}`);
});

//
// GET REQUESTS
//

// get user by username
app.get("/api/users/:username", async (req, res) => {
  return res.json();
});

// get all quizzes created by a user
app.get("/api/users/:username/quizzes", async (req, res) => {
  return res.json();
});

//get a quiz created by a user from username
app.get("/api/quizzes/:username", async (req, res) => {
  return res.json();
});

// get a user's scores on all quizzes
app.get("/api/quizscores/:username", async (req, res) => {
  return res.json();
});

// get a user's score on a quiz
app.get("/api/quizscores/:username/:quizID", async (req, res) => {
  return res.json();
});

// get a user's score on a quiz question
app.get("/api/questionscores/:username/:questionID", async (req, res) => {
  return res.json();
});

// get a user's scores on all quiz questions of a quiz
app.get("/api/questionscores/:username/:quizID", async (req, res) => {
  return res.json();
});

// get all quizzes
app.get("/api/quizzes", async (req, res) => {
  return res.json();
});

// get quiz based on id of the quiz
app.get("/api/quizzes/:quizId", async (req, res) => {
  return res.json();
});

// get all questions on a quiz
app.get("/api/questions/:quizId", async (req, res) => {
  return res.json();
});

//
// DELETE REQUESTS
//

// delete all quizzes created by user
app.delete("/api/quizzes/:username", async (req, res) => {
  return res.json();
});

// delete a user's quiz by id
app.delete("/api/quizzes/:quizId", async (req, res) => {
  return res.json();
});

// delete a user's quiz score (must delete all scores on all questions in the quiz)
app.delete("/api/quizscores/:username/:quizId", async (req, res) => {
  return res.json();
});

// delete a question on a user's quiz
app.delete("/api/questions/:questionId", async (req, res) => {
  return res.json();
});

// delete all questions on a user's quiz
app.delete("/api/questions/:quizId", async (req, res) => {
  return res.json();
});

//
// POST REQUESTS
//

// login
app.post("/api/login", async (req, res) => {
  return res.json();
});

// logout
app.post("/api/logout", async (req, res) => {
  return res.json();
});

//add a user through signup
app.post("/api/signup", async (req, res) => {
  return res.json();
});

//add a quiz score to a quiz
app.post("/api/quizscores", async (req, res) => {
  return res.json();
});

//add a score to a quiz question
app.post("/api/questionscores", async (req, res) => {
  return res.json();
});

//add a quiz
app.post("/api/quizzes/", async (req, res) => {
  return res.json();
});

//add a question to a quiz
app.post("/api/questions", async (req, res) => {
  return res.json();
});

//
// PUT REQUESTS
//

// edit a user
app.put("api/users", async (req, res) => {
  return res.json();
});

// edit a quiz score to a user's quiz
app.put("/api/quizscores", async (req, res) => {
  return res.json();
});

// edit a score to a quiz question
app.put("/api/questionscores", async (req, res) => {
  return res.json();
});

// edit a quiz
app.put("/api/quizzes/", async (req, res) => {
  return res.json();
});

// edit a question to a quiz
app.put("/api/questions", async (req, res) => {
  return res.json();
});
