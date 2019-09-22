import React, { useState } from "react";
import { Header } from "./components/Header";
import "./index.scss";
type UndoList = Array<string>;

const useTodoList = () => {
  const [undoList, setUndoList] = useState<UndoList>([]);
  const handleAddUndoItem = (value: string): void => {
    setUndoList(undoList.concat(value));
  };

  return {
    undoList,
    setUndoList,
    handleAddUndoItem
  };
};

const TodoList: React.FC = () => {
  const { undoList, setUndoList, handleAddUndoItem } = useTodoList();
  return (
    <div>
      <Header addUndoItem={handleAddUndoItem} />
      {undoList.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

export { TodoList, useTodoList };
