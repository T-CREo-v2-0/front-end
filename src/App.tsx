import React from "react";
import { Popup } from "./components/Popup";
import { Options } from "./components/Options";

function App() {
  return (
  <div className="App bg-gray-100">
    {Popup()}
    {Options()}
  </div>
  );
}

export default App;
