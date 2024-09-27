import React, { useState } from "react";
import { Memo } from "../types";
import "../styles/List.css";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

interface ListProps {
  memos: Memo[];
  deleteMemo: (id: number) => void;
  updateMemo: (id: number, text: string) => void;
  toggleFavorite: (id: number) => void;
}

const List: React.FC<ListProps> = ({ memos, deleteMemo, updateMemo, toggleFavorite }) => {
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
                <span className={`memo-text ${memo.favorite ? 'favorite' : ''}`}>{memo.text}</span>
                <button onClick={() => handleEditClick(memo)}>Edit</button>
                <button onClick={() => deleteMemo(memo.id)}>Delete</button>
                <button onClick={() => toggleFavorite(memo.id)} className="favorite-button">
                  {memo.favorite ? <HeartFilled /> : <HeartOutlined />}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
