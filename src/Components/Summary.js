import React from "react";
import quizComplete from "../Assests/quiz-complete.png";
import questions from "../Data/questions";

const Summary = ({ userAnswers }) => {
  const skippedanswers = userAnswers.filter((item) => item === null);
  const CorrectAnswers = userAnswers.filter(
    (item, index) => item === questions[index].answers[0]
  );

  const skippedpercentage = Math.floor(
    (skippedanswers.length / userAnswers.length) * 100
  );
  const CorrectAnspercentage = Math.floor(
    (CorrectAnswers.length / userAnswers.length) * 100
  );
  const wrongAnspercentage = Math.floor(
    100 - skippedpercentage - CorrectAnspercentage
  );
  return (
    <div id="summary">
      <img src={quizComplete} alt="quizCompleteimg" />
      <h1>Quiz Completed</h1>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedpercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{CorrectAnspercentage}%</span>
          <span className="text">correct</span>
        </p>
        <p>
          <span className="number">{wrongAnspercentage}%</span>
          <span className="text">wrong</span>
        </p>
      </div>
      <ol>
        {userAnswers?.map((ans, index) => {
          let cssClass = "user-answer";

          if (ans === null) {
            cssClass += "  skipped";
          } else if (questions[index].answers[0] === ans) {
            cssClass += "  correct";
          } else {
            cssClass += "  wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{questions[index].text}</p>
              <p className={cssClass}>{ans ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;
