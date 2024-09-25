import React, { useState } from "react";

interface FormProps {
  addMemo: (text: string) => void;
}

const Form: React.FC<FormProps> = ({ addMemo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addMemo(text);
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
      <button type="submit">Add Memo</button>
    </form>
  );
};

export default Form;
