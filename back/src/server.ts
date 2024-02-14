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

// get user by id
app.get("/api/users/:userId", async (req, res) => {
  return res.json();
});

// get all quizzes created by a user
app.get("/api/users/:userId/quizzes", async (req, res) => {
  return res.json();
});

//get a quiz created by a user from id
app.get("/api/users/:userId/quizzes/:quizId", async (req, res) => {
  return res.json();
});

// get a user's scores on all quizzes
app.get("api/users/:userId/quizzes/scores", async (req, res) => {
  return res.json();
});

// get a user's score on a quiz
app.get("api/users/:userId/quizzes/:quizId/scores", async (req, res) => {
  return res.json();
});

// get a user's score on a quiz question
app.get(
  "api/users/:userId/quizzes/:quizId/questions/:questionId/scores",
  async (req, res) => {
    return res.json();
  }
);

// get a user's scores on all quiz questions of a quiz
app.get(
  "api/users/:userId/quizzes/:quizId/questions/scores",
  async (req, res) => {
    return res.json();
  }
);

// get all quizzes
app.get("/api/quizzes", async (req, res) => {
  return res.json();
});

// get quiz based on id of the quiz
app.get("/api/quizzes/:quizId", async (req, res) => {
  return res.json();
});

// get all questions on a quiz
app.get("api/quizzes/:quizId/questions", async (req, res) => {
  return res.json();
});

//
// DELETE REQUESTS
//

// delete all quizzes created by user
app.delete("api/users/:userId/quizzes", async (req, res) => {
  return res.json();
});

// delete a user's quiz by id
app.delete("api/users/:userId/quizzes/:quizId", async (req, res) => {
  return res.json();
});

// delete a user's quiz score (must all delete all scores on all questions in the quiz)
app.delete("api/users/:userId/quizzes/:quizId/scores", async (req, res) => {
  return res.json();
});

// delete a question on a user's quiz
app.delete(
  "api/users/:userId/quizzes/:quizId/questions/:questionId",
  async (req, res) => {
    return res.json();
  }
);

// delete all questions on a user's quiz
app.delete("api/users/:userId/quizzes/:quizId/questions", async (req, res) => {
  return res.json();
});

//
// POST REQUESTS
//

app.post("/api/login", async (req, res) => {
  return res.json();
});

app.post("/api/logout", async (req, res) => {
  return res.json();
});

//add a user
app.post("api/users/", async (req, res) => {
  return res.json();
});

//add a user's quiz
app.post("api/users/:userId/quizzes/", async (req, res) => {
  return res.json();
});

//add a user's quiz question
app.post("api/users/:userId/quizzes/:quizId/questions", async (req, res) => {
  return res.json();
});

//add a quiz score to a user's quiz
app.post("api/users/:userId/quizzes/:quizId/scores", async (req, res) => {
  return res.json();
});

//add a score to user's quiz's question
app.post(
  "api/users/:userId/quizzes/:quizId/questions/:questionId/scores",
  async (req, res) => {
    return res.json();
  }
);

//add a quiz
app.post("api/quizzes/", async (req, res) => {
  return res.json();
});

//add a question to a quiz
app.post("api/quizzes/:quizId/questions", async (req, res) => {
  return res.json();
});

//
// PUT REQUESTS
//

// edit a user
app.put("api/users/:userId", async (req, res) => {
  return res.json();
});

// edit a user's quiz
app.put("api/users/:userId/quizzes/", async (req, res) => {
  return res.json();
});

// edit a user's quiz question
app.put("api/users/:userId/quizzes/:quizId/questions", async (req, res) => {
  return res.json();
});

// edit a quiz score to a user's quiz
app.put("api/users/:userId/quizzes/:quizId/scores", async (req, res) => {
  return res.json();
});

// edit a score to user's quiz's question
app.put(
  "api/users/:userId/quizzes/:quizId/questions/:questionId/scores",
  async (req, res) => {
    return res.json();
  }
);

// edit a quiz
app.put("api/quizzes/", async (req, res) => {
  return res.json();
});

// edit a question to a quiz
app.put("api/quizzes/:quizId/questions", async (req, res) => {
  return res.json();
});
