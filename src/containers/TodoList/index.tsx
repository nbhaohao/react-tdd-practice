import React, { useCallback, useState } from "react";
import { Header } from "./components/Header";
import { UndoList } from "./components/UndoList";
import "./index.scss";
type UndoList = Array<string>;

const useTodoList = (initValue: UndoList = []) => {
  const [undoList, setUndoList] = useState<UndoList>(initValue);
  const handleAddUndoItem = useCallback(
    (value: string): void => {
      setUndoList(undoList.concat(value));
    },
    [undoList]
  );
  const handleDeleteUndoItem = useCallback(
    (deleteIndex: number): void => {
      const newUndoList = undoList.filter(
        (item, index) => index !== deleteIndex
      );
      setUndoList(newUndoList);
    },
    [undoList]
  );

  return {
    undoList,
    setUndoList,
    handleAddUndoItem,
    handleDeleteUndoItem
  };
};

const TodoList: React.FC = () => {
  const { undoList, handleAddUndoItem, handleDeleteUndoItem } = useTodoList();
  return (
    <div>
      <Header addUndoItem={handleAddUndoItem} />
      <UndoList list={undoList} onDeleteItem={handleDeleteUndoItem} />
    </div>
  );
};

export { TodoList, useTodoList };
