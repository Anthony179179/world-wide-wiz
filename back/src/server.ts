import express, { CookieOptions, RequestHandler, Request, Response } from "express";
import { z } from "zod";
import { PrismaClient } from '@prisma/client'
import * as argon2 from "argon2";
import crypto from "crypto";
import cors from 'cors'
import cookieParser from 'cookie-parser'

const prisma = new PrismaClient()

let app = express();

let port = 3000;
let host = "localhost";
let protocol = "http";

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
}));

let authorize: RequestHandler = async (req: Request, res, next) => {
  try {
    let token: string = req.cookies.token;
    if (token === undefined) throw new Error();
    await prisma.token.findFirstOrThrow({ where: { token: token } })
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};

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

let tokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

app.get("/api/logincheck", async (req, res) => {
  let { token } = req.cookies;
  if (token === undefined) {
      return res.sendStatus(401);
  }
  let storedSession = await prisma.token.findFirst({ where: {token: token} });
  if (storedSession === null || storedSession.token === null || storedSession.token === undefined) {
      return res.status(401).clearCookie("token", tokenCookieOptions).send();
  }
  return res.status(200).send(storedSession.username);
})

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  // Zod schema validation
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { username: username } });
    if (!(await argon2.verify(user.password, password))) throw new Error("Username and password don't match");
    const token: string = await crypto.randomBytes(32).toString("hex");
    await prisma.token.create({
      data: {
        username: username,
        token: token
      }
    })
    return res.status(201).cookie("token", token, tokenCookieOptions).cookie("loggedIn", "true").json();
  } catch (error) {
    let err = error as Object;
    return res.status(400).json({ error: err.toString() });
  }
});

// logout
app.post("/api/logout", authorize, async (req, res) => {
  try {
    let token: string = req.cookies.token;
    await prisma.token.deleteMany({ where: { token: token } });
  } catch (err) {
    let error = err as Object;
    return res.status(400).json({ error: error.toString() })
  }
  return res.status(200).clearCookie("token").clearCookie("loggedIn").json();
});

//add a user through signup
app.post("/api/signup", async (req, res) => {
  // Zod schema validation
  const { username, password } = req.body;
  const hashedPassword = await argon2.hash(password);
  let existingUser = await prisma.user.findFirst({ where: { username: username } });
  if (existingUser !== null) return res.status(400).json({ error: "Username already exists" });
  await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword
    }
  })
  return res.sendStatus(201);
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
