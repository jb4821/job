import React from 'react'
import Navbar from '../components/Navbar'
import NotFoundImage from "../assets/images/404.png"

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div
        className="not-found-page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img src={NotFoundImage} alt="404 Not Found" />
        </div>
      </div>
    </>
  );
}

export default NotFoundPage