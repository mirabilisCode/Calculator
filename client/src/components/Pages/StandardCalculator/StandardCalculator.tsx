import React, { useReducer } from "react";
import "./StandardCalculator.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
} as StandardCalculatorActions;

const StandardCalculator = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {} as StandardCalculatorReduceState);
  return (
    <div className="calculator-grid">
      <div className="calculation-output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  );
};

function reducer(state: StandardCalculatorReduceState, action: CustomReducerAction) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (action.payload.digit === "0" && state.currentOperand === "0") {
        return { ...state } as StandardCalculatorReduceState;
      }
      if (action.payload.digit === "." && state?.currentOperand?.includes(".")) {
        return { ...state } as StandardCalculatorReduceState;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${action.payload.digit}`,
      } as StandardCalculatorReduceState;
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return { ...state } as StandardCalculatorReduceState;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: action.payload.operation,
        } as StandardCalculatorReduceState;
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: action.payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        } as StandardCalculatorReduceState;
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload.operation,
        currentOperand: null,
      } as StandardCalculatorReduceState;
    case ACTIONS.CLEAR:
      return {} as StandardCalculatorReduceState;
    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand}${action.payload.digit}`,
      } as StandardCalculatorReduceState;
    case ACTIONS.EVALUATE:
      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
      } as StandardCalculatorReduceState;
    default:
      return { ...state } as StandardCalculatorReduceState;
  }
}

function evaluate(props: StandardCalculatorReduceState): string {
  const prev = props?.previousOperand && parseFloat(props.previousOperand);
  const current = props?.currentOperand && parseFloat(props.currentOperand);
  if (!prev || !current) return "";
  let computation = 0;
  switch (props.operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

interface CustomReducerAction {
  type: string;
  payload: {
    digit?: string;
    operation?: string;
  };
}

interface StandardCalculatorReduceState {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
}

interface StandardCalculatorActions {
  ADD_DIGIT: string;
  CHOOSE_OPERATION: string;
  CLEAR: string;
  DELETE_DIGIT: string;
  EVALUATE: string;
}

export default StandardCalculator;
export { ACTIONS };
export type { CustomReducerAction };
