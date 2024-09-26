import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import { Memo } from "./types";

const App: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMemo, setCurrentMemo] = useState<Memo | null>(null);

  const addMemo = (text: string) => {
    const newMemo: Memo = {
      id: Date.now(),
      text,
    };
    setMemos([...memos, newMemo]);
  };

  const deleteMemo = (id: number) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  const startEditMemo = (id: number) => {
    const memoToEdit = memos.find((memo) => memo.id === id);
    if (memoToEdit) {
      setCurrentMemo(memoToEdit);
      setIsEditing(true);
    }
  };

  const updateMemo = (text: string) => {
    if (currentMemo) {
      setMemos(
        memos.map((memo) =>
          memo.id === currentMemo.id ? { ...memo, text } : memo
        )
      );
      setCurrentMemo(null);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <h1>Memo App</h1>
      <Form
        addMemo={addMemo}
        editMode={isEditing}
        currentText={currentMemo ? currentMemo.text : ""}
        updateMemo={updateMemo}
      />
      <List
        memos={memos}
        deleteMemo={deleteMemo}
        startEditMemo={startEditMemo}
      />
    </div>
  );
};

export default App;
