import React from "react";
import { ACTIONS, StandardCalculatorDispatch } from "./StandardCalculator";

const OperationButton: React.FC<OperationButtonProps> = ({ dispatch, operation }, ...props) => {
  return (
    <button {...props} onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}>
      {operation}
    </button>
  );
};

interface OperationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dispatch: (props: StandardCalculatorDispatch) => void;
  operation: string;
}

export default OperationButton;
