import React from "react";
import Sidebar from "./components/Sidebar";
import styles from "../styles/Home.module.css";

const FineTune = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className="bg-white p-4 lg:col-span-1 text-center">
        <h1 className="text-2xl font-medium">Fine Tune</h1>
        <p className="text-lg">
          Here you can fine-tune the model by providing additional prompts and
          expected completions.
        </p>
      </div>
    </div>
  );
};

export default FineTune;
