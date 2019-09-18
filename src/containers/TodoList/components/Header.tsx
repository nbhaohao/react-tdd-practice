import React, { useState, useCallback } from "react";

interface HeaderProps {
  addUndoItem: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ addUndoItem }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  const handleInputKeyEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!inputValue || event.keyCode !== 13) {
        return;
      }
      addUndoItem(inputValue);
      setInputValue("");
    },
    [inputValue, addUndoItem]
  );

  return (
    <div>
      <input
        data-test="input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyEnter}
      />
    </div>
  );
};

export { Header };
