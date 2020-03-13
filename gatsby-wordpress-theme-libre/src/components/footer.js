import React from "react";

const Footer = () => {
  return (
    <div>
      <footer id="colophon" className="site-footer" role="contentinfo">
        <div className="site-info">
          {" "}
          <a href="http://wordpress.org/">Proudly powered by Gatsby</a>{" "}
          <span className="sep"> | </span> Theme: Libre 2 by{" "}
          <a href="http://wordpress.com/themes/" rel="designer">
            Automattic & Armada
          </a>
          .
        </div>{" "}
      </footer>
    </div>
  );
};

export default Footer;
