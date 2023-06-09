import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.css";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import NotFoundPage from "./pages/NotFoundPage";
import UserSignUp from "./pages/User/UserSignUp";
import RecruiterSignUp from "./pages/Recruiter/RecruiterSignUp";
import LogIn from "./components/LogIn";
import AddJobs from "./pages/Job/AddJobs";
import RecruiterDashboard from "./pages/Recruiter/RecruiterDashboard";
import JobList from "./pages/Job/JobList";
import UpdateJob from "./pages/Job/UpdateJob";
import UserProfile from "./pages/User/UserProfile";
import RecruiterApplication from "./pages/Recruiter/RecruiterApplication";
import UserApplication from "./pages/User/UserApplication";
import RecruiterProfile from "./pages/Recruiter/RecruiterProfile";

function App() {
  const { token, role } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/usersignup" element={<UserSignUp />}></Route>
        <Route path="/userprofile" element={<UserProfile />}></Route>
        <Route path="/userapplication" element={<UserApplication />}></Route>
        <Route path="/recruitersignup" element={<RecruiterSignUp />}></Route>
        <Route path="/recruiterprofile" element={<RecruiterProfile />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/addjob" element={<AddJobs />}></Route>
        <Route path="/updatejob/:id" element={<UpdateJob />}></Route>
        <Route path="/jobs" element={<JobList />}></Route>
        <Route path="/dashboard" element={<RecruiterDashboard />}></Route>
        <Route
          path="/recruiterapplication"
          element={<RecruiterApplication />}
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
