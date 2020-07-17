import React from "react";
import { Link } from "gatsby";

const NotFound = () => {
  return (
    <div className="error-message-container">
      <div className="error-message">
        <h2 className="error-title">Offline :(</h2>
        <p className="error-description">
          Looks like you lost your connection. Please check it and try again.
        </p>
        <Link to="/" className="error-link">
          Try again →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
