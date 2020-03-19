import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";

const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const data = useStaticQuery(graphql`
    query MyQuery {
      wpSiteMetaData {
        ...WordpressSiteMetaData
      }

      allWordpressPage {
        edges {
          node {
            slug
            title
          }
        }
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
            {data.wpSiteMetaData.name}
          </Link>
        </h1>
        <p className="site-description">
          {data.wpSiteMetaData.description}
        </p>
      </div>
      <div className="nav-wrapper">
        {" "}
        <nav
          id="site-navigation"
          className={"main-navigation " + (isMenuToggled ? "toggled" : "")}
          role="navigation"
        >
          {" "}
          <button
            onClick={e => setIsMenuToggled(!isMenuToggled)}
            className="menu-toggle"
            aria-controls="primary-menu"
            aria-expanded="false"
          >
            ☰ Menu
          </button>
          <div id="primary-menu" className="menu">
            <ul>
              {data.allWordpressPage.edges.map((pageMeta, i) => {
                return (
                  <li key={i}>
                    <Link to={`/${pageMeta.node.slug}`}>
                     <span dangerouslySetInnerHTML ={{__html: pageMeta.node.title}}></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>{" "}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
