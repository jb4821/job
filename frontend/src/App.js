import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {<HomePage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
