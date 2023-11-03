import React, { useRef } from "react";

const Answers = ({ userAnswers, selectedanswer, onSelect, answerState }) => {
  let Shuffledanswers = useRef();
  if (!Shuffledanswers.current) {
    Shuffledanswers.current = [...userAnswers];
    Shuffledanswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div className="answers">
      <ul>
        {Shuffledanswers.current.map((ans) => {
          const isSelected = selectedanswer === ans;
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
              <button onClick={() => onSelect(ans)} className={cssClasses}>
                {ans}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Answers;
