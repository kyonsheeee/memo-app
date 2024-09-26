import React, { useEffect, useState } from "react";

interface FormProps {
  addMemo: (text: string) => void;
  editMode?: boolean;
  currentText?: string;
  updateMemo?: (text: string) => void;
}

const Form: React.FC<FormProps> = ({
  addMemo,
  editMode = false,
  currentText = "",
  updateMemo,
}) => {
  const [text, setText] = useState(currentText);

  useEffect(() => {
    setText(currentText);
  }, [currentText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      if (editMode && updateMemo) {
        updateMemo(text);
      } else {
        addMemo(text);
      }
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter memo"
      ></input>
      <button type="submit">{editMode ? "Update Memo" : "Add Memo"}</button>
    </form>
  );
};

export default Form;
