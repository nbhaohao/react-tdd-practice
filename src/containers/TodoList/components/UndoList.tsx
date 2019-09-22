import React, { ChangeEvent, FocusEvent, MouseEvent, useCallback } from "react";
import { UndoList as UndoListType } from "@/containers/TodoList";

interface UndoListProps {
  list: UndoListType;
  onDeleteItem: (index: number) => void;
  onChangeStatus: (index: number) => void;
  onChangeItemValue: (index: number, value: string) => void;
  onResetItemStatus: (index: number) => void;
}

const useUndoList = ({
  list,
  onDeleteItem,
  onChangeStatus,
  onChangeItemValue,
  onResetItemStatus
}: UndoListProps) => {
  const count = list.length;
  const handleDeleteItem = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      const spanElem = event.currentTarget;
      const { index } = spanElem.dataset;
      if (index) {
        onDeleteItem(Number(index));
      }
      event.stopPropagation();
    },
    [onDeleteItem]
  );

  const handleChangeItemStatus = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      const liElem = event.currentTarget;
      const { index } = liElem.dataset;
      if (index) {
        onChangeStatus(Number(index));
      }
    },
    [onChangeStatus]
  );

  const handleChangeItemValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputElem = event.currentTarget;
      const { index } = inputElem.dataset;
      if (index) {
        onChangeItemValue(Number(index), event.target.value);
      }
    },
    [onChangeItemValue]
  );

  const handleResetItemStatus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const inputElem = event.currentTarget;
      const { index } = inputElem.dataset;
      if (index) {
        onResetItemStatus(Number(index));
      }
    },
    [onResetItemStatus]
  );

  return {
    count,
    handleDeleteItem,
    handleChangeItemStatus,
    handleChangeItemValue,
    handleResetItemStatus
  };
};

const UndoList: React.FC<UndoListProps> = ({
  list,
  onDeleteItem,
  onChangeStatus,
  onChangeItemValue,
  onResetItemStatus
}) => {
  const {
    count,
    handleDeleteItem,
    handleChangeItemStatus,
    handleChangeItemValue,
    handleResetItemStatus
  } = useUndoList({
    list,
    onDeleteItem,
    onChangeStatus,
    onChangeItemValue,
    onResetItemStatus
  });

  return (
    <div className="undo-list">
      <div className="undo-list-title">
        正在进行
        <div data-test="count" className="undo-list-count">
          {count}
        </div>
      </div>
      <ul className="undo-list-content">
        {list.map((item, index) => (
          <li
            data-test="list-item"
            data-index={index}
            key={index}
            className="undo-list-item"
            onClick={handleChangeItemStatus}
          >
            {item.status === "div" ? (
              <span data-test="normal-text">{item.value}</span>
            ) : (
              <input
                data-index={index}
                data-test="edit-input"
                value={item.value}
                onChange={handleChangeItemValue}
                onBlur={handleResetItemStatus}
              />
            )}
            <div
              onClick={handleDeleteItem}
              data-index={index}
              data-test="delete-icon"
              className="undo-list-delete"
            >
              -
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { UndoList };
