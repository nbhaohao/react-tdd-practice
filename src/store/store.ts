import { Action, createStore } from "redux";

export const UPDATE_INPUT_VALUE = "UPDATE_INPUT_VALUE";

export interface StoreState {
  inputValue: string;
}

const initState: StoreState = {
  inputValue: ""
};

type ActionType = "UPDATE_INPUT_VALUE";

interface ReduxAction<T> extends Action<T> {
  value: any;
}

const reducer = (state = initState, action: ReduxAction<ActionType>) => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.value
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
