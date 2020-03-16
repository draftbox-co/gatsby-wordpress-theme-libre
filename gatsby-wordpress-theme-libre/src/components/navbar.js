import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      wordpressSiteMetadata {
        name
        url
        description
      }
    }
  `);

  useEffect(() => {
    const siteHeader = document.querySelector(".site-header");
    const siteHeaderRect = siteHeader.getBoundingClientRect();
    const stickyHeaderOffset = siteHeaderRect.top + document.body.scrollTop;

    const addStcikyClass = () => {
      if (window.scrollY > stickyHeaderOffset) {
        document.body.classList.add("sticking");
      } else {
        document.body.classList.remove("sticking");
      }
    };

    window.addEventListener("scroll", addStcikyClass);

    return () => {
      window.removeEventListener("scroll", addStcikyClass);
    };
  }, []);

  return (
    <header id="masthead" className="site-header" role="banner">
      <div className="site-branding">
        <h1 className="site-title">
          <Link to="/" rel="home">
            {data.wordpressSiteMetadata.name}
          </Link>
        </h1>
        <p className="site-description">
          {data.wordpressSiteMetadata.description}
        </p>
      </div>
    </header>
  );
};

export default Navbar;
