import React, { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import questions from "../Data/questions";

const Question = ({ index, onSkipAns, onSelectAns }) => {
  let answerState = "";
  const [answer, setAnswer] = useState({
    selectedanswer: "",
    isCorrect: null,
  });

  let timer = 30000;

  if (answer.selectedanswer) {
    timer = 2000;
  }

  if (answer.isCorrect !== null) {
    timer = 1000;
  }

  const handleSelectedAns = (selectedans) => {
    console.log(selectedans);
    setAnswer({
      selectedanswer: selectedans,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedanswer: selectedans,
        isCorrect: selectedans === questions[index].answers[0],
      });

      setTimeout(() => {
        onSelectAns(selectedans);
      }, 2000);
    }, 1000);
  };

  if (answer.selectedanswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedanswer) {
    answerState = "answered";
  }

  console.log(index);
  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedanswer === "" ? onSkipAns : null}
        mode={answerState}
      />
      <h2>{questions[index].text}</h2>
      <Answers
        userAnswers={questions[index].answers}
        selectedanswer={answer.selectedanswer}
        answerState={answerState}
        onSelect={handleSelectedAns}
      />
    </div>
  );
};

export default Question;
