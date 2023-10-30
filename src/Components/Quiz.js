import React, { useCallback, useState, useRef } from "react";
import questions from "../Data/questions";
import quizComplete from "../Assests/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

const Quiz = () => {
  let Shuffledanswers = useRef();
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const ActiveQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const handleSelectedAns = useCallback(
    (selectedanswer) => {
      setAnswerState("answered");
      setUserAnswers((prev) => {
        return [...prev, selectedanswer];
      });

      setTimeout(() => {
        if (selectedanswer === questions[ActiveQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
          Shuffledanswers.current = null;
        }, 2000);
      }, 1000);
    },
    [ActiveQuestionIndex]
  );

  const handleSkipAnswers = useCallback(
    () => handleSelectedAns(null),
    [handleSelectedAns]
  );

  const quizIsCompleted = questions.length === ActiveQuestionIndex;

  if (quizIsCompleted) {
    return (
      <div>
        <img src={quizComplete} alt="quizCompleteimg" />
        <h1>Quiz Completed</h1>
      </div>
    );
  }

  if (!Shuffledanswers.current) {
    Shuffledanswers.current = [...questions[ActiveQuestionIndex].answers];
    Shuffledanswers.current.sort(() => Math.random() - 0.5);
  }

  console.log(ActiveQuestionIndex, Shuffledanswers.current);
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={ActiveQuestionIndex}
          timeout={30000}
          onTimeout={handleSkipAnswers}
        />
        <h2>{questions[ActiveQuestionIndex].text}</h2>
        <div className="answers">
          <ul>
            {Shuffledanswers.current.map((ans) => {
              const isSelected = userAnswers[userAnswers.length - 1] === ans;
              let cssClasses = "";

              if (answerState === "answered" && isSelected) {
                cssClasses = "selected";
              }

              if (
                (answerState === "correct" || answerState === "wrong") &&
                isSelected
              ) {
                cssClasses = answerState;
              }

              return (
                <li key={ans} className="answer">
                  <button
                    onClick={() => handleSelectedAns(ans)}
                    className={cssClasses}
                  >
                    {ans}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
