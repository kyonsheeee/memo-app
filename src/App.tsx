import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import { Memo } from "./types";

const App: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMemo, setCurrentMemo] = useState<Memo | null>(null);

  const addMemo = (text: string, tags: string[]) => {
    const newMemo: Memo = {
      id: Date.now(),
      text,
      favorite: false,
      tags,
    };
    setMemos([...memos, newMemo]);
  };

  const deleteMemo = (id: number) => {
    setMemos(memos.filter((memo) => memo.id !== id));
    if (currentMemo && currentMemo.id === id) {
      setCurrentMemo(null);
      setIsEditing(false);
    }
  };

  const updateMemo = (id: number, text: string, tags: string[]) => {
    setMemos(
      memos.map((memo) => (memo.id === id ? { ...memo, text, tags } : memo))
    );
    setCurrentMemo(null);
    setIsEditing(false);
  };

  const toggleFavorite = (id: number) => {
    setMemos(
      memos.map((memo) =>
        memo.id === id ? { ...memo, favorite: !memo.favorite } : memo
      )
    );
  };

  return (
    <div className="container">
      <h1>Memo App</h1>
      <Form
        addMemo={addMemo}
        editMode={isEditing}
        currentText={currentMemo ? currentMemo.text : ""}
        currentTags={currentMemo ? currentMemo.tags : []}
        updateMemo={(text, tags) => updateMemo(currentMemo!.id, text, tags)}
      />
      <List
        memos={memos}
        deleteMemo={deleteMemo}
        updateMemo={updateMemo}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default App;
