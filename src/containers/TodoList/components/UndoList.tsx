import React, { MouseEvent, useCallback } from "react";

interface UndoListProps {
  list: Array<string>;
  onDeleteItem: (index: number) => void;
}

const useUndoList = ({ list, onDeleteItem }: UndoListProps) => {
  const count = list.length;
  const handleDeleteItem = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      const spanElem = event.currentTarget;
      const { index } = spanElem.dataset;
      if (index) {
        onDeleteItem(Number(index));
      }
    },
    [onDeleteItem]
  );

  return {
    count,
    handleDeleteItem
  };
};

const UndoList: React.FC<UndoListProps> = ({ list, onDeleteItem }) => {
  const { count, handleDeleteItem } = useUndoList({ list, onDeleteItem });

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
          <li data-test="list-item" key={index} className="undo-list-item">
            {item}
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
