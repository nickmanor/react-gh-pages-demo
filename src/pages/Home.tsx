import { useParams } from "react-router-dom";
import logo from "../logo.svg";
import React from "react";

export const Home = () => {
  const param = useParams();

  const id = param.id;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>If you can read this, you've made it to ULF.</p>
        <p>{id}</p>
      </header>
    </div>
  );
};
