import React from "react";
import { Link } from "gatsby";

const NotFound = () => {
  return (
    <div className="error-message-container">
      <div className="error-message">
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-description">
          Looks like you've followed a broken link or entered a URL that doesn't
          exist on this site.
        </p>
        <Link to="/" className="error-link">
          Back to our site →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
