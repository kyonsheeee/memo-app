import React from "react";
import { Memo } from "../types";
import '../styles/List.css';

interface ListProps {
  memos: Memo[];
  deleteMemo: (id: number) => void;
  startEditMemo: (id: number) => void;
}

const List: React.FC<ListProps> = ({ memos, deleteMemo, startEditMemo }) => {
  return (
    <>
      <ul className="memo-list">
        {memos.map((memo) => (
          <li key={memo.id} className="memo-item">
            <span className="memo-text">{memo.text}</span>
            <div className="memo-buttons">
              <button onClick={() => startEditMemo(memo.id)}>Edit</button>
              <button onClick={() => deleteMemo(memo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
