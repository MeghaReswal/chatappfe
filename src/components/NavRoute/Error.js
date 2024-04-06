import React from "react";
import "./error.css";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

const Error = () => {
  return (
    <>
      <div className="container">
        <div className="error_page">
          <i className="bi bi-emoji-frown"></i>
          <div className="num">404</div>
          <div className="Error_page "> Oops! Page Not Found</div>
        </div>
      </div>
    </>
  );
};

export default Error;
