import React, { useState } from "react";
import { Memo } from "../types";
import "../styles/List.css";

interface ListProps {
  memos: Memo[];
  deleteMemo: (id: number) => void;
  updateMemo: (id: number, text: string) => void;
}

const List: React.FC<ListProps> = ({ memos, deleteMemo, updateMemo }) => {
  const [editingMemoId, setEditingMemoId] = useState<number | null>(null);
  const [newText, setNewText] = useState<string>("");

  const handleEditClick = (memo: Memo) => {
    setEditingMemoId(memo.id);
    setNewText(memo.text);
  };

  const handleSaveClick = (id: number) => {
    updateMemo(id, newText);
    setEditingMemoId(null);
  };

  const handleCancelClick = () => {
    setEditingMemoId(null);
  };

  return (
    <>
      <ul className="memo-list">
        {memos.map((memo) => (
          <li key={memo.id} className="memo-item">
            {editingMemoId === memo.id ? (
              <div className="editing-container">
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                ></input>
                <button onClick={() => handleSaveClick(memo.id)}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <div className="memo-container">
                <span className="memo-text">{memo.text}</span>
                <button onClick={() => handleEditClick(memo)}>Edit</button>
                <button onClick={() => deleteMemo(memo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
