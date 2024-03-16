import { useState } from "react";
import { AuthContext } from "../authContext";

interface Question {
  question: string;
  answer: string;
  options: [string];
  score: number;
  order: number;
  type: string;
}

function CreateQuizUI() {
  const [createQuizCount, setCreateQuizCount] = useState<number>(1);
  const [quizName, setQuizName] = useState<string>("");
  const [quizDescription, setQuizDescription] = useState<string>("");
  const [createQuizData, setCreateQuizData] = useState<Question[]>([
    {
      question: "",
      answer: "",
      options: [""],
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
        options: [""],
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

    if (option_index) {
      newCreateQuizData[question_index][property_name][option_index] = value;
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
    </div>
  );
}

export default CreateQuizUI;
