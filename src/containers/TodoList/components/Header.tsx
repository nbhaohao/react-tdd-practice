import React, { useCallback } from "react";
import { connect } from "react-redux";
import { StoreState, UPDATE_INPUT_VALUE } from "@/store/store";

interface HeaderProps {
  addUndoItem: (value: string) => void;
  inputValue?: string;
  setInputValue?: (value: string) => void;
}

const _Header: React.FC<HeaderProps> = ({
  addUndoItem,
  inputValue,
  setInputValue
}) => {
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (setInputValue) {
        setInputValue(event.target.value);
      }
    },
    [setInputValue]
  );

  const handleInputKeyEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!inputValue || event.keyCode !== 13) {
        return;
      }
      addUndoItem(inputValue);
      if (setInputValue) {
        setInputValue("");
      }
    },
    [inputValue, addUndoItem, setInputValue]
  );

  return (
    <div className="header">
      <div className="header-content">
        TodoList
        <input
          placeholder="Todo"
          className="header-input"
          data-test="header-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyEnter}
        />
      </div>
    </div>
  );
};

const Header = connect(
  (state: StoreState) => ({
    inputValue: state.inputValue
  }),
  dispatch => ({
    setInputValue: (value: string) => {
      dispatch({
        type: UPDATE_INPUT_VALUE,
        value
      });
    }
  })
)(_Header);

export { Header };
