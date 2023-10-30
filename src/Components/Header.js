import React from "react";
import logoImg from "../Assests/quiz-logo.png";

const Header = () => {
  return (
    <header>
      <img src={logoImg} alt="quiz-header" />
      <h1>REACT QUIZ</h1>
    </header>
  );
};

export default Header;
