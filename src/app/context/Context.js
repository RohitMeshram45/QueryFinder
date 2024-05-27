"use client"
import { createContext, useEffect, useState } from "react";
import runChat from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = (props) => {

  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState("")
  const [prevPrompt, setPrevPrompt] = useState([])
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("")


  const delayPara = (index, nexWord) => {
    setTimeout(() => {
      setResultData(prev => prev + nexWord)
    }, 75 * index);
  }

  const newChat = ()=>{
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {

    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt)
      setRecentPrompt(prompt)
    }
    else {
      setPrevPrompt(prev => [...prev, input])
      setRecentPrompt(input)
      response = await runChat(input);
    }
    // setRecentPrompt(input)
    // setPrevPrompt(prev => [...prev , input])
    // const response = await runChat(input);
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      }
      else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>")

    let newResponseArray = newResponse2.split(" ")

    for (let i = 0; i < newResponseArray.length; i++) {
      const nexWord = newResponseArray[i];
      delayPara(i, nexWord + " ")
    }
    setLoading(false)
    setInput("")

  }

  // This function will run when the component mounts

  const contextValue = {
    // Define your context value here if needed
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    resultData,
    loading,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
