import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";

import NotFoundPage from "./pages/NotFoundPage";
import UserSignUp from "./pages/User/UserSignUp";


function App() {
  const { token, role} = useSelector((state) => state.auth)
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<UserSignUp />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
