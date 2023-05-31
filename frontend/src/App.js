import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import NotFoundPage from "./pages/NotFoundPage";
import UserSignUp from "./pages/User/UserSignUp";
import RecruiterSignUp from "./pages/Recruiter/RecruiterSignUp";
import LogIn from "./components/LogIn";


function App() {
  const { token, role} = useSelector((state) => state.auth)
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/usersignup" element={<UserSignUp />}></Route>
        <Route path="/recruitersignup" element={<RecruiterSignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
