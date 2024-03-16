import { useState, useEffect } from "react";
import { AuthContext } from "../authContext";
import axios from "axios";

interface Question {
  question: string;
  answer: string;
  options: string[];
  score: number;
  order: number;
  type: "multiple-choice" | "true-false" | "short-answer";
}

interface QuestionWithQuizId {
  question: string;
  answer: string;
  options: string[];
  score: number;
  order: number;
  quizid: number;
}

function CreateQuizUI() {
  const [createQuizCount, setCreateQuizCount] = useState<number>(1);
  const [quizName, setQuizName] = useState<string>("");
  const [quizDescription, setQuizDescription] = useState<string>("");
  const [createQuizData, setCreateQuizData] = useState<Question[]>([
    {
      question: "",
      answer: "",
      options: [],
      score: 0,
      order: 0,
      type: "multiple-choice",
    },
  ]);

  const handleAddForm = () => {
    setCreateQuizCount(createQuizCount + 1);
    setCreateQuizData([
      ...createQuizData,
      {
        question: "",
        answer: "",
        options: [],
        score: 0,
        order: 0,
        type: "multiple-choice",
      },
    ]);
  };

  const handleInputChange = (
    question_index: number,
    property_name: string,
    value: string,
    option_index?: number
  ) => {
    const newCreateQuizData: Question[] = [...createQuizData];
    if (option_index !== undefined) {
      newCreateQuizData[question_index].options[option_index] = value;
    } else {
      newCreateQuizData[question_index][property_name] = value;
    }

    setCreateQuizData(newCreateQuizData);
  };

  const handleDeleteQuestion = (question_index: nunber) => {
    const newCreateQuizData: Question[] = [...createQuizData];
    newCreateQuizData.splice(question_index, 1);
    setCreateQuizData(newCreateQuizData);
  };

  async function handleCreateQuiz() {
    const user = "khangarook"; // need to change
    try {
      const response = await axios.post(`/api/quizzes/`, {
        name: quizName,
        description: quizDescription,
        username: user,
      });

      if (response.status == 201) {
        const quizid = response.data.quiz.id;
        const errors: string[] = [];
        const newCreateQuizzesData: QuestionWithQuizId[] = [];

        createQuizData.forEach((question) => {
          let { type, ...questionWithoutType } = question;

          if (question.question === "") {
            errors.push(`Question ${questionWithoutType.order + 1} is empty`);
          }

          if (question.answer === "") {
            errors.push(
              `Question ${questionWithoutType.order + 1} has no answer`
            );
          }

          if (question.score < 0) {
            errors.push(
              `Question ${
                questionWithoutType.order + 1
              } cannot have negative points`
            );
          }

          if (question.order < 0) {
            errors.push(
              `Question ${
                questionWithoutType.order + 1
              } cannot have a negative order`
            );
          }

          if (question.options.length == 0) {
            if (type == "multiple-choice" || type == "true-false")
              errors.push(
                `Question ${
                  questionWithoutType.order + 1
                } does not have any choices`
              );
          }

          newCreateQuizzesData.push({ ...questionWithoutType, quizid: quizid });
        });

        if (errors.length !== 0) {
          //need to print error
          console.log(errors);
          return;
        }

        if (newCreateQuizzesData.length === 0) {
          //need to print error
          console.log("NEED QUESTIONS");
          return;
        }

        const responseQuestions = await axios.post(
          `/api/questions/`,
          newCreateQuizzesData
        );

        if (responseQuestions.status != 201) {
          console.log(responseQuestions);
        }
      }
    } catch (error) {
      //TODO: Implement error handling
      console.log("ERROR HAS BEEN ENCOUNTERED:");
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Create a Quiz</h1>
      <div>
        <label>Question</label>
        <input
          type="text"
          name="quizName"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
        <label>Description</label>
        <input
          type="text"
          name="quizDescription"
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
        />
      </div>
      {createQuizData.map((question, index) => (
        <div key={index}>
          <h2>Question {index + 1}</h2>
          <label>Question</label>
          <input
            type="text"
            name="question"
            value={question.question}
            onChange={(e) =>
              handleInputChange(index, e.target.name, e.target.value)
            }
          />
          <label>Score:</label>
          <input
            type="number"
            name="score"
            value={question.score}
            onChange={(e) =>
              handleInputChange(index, e.target.name, e.target.value)
            }
          />
          <label>Type:</label>
          <select
            name="type"
            value={question.type}
            onChange={(e) =>
              handleInputChange(index, e.target.name, e.target.value)
            }
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="short-answer">Short Answer</option>
          </select>
          {question.type === "multiple-choice" && (
            <>
              <label>Options:</label>
              {question.options.map((option, choice_index) => (
                <input
                  key={choice_index}
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "type",
                      e.target.value,
                      choice_index
                    )
                  }
                />
              ))}
              <button
                onClick={() =>
                  setCreateQuizData((prev) => {
                    const newCreateQuizData = [...prev];
                    newCreateQuizData[index].options.push("");
                    return newCreateQuizData;
                  })
                }
              >
                Add Choice
              </button>
            </>
          )}
          {question.type === "true-false" && (
            <>
              <label>Answer:</label>
              <select
                name="answer"
                value={question.answer}
                onChange={(e) =>
                  handleInputChange(index, e.target.name, e.target.value)
                }
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </>
          )}
          {question.type === "short-answer" && (
            <>
              <label>Answer:</label>
              <input
                type="text"
                name="answer"
                value={question.answer}
                onChange={(e) =>
                  handleInputChange(index, e.target.name, e.target.value)
                }
              />
            </>
          )}
          <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddForm}>Add Question</button>
      <button onClick={handleCreateQuiz}>Create Quiz</button>
    </div>
  );
}

export default CreateQuizUI;
