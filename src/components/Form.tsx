import React, { useEffect, useState } from "react";
import "../styles/Form.css"

interface FormProps {
  addMemo: (text: string, tags: string[]) => void;
  editMode?: boolean;
  currentText?: string;
  currentTags: string[];
  updateMemo?: (text: string, tags: string[]) => void;
}

const Form: React.FC<FormProps> = ({
  addMemo,
  editMode = false,
  currentText = "",
  currentTags,
  updateMemo,
}) => {
  const [text, setText] = useState(currentText);
  const [tags, setTags] = useState<string[]>(currentTags);

  useEffect(() => {
    setText(currentText);
    setTags(currentTags);
  }, [currentText, currentTags]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      if (editMode && updateMemo) {
        updateMemo(text, tags);
      } else {
        addMemo(text, tags);
      }
      setText("");
      setTags([]);
    }
  };

  const handleTagChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTags = [...tags];
    newTags[index] = e.target.value;
    setTags(newTags);
  };

  const handleAddTag = () => {
    setTags([...tags, ""]);
  };

  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="memo-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter memo text"
          required
        ></input>
        {tags.map((tag, index) => (
          <div key={index} className="tag-input">
            <input
              type="text"
              placeholder="Enter tag"
              value={tag}
              onChange={(e) => handleTagChange(e, index)}
            ></input>
            <button type="button" onClick={() => handleRemoveTag(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTag}>
          Add Tag
        </button>
        <button type="submit">{editMode ? "Update" : "Add"}</button>
      </form>
    </>
  );
};

export default Form;
