import React from "react";
import { ACTIONS, CustomReducerAction } from "./StandardCalculator";

const DigitButton: React.FC<DigitButtonProps> = ({ dispatch, digit }) => {
  return <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>{digit}</button>;
};

interface DigitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dispatch: (props: CustomReducerAction) => void;
  digit: string;
}

export default DigitButton;
