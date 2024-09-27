import React, { useState } from "react";
import { Memo } from "../types";
import "../styles/List.css";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

interface ListProps {
  memos: Memo[];
  deleteMemo: (id: number) => void;
  updateMemo: (id: number, text: string, tags: string[]) => void;
  toggleFavorite: (id: number) => void;
}

const List: React.FC<ListProps> = ({
  memos,
  deleteMemo,
  updateMemo,
  toggleFavorite,
}) => {
  const [editingMemoId, setEditingMemoId] = useState<number | null>(null);
  const [newText, setNewText] = useState<string>("");
  const [newTags, setNewTags] = useState<string[]>([]);

  const handleEditClick = (memo: Memo) => {
    setEditingMemoId(memo.id);
    setNewText(memo.text);
    setNewTags(memo.tags);
  };

  const handleSaveClick = (id: number) => {
    updateMemo(id, newText, newTags);
    setEditingMemoId(null);
  };

  const handleCancelClick = () => {
    setEditingMemoId(null);
  };

  const handleTagChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedTags = [...newTags];
    updatedTags[index] = e.target.value;
    setNewTags(updatedTags);
  };

  const handleAddTag = () => {
    setNewTags([...newTags, ""]);
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = newTags.filter((_, i) => i !== index);
    setNewTags(updatedTags);
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
                {newTags.map((tag, index) => (
                  <div key={index} className="tag-input">
                    <input
                      type="text"
                      placeholder="Enter tag"
                      value={tag}
                      onChange={(e) => handleTagChange(e, index)}
                    ></input>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={handleAddTag}>
                  Add Tag
                </button>
                <button onClick={() => handleSaveClick(memo.id)}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <div className="memo-container">
                <span
                  className={`memo-text ${memo.favorite ? "favorite" : ""}`}
                >
                  {memo.text}
                </span>
                <button onClick={() => handleEditClick(memo)}>Edit</button>
                <button onClick={() => deleteMemo(memo.id)}>Delete</button>
                <button
                  onClick={() => toggleFavorite(memo.id)}
                  className="favorite-button"
                >
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
