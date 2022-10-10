import React from "react";
import { ACTIONS, CustomReducerAction } from "./StandardCalculator";

const OperationButton: React.FC<OperationButtonProps> = ({ dispatch, operation }) => {
  return <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}>{operation}</button>;
};

interface OperationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dispatch: (props: CustomReducerAction) => void;
  operation: string;
}

export default OperationButton;
