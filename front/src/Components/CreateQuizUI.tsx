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
  [key: string]: string | number | string[];
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
  const [numQuestions, setNumQuestions] = useState<number>(1);
  const [quizName, setQuizName] = useState<string>("");
  const [quizDescription, setQuizDescription] = useState<string>("");
  const [createQuizData, setCreateQuizData] = useState<Question[]>([
    {
      question: "",
      answer: "",
      options: [],
      score: 0,
      order: 0,
      type: "short-answer",
    },
  ]);

  const handleAddQuestion = () => {
    setNumQuestions(numQuestions + 1);
    setCreateQuizData([
      ...createQuizData,
      {
        question: "",
        answer: "",
        options: [],
        score: 0,
        order: numQuestions,
        type: "short-answer",
      },
    ]);
  };

  const handleInputChange = (
    question_index: number,
    property_name: string,
    value: string
  ) => {
    const newCreateQuizData: Question[] = [...createQuizData];

    newCreateQuizData[question_index][property_name] = value;

    setCreateQuizData(newCreateQuizData);
  };

  const handleOptionsChange = (
    question_index: number,
    option_index: number,
    value: string
  ) => {
    const newCreateQuizData: Question[] = [...createQuizData];

    if (
      newCreateQuizData[question_index].answer ==
      newCreateQuizData[question_index].options[option_index]
    ) {
      newCreateQuizData[question_index].answer = value;
    }
    newCreateQuizData[question_index].options[option_index] = value;
    setCreateQuizData(newCreateQuizData);
  };

  const handleTypeChange = (question_index: number, new_type: string) => {
    const newCreateQuizData: Question[] = [...createQuizData];
    if (new_type === "short-answer" || new_type === "multiple-choice") {
      newCreateQuizData[question_index].options = [];
      newCreateQuizData[question_index].answer = "";
      newCreateQuizData[question_index].type = new_type;
    } else if (new_type === "true-false") {
      newCreateQuizData[question_index].options = ["true", "false"];
      newCreateQuizData[question_index].answer = "true";
      newCreateQuizData[question_index].type = new_type;
    }
    setCreateQuizData(newCreateQuizData);
  };

  const handleDeleteQuestion = (question_index: number) => {
    const newCreateQuizData: Question[] = [...createQuizData];
    newCreateQuizData.splice(question_index, 1);
    newCreateQuizData.forEach((question, index) => {
      question.order = index;
    });
    setCreateQuizData(newCreateQuizData);
    setNumQuestions(numQuestions - 1);
  };

  async function handleCreateQuiz() {
    try {
      const errors: string[] = [];
      const user = "khangarook"; // need to change

      if (quizName === "") {
        errors.push("Quiz needs a name");
      }

      createQuizData.forEach((question) => {
        if (question.question === "") {
          errors.push(`Question ${question.order + 1} is empty`);
        }

        if (question.answer === "") {
          errors.push(`Question ${question.order + 1} has no answer`);
        }

        if (question.score < 0) {
          errors.push(
            `Question ${question.order + 1} cannot have negative points`
          );
        }

        if (question.order < 0) {
          errors.push(
            `Question ${question.order + 1} cannot have a negative order`
          );
        }

        if (question.options.length == 0) {
          if (
            question.type == "multiple-choice" ||
            question.type == "true-false"
          )
            errors.push(
              `Question ${question.order + 1} does not have any choices`
            );
        } else {
          let numEmptyOptions = 0;
          question.options.forEach((option) => {
            if (option.trim() === "") {
              numEmptyOptions += 1;
            }
          });

          if (numEmptyOptions !== 0) {
            errors.push(
              `Question ${
                question.order + 1
              } cannot have ${numEmptyOptions} blank option(s)`
            );
          }

          if (question.answer.trim() === "") {
            errors.push(
              `Question ${
                question.order + 1
              } cannot have an answer belonging to an option that is blank`
            );
          }
        }
      });

      if (createQuizData.length === 0) {
        errors.push("Your quiz needs questions");
      }

      if (errors.length !== 0) {
        //need to print error
        console.log(errors);
        return;
      }

      const response = await axios.post(`/api/quizzes/`, {
        name: quizName,
        description: quizDescription,
        username: user,
      });

      if (response.status == 201) {
        const quizid = response.data.quiz.id;

        let newCreateQuizData: QuestionWithQuizId[] = createQuizData.map(
          (question) => {
            let { type, ...questionWithoutType } = question;
            return { ...questionWithoutType, quizid: quizid };
          }
        );

        const responseQuestions = await axios.post(`/api/questions/`, {
          questions: newCreateQuizData,
        });

        if (responseQuestions.status != 201) {
          console.log(responseQuestions);
        }
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      //TODO: Implement error handling
      console.log("ERROR HAS BEEN ENCOUNTERED:");
      console.log(error);
    }
  }
  console.log(createQuizData);
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
          <label>Points:</label>
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
            onChange={(e) => handleTypeChange(index, e.target.value)}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="short-answer">Short Answer</option>
          </select>
          {question.type === "multiple-choice" && (
            <>
              <br />
              <label>Options:</label>
              <br />
              {question.options.map((option, choice_index) => (
                <input
                  key={choice_index}
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleOptionsChange(index, choice_index, e.target.value)
                  }
                />
              ))}
              <button
                onClick={() => {
                  const newCreateQuizData = [...createQuizData];
                  newCreateQuizData[index].options.push("");
                  setCreateQuizData(newCreateQuizData);
                }}
              >
                Add Choice
              </button>
              <button
                onClick={() => {
                  const newCreateQuizData = [...createQuizData];
                  if (
                    newCreateQuizData[index].answer ==
                    newCreateQuizData[index].options[
                      newCreateQuizData[index].options.length - 1
                    ]
                  ) {
                    if (newCreateQuizData[index].options.length <= 1) {
                      newCreateQuizData[index].answer = "";
                    } else {
                      newCreateQuizData[index].answer =
                        newCreateQuizData[index].options[0];
                    }
                  }
                  newCreateQuizData[index].options.pop();
                  setCreateQuizData(newCreateQuizData);
                }}
              >
                Delete Choice
              </button>
              <select
                name="answer"
                value={question.answer}
                onChange={(e) =>
                  handleInputChange(index, e.target.name, e.target.value)
                }
              >
                {question.options.map((option, op_index) => (
                  <option key={op_index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleCreateQuiz}>Create Quiz</button>
    </div>
  );
}

export default CreateQuizUI;
