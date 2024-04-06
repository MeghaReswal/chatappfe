import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import ChatRoom from "./components/chat";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
