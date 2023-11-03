import React, { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
  const [remianingInterval, setRemainingInterval] = useState(timeout);
  useEffect(() => {
    const myTimeout = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(myTimeout);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setRemainingInterval((prev) => prev - 100);
    }, 100);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <div>
      <progress
        id="question-time"
        max={timeout}
        value={remianingInterval}
        className={mode}
      />
    </div>
  );
};

export default QuestionTimer;
