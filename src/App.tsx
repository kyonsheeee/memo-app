import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import { Memo } from "./types";

const App: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);

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

  return (
    <div>
      <Form addMemo={addMemo} />
      <List memos={memos} deleteMemo={deleteMemo} />
    </div>
  );
};

export default App;
