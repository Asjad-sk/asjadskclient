import React from "react";
import "./App.css";
import TodoApp from "./components/TodoApp";
import Weather from "./components/Weather";


import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useState } from "react";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/todoapp" element={<TodoApp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
