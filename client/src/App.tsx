import React from "react";
import "./App.css";
import Nav from "./components/nav/Nav";
import StandardCalculator from "./components/Pages/StandardCalculator/StandardCalculator";
import BmiCalculator from "./components/Pages/BmiCalculator/BmiCalculator";

function App() {
  let calculatorComponent: JSX.Element;

  switch (window.location.pathname) {
    case "/":
      calculatorComponent = <StandardCalculator />;
      break;
    case "/bmi":
      calculatorComponent = <BmiCalculator />;
      break;
    default:
      calculatorComponent = <StandardCalculator />;
      break;
  }

  return (
    <div className="App">
      <Nav />
      {calculatorComponent}
    </div>
  );
}

export default App;
