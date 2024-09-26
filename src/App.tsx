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
    if (currentMemo && currentMemo.id === id) {
      setCurrentMemo(null);
      setIsEditing(false);
    }
  };

  const updateMemo = (id: number, text: string) => {
    setMemos(memos.map((memo) => (memo.id === id ? { ...memo, text } : memo)));
    setCurrentMemo(null);
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1>Memo App</h1>
      <Form
        addMemo={addMemo}
        editMode={isEditing}
        currentText={currentMemo ? currentMemo.text : ""}
        updateMemo={(text) => updateMemo(currentMemo!.id, text)}
      />
      <List memos={memos} deleteMemo={deleteMemo} updateMemo={updateMemo} />
    </div>
  );
};

export default App;
