import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";

const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const data = useStaticQuery(graphql`
    query MyQuery {
      allWordpressPage {
        edges {
          node {
            slug
            title
          }
        }
      }

      site {
        siteMetadata {
          apiUrl
          siteUrl
          header {
            navigation {
              label
              url
            }
          }
          socialLinks {
            twitter
            facebook
            instagram
            linkedin
            github
            whatsapp
            pinterest
            youtube
            dribbble
            behance
            externalLink
          }
          siteTitle
          siteDescription
        }
      }
    }
  `);

  const navigation = data.site.siteMetadata.header.navigation;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const apiUrl = data.site.siteMetadata.apiUrl;
  const socialLinks = data.site.siteMetadata.socialLinks;
  const siteTitle = data.site.siteMetadata.siteTitle;
  const siteDescription = data.site.siteMetadata.siteDescription;

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
            <span dangerouslySetInnerHTML={{ __html: siteTitle }}></span>
          </Link>
        </h1>
        <p
          className="site-description"
          dangerouslySetInnerHTML={{ __html: siteDescription }}
        ></p>
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
            onClick={(e) => setIsMenuToggled(!isMenuToggled)}
            className="menu-toggle"
            aria-controls="primary-menu"
            aria-expanded="false"
          >
            ☰ Menu
          </button>
          <div className="menu-primary-container">
            <ul id="primary-menu" className="menu">
              {navigation.map(({ label, url }, i) => {
                return url.startsWith("/") ||
                  url.startsWith(siteUrl) ||
                  url.startsWith(apiUrl) ? (
                  <li key={i} role="presentation">
                    <Link
                      to={`${
                        url.startsWith("/")
                          ? url
                          : url.startsWith(siteUrl)
                          ? url.slice(siteUrl.length, url.length)
                          : url.slice(apiUrl.length, url.length)
                      }`}
                      activeClassName="active"
                    >
                      <span>{label}</span>
                    </Link>
                  </li>
                ) : (
                  <li key={i} role="presentation">
                    <a href={url} target="_blank" rel="noreferrer noopener">
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>{" "}
          <nav className="jetpack-social-navigation" role="navigation">
            <div className="menu-social-container">
              <ul id="menu-social" className="menu">
                {socialLinks.facebook && (
                  <li className="menu-item">
                    <a
                      href={socialLinks.facebook}
                      title="Facebook"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <i className="icon icon-facebook"></i>
                    </a>
                  </li>
                )}
                {socialLinks.twitter && (
                  <li className="menu-item">
                    <a
                      href={socialLinks.twitter}
                      title="Twitter"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <i className="icon icon-twitter"></i>
                    </a>
                  </li>
                )}
                {socialLinks.instagram && (
                  <li className="menu-item">
                    <a
                      href={socialLinks.instagram}
                      title="Instagram"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <i className="icon icon-instagram"></i>
                    </a>
                  </li>
                )}
                {socialLinks.linkedin && (
                  <li className="menu-item">
                    <a
                      href={socialLinks.linkedin}
                      title="LinkedIn"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <i className="icon icon-linkedin"></i>
                    </a>
                  </li>
                )}
                {socialLinks.github && (
                  <li className="menu-item">
                    <a
                      href={socialLinks.github}
                      title="GitHub"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <i className="icon icon-github-circled"></i>
                    </a>
                  </li>
                )}
                {socialLinks.pinterest && (
                  <li className="nav-twitter">
                    <a
                      href={socialLinks.pinterest}
                      title="Pinterest"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <i className="icon icon-pinterest"></i>
                    </a>
                  </li>
                )}
                {socialLinks.youtube && (
                  <li className="nav-twitter">
                    <a
                      href={socialLinks.youtube}
                      title="Youtube"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <i className="icon icon-youtube-play"></i>
                    </a>
                  </li>
                )}
                {socialLinks.dribbble && (
                  <li className="nav-twitter">
                    <a
                      href={socialLinks.dribbble}
                      title="Dribbble"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <i className="icon icon-dribbble"></i>
                    </a>
                  </li>
                )}
                {socialLinks.behance && (
                  <li className="nav-twitter">
                    <a
                      href={socialLinks.behance}
                      title="Behance"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <i className="icon icon-behance"></i>
                    </a>
                  </li>
                )}
                {socialLinks.whatsapp && (
                  <li className="nav-twitter">
                    <a
                      href={socialLinks.whatsapp}
                      title="WhatsApp"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <i className="icon icon-whatsapp"></i>
                    </a>
                  </li>
                )}
                {socialLinks.externalLink && (
                  <li className="nav-twitter">
                    <a
                      href={socialLinks.externalLink}
                      title="External Link"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <i className="icon icon-link-1"></i>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
