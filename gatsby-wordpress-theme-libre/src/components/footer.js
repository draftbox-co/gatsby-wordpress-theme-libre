import React from "react";
import rssLogo from "../images/rss.svg";

const Footer = () => {
  return (
    <div>
      <footer id="colophon" className="site-footer" role="contentinfo">
        <div className="site-info">
          Made with DraftBox ·{" "}
          <a href="/rss.xml" style={{ fontStyle: "normal" }}>
            RSS <img style={{ height: "12px" }} src={rssLogo} alt="" />
          </a>{" "}
        </div>{" "}
      </footer>
    </div>
  );
};

export default Footer;
