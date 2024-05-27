"use client"
import Sidebar from "./components/Siderbar/Sidebar";
import Main from "@/app/components/Main/Main.js"
import ContextProvider from "./context/Context";
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState(true);
  return (
    <>
      <ContextProvider >
        <div  className="flex">
          <Sidebar />
          <Main />
        </div>
      </ContextProvider>
    </>
  );
}
