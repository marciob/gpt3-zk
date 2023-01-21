import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import styles from "../styles/Home.module.css";
import { v4 as uuidv4 } from "uuid";

const FineTune = () => {
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), prompt: "", completion: "" },
  ]);
  const [submittedInputs, setSubmittedInputs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
    setSubmittedInputs([...submittedInputs, ...inputFields]);
    const newInputFields = inputFields.map((field) => {
      return {
        ...field,
        prompt: "",
        completion: "",
      };
    });
    setInputFields(newInputFields.reverse());
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = (e) => {
    e.preventDefault();
    if (inputFields.length >= 3) {
      // return without adding a new field
      return;
    }
    setInputFields([
      ...inputFields,
      { id: uuidv4(), prompt: "", completion: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  return (
    <div className={styles.container}>
      <div className="mt-10">
        <Sidebar />
        <div className="bg-white p-4 lg:col-span-1 text-center">
          <h1 className="text-2xl font-medium">Fine-Tune</h1>
          <p className="text-lg mb-5">
            Improve the fine-tune model by providing additional prompts and
            expected completions.
          </p>
          <form onSubmit={handleSubmit} className="mx-auto w-1/4">
            {inputFields.map((inputField) => (
              <div key={inputField.id} className="flex items-center mb-3">
                <input
                  className="border-2 border-gray-300 bg-white p-2 rounded-lg mr-4"
                  name="prompt"
                  placeholder="Prompt"
                  value={inputField.prompt}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
                <input
                  className="border-2 border-gray-300 bg-white p-2 rounded-lg mr-4"
                  name="completion"
                  placeholder="Completion"
                  value={inputField.completion}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
                <button
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  disabled={inputFields.length === 1}
                  onClick={() => handleRemoveFields(inputField.id)}
                >
                  -
                </button>
              </div>
            ))}
            {inputFields.length >= 3 ? (
              <div
                className="bg-gray-100 border-t border-b border-gray-200 text-gray-700 px-4 py-3 mb-3"
                role="alert"
              >
                <p className="text-sm">
                  You can send up to 3 prompts and completions at once.
                </p>
              </div>
            ) : null}
            <button
              className={` text-white font-bold py-2 px-4 rounded mr-4 ${
                inputFields.length >= 3
                  ? "bg-gray-200 hover:bg-gray-200"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
              onClick={handleAddFields}
              disabled={inputFields.length >= 3}
            >
              +
            </button>
            <button
              className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-4"
              type="submit"
            >
              Send
            </button>
          </form>
          <div className="my-5">
            {/* Render the stored inputs */}
            {submittedInputs.map((input) => (
              <div
                key={input.id}
                className="bg-white p-2 rounded-lg shadow-md my-2"
              >
                <h2 className="text-lg font-medium ">Prompt:</h2>
                <p className="text-gray-700">{input.prompt}</p>
                <h2 className="text-lg font-medium my-2">Completion:</h2>
                <p className="text-gray-700">{input.completion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FineTune;
