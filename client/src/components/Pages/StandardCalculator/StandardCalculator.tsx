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

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const StandardCalculator = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {} as StandardCalculatorReduceState);
  return (
    <div className="calculator-grid">
      <div className="calculation-output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
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
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>
        =
      </button>
    </div>
  );
};

function reducer(state: StandardCalculatorReduceState, action: StandardCalculatorDispatch) {
  document?.activeElement instanceof HTMLElement && document.activeElement.blur();
  switch (action?.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action?.payload?.digit,
          overwrite: false,
        } as StandardCalculatorReduceState;
      }
      if (action?.payload?.digit === "0" && state?.currentOperand === "0") {
        return state;
      }
      if (action?.payload?.digit === "." && state?.currentOperand?.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${action?.payload?.digit}`,
      } as StandardCalculatorReduceState;
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: action?.payload?.operation,
        } as StandardCalculatorReduceState;
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: action?.payload?.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        } as StandardCalculatorReduceState;
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action?.payload?.operation,
        currentOperand: null,
      } as StandardCalculatorReduceState;
    case ACTIONS.CLEAR:
      return {} as StandardCalculatorReduceState;
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        } as StandardCalculatorReduceState;
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      } as StandardCalculatorReduceState;
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) return state;
      return {
        ...state,
        currentOperand: evaluate(state),
        overwrite: true,
        previousOperand: null,
        operation: null,
      } as StandardCalculatorReduceState;
    default:
      return state;
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

function formatOperand(operand: string | null) {
  if (!operand) return;
  const [integer, decimal] = operand.split(".");
  if (!decimal) return INTEGER_FORMATTER.format(parseFloat(integer));
  return `${INTEGER_FORMATTER.format(parseFloat(integer))}.${decimal}`;
}

interface StandardCalculatorDispatch {
  type: string;
  payload?: {
    digit?: string;
    operation?: string;
  };
}

interface StandardCalculatorReduceState {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite: boolean;
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
export type { StandardCalculatorDispatch };
