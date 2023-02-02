import React from "react";
import "./App.css";
import Users from "./components/Users";

function App() {
  return (
    <div className="App">
      <h1>React Redux Redux Saga - Playground</h1>
      <Users limit={5} />
    </div>
  );
}

export default App;
