import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./components/Header";
import { UndoList } from "./components/UndoList";
import "./index.scss";
type TodoItem = { status: "div" | "input"; value: string };
export type UndoList = Array<TodoItem>;

const useTodoList = (initValue: UndoList = []) => {
  const [undoList, setUndoList] = useState<UndoList>(initValue);
  const handleAddUndoItem = useCallback(
    (value: string): void => {
      setUndoList(undoList.concat({ value, status: "div" }));
    },
    [undoList]
  );
  const handleDeleteUndoItem = useCallback(
    (deleteIndex: number): void => {
      const newUndoList: UndoList = undoList.filter(
        (item, index) => index !== deleteIndex
      );
      setUndoList(newUndoList);
    },
    [undoList]
  );

  const handleOnChangeStatus = useCallback(
    (changeIndex: number): void => {
      const newUndoList: UndoList = undoList.map((item, index) => {
        if (index !== changeIndex) {
          return {
            ...item,
            status: "div"
          };
        }
        return {
          ...item,
          status: "input"
        };
      });
      setUndoList(newUndoList);
    },
    [undoList]
  );

  const handleChangeItemValue = useCallback(
    (changeIndex: number, value: string) => {
      const newUndoList: UndoList = undoList.map((item, index) => {
        if (index !== changeIndex) {
          return item;
        }
        return {
          ...item,
          value
        };
      });
      setUndoList(newUndoList);
    },
    [undoList]
  );

  const handleResetItemStatus = useCallback(
    (resetIndex: number) => {
      const newUndoList: UndoList = undoList.map((item, index) => {
        if (index === resetIndex) {
          return {
            ...item,
            status: "div"
          };
        }
        return item;
      });
      setUndoList(newUndoList);
    },
    [undoList]
  );

  return {
    undoList,
    setUndoList,
    handleAddUndoItem,
    handleDeleteUndoItem,
    handleOnChangeStatus,
    handleChangeItemValue,
    handleResetItemStatus
  };
};

const TodoList: React.FC = () => {
  const {
    undoList,
    setUndoList,
    handleAddUndoItem,
    handleDeleteUndoItem,
    handleOnChangeStatus,
    handleChangeItemValue,
    handleResetItemStatus
  } = useTodoList();

  useEffect(() => {
    /*
     * {
     *   data: [{status: 'div', value: '123'}],
     *   success: true ,
     * }
     *
     * */
    axios
      .get("/undoList.json")
      .then(response => {
        setUndoList(response.data);
      })
      .catch(() => {});
  }, [setUndoList]);

  return (
    <div>
      <Header addUndoItem={handleAddUndoItem} />
      <UndoList
        list={undoList}
        onDeleteItem={handleDeleteUndoItem}
        onChangeStatus={handleOnChangeStatus}
        onChangeItemValue={handleChangeItemValue}
        onResetItemStatus={handleResetItemStatus}
      />
    </div>
  );
};

export { TodoList, useTodoList };
