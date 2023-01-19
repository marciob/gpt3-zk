import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //characters counter while typing to show on UI
  const [input, setInput] = useState("");
  //error handler
  const [error, setError] = useState(false);
  //stores the suggestion results
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  let selectedModel = Sidebar.selectedModel;

  useEffect(() => {
    if (input.length <= 100) {
      setError(false);
    } else {
      setError(true);
    }
  }, [input]);

  // function to submit the input text
  const submit = async () => {
    //check if character limit is exceeded
    if (input.length > 100) {
      return setError(true);
    }
    //UI loading state
    setLoading(true);

    try {
      const res = await fetch("/api/text-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input, selectedModel }),
      });
      const suggestion = await res.json();

      setSuggestion(suggestion.result.trim());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ask AI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <div className="max-w-7x1 mx-auto py-12">
        <h2 className="text-2xl font-bold text-center pb-2">
          {`Ask me anything about ${
            selectedModel ? selectedModel : "Semaphore"
          }`}
        </h2>
        {/* input field */}
        <div className="flex flex-col gap-2 justify-center w-1/3 mx-auto">
          <div className="relative w-full">
            {/* error message handler */}
            {error && (
              <p className="text-xs pt-1 text-red-500">
                Character limit exceeded, please enter less text
              </p>
            )}
            <textarea
              rows={3}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="w-full border-2 border-gray-300 bg-white p-4 rounded-lg text-sm focus:outline-none resize-none"
              placeholder="Ask a question about Zero Knowledge proof"
            />
            {/* charecter limit text in the bottom right side of textarea */}
            <div
              className={`absolute bottom-2 right-2 ${
                input.length > 100 ? "text-red-500" : "text-gray-400"
              } text-xs`}
            >
              <span>{input.length}</span>/100
            </div>
          </div>
          <button
            type="button"
            onClick={submit}
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounder"
          >
            {/* {loading ? "loading..." : "Generate"} */}
            {loading ? (
              <div className="flex justify-center items-center gap-4">
                <p>Loading...</p>
                <MoonLoader size={20} />
              </div>
            ) : (
              "Generate"
            )}
          </button>
          {/* output field with the results (shown only when "suggestion" is true) */}
          {suggestion && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold pb-2">Answer:</h4>
              <div className="relative w-full rounded-md bg-gray-100 p-4">
                <p className="text-lg text-gray-700">{suggestion}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
