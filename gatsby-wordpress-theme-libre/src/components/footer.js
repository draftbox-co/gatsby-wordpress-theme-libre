import React from "react";
import { Link, useStaticQuery } from "gatsby";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterSiteData {
      site {
        siteMetadata {
          siteUrl
          apiUrl
          footer {
            copyright
            navigation {
              label
              url
            }
          }
          siteTitle
        }
      }
    }
  `);
  const copyright = data.site.siteMetadata.footer.copyright;
  const navigation = data.site.siteMetadata.footer.navigation;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const apiUrl = data.site.siteMetadata.apiUrl;
  const siteTitle = data.site.siteMetadata.siteTitle;

  return (
    <div className="footer-container">
      <footer id="colophon" className="site-footer" role="contentinfo">
        <div className="copyright">
          <span dangerouslySetInnerHTML={{__html:  copyright ? copyright: siteTitle}}></span>
  {" "}© {new Date().getFullYear()}
        </div>

        <ul className="footer-links">
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

        {/* <div className="site-info">
          Made with DraftBox ·{" "}
          <a href="/rss.xml" style={{ fontStyle: "normal" }}>
            RSS <img style={{ height: "12px" }} src={rssLogo} alt="" />
          </a>{" "}
        </div>{" "} */}
      </footer>
      <hr />
      <div className="credits">
        <a href="https://draftbox.co?ref=preview" rel="noopener noreferrer" target="_blank">
          Published with Draftbox
        </a>
      </div>
    </div>
  );
};

export default Footer;
