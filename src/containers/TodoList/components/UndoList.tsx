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
    <div>
      <div data-test="count">{count}</div>
      <ul>
        {list.map((item, index) => (
          <li data-test="list-item" key={index}>
            {item}
            <span
              onClick={handleDeleteItem}
              data-index={index}
              data-test="delete-icon"
            >
              -
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { UndoList };
