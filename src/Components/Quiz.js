import React, { useCallback, useState } from "react";
import questions from "../Data/questions";
import Question from "./Question";
import Summary from "./Summary";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const ActiveQuestionIndex = userAnswers.length;

  const handleSelectedAns = useCallback((selectedanswer) => {
    setUserAnswers((prev) => {
      return [...prev, selectedanswer];
    });
  }, []);

  const handleSkipAnswers = useCallback(
    () => handleSelectedAns(null),
    [handleSelectedAns]
  );

  const quizIsCompleted = ActiveQuestionIndex === questions.length;

  if (quizIsCompleted) {
    return <Summary userAnswers={userAnswers} />;
  }

  console.log(userAnswers);

  return (
    <div id="quiz">
      <Question
        key={ActiveQuestionIndex}
        index={ActiveQuestionIndex}
        onSelectAns={handleSelectedAns}
        onSkipAns={handleSkipAnswers}
      />
      {/* <div id="question">
        <QuestionTimer
          key={ActiveQuestionIndex}
          timeout={30000}
          onTimeout={handleSkipAnswers}
        />
        <h2>{questions[ActiveQuestionIndex].text}</h2>
        <Answers
          key={ActiveQuestionIndex}
          userAnswers={questions[ActiveQuestionIndex].answers}
          selectedanswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelectAns={handleSelectedAns}
        />
      </div> */}
    </div>
  );
};

export default Quiz;
