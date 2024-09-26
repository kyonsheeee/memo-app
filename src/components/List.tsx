import React from "react";
import { Memo } from "../types";

interface ListProps {
  memos: Memo[];
  deleteMemo: (id: number) => void;
  startEditMemo: (id: number) => void;
}

const List: React.FC<ListProps> = ({ memos, deleteMemo, startEditMemo }) => {
  return (
    <ul>
      {memos.map((memo) => (
        <li key={memo.id}>
          {memo.text}
          <button onClick={() => startEditMemo(memo.id)}>Edit</button>
          <button onClick={() => deleteMemo(memo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
