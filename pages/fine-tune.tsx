import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import styles from "../styles/Home.module.css";

const FineTune = () => {
  const [prompts, setPrompts] = useState([{ prompt: "", completion: "" }]);

  const handlePromptChange = (e, index) => {
    const newPrompts = [...prompts];
    newPrompts[index].prompt = e.target.value;
    setPrompts(newPrompts);
  };

  const handleCompletionChange = (e, index) => {
    const newPrompts = [...prompts];
    newPrompts[index].completion = e.target.value;
    setPrompts(newPrompts);
  };

  const addNewPrompt = () => {
    setPrompts([...prompts, { prompt: "", completion: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(prompts);
  };

  const handleDelete = (index) => {
    const newPrompts = [...prompts];
    newPrompts.splice(index, 1);
    setPrompts(newPrompts);
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className="bg-white p-4 lg:col-span-1 text-center">
        <h1 className="text-2xl font-medium">Fine-Tuning</h1>
        <p className="text-lg mb-5">
          Improve the fine-tune model by providing additional prompts and
          expected completions.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <div className="w-1/2 font-medium text-lg">Prompt</div>
            <div className="w-1/2 font-medium text-lg">Completion</div>
          </div>
          {prompts.map((prompt, index) => (
            <div key={index} className="flex justify-between">
              <div className="w-1/2">
                <input
                  type="text"
                  value={prompt.prompt}
                  onChange={(e) => handlePromptChange(e, index)}
                  className="border-2 border-gray-300 bg-white p-4 rounded-lg text-sm focus:outline-none resize-none"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  value={prompt.completion}
                  onChange={(e) => handleCompletionChange(e, index)}
                  className="border-2 border-gray-300 bg-white p-4 rounded-lg text-sm focus:outline-none resize-none"
                />
                <div>
                  <a href="#" onClick={() => handleDelete(index)}>
                    Delete
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center">
            <button
              type="button"
              onClick={addNewPrompt}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add new prompt
            </button>
          </div>
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FineTune;
