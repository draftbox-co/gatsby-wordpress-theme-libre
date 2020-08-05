import React from "react";
import { useState } from "react";
import { useForm } from "../hook/useForm";
import "../styles/subscribe-form.css";
import { useStaticQuery, graphql } from "gatsby";

const SubscribeForm = () => {
  const [{ handleSubmit, submitting, succeeded }] = useForm("subscribe");

  const [email, setEmail] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ email });
  };

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          subscribeWidget {
            visible
            title
            helpText
            successMessage
          }
        }
      }
    }
  `);

  if (!data.site.siteMetadata.subscribeWidget.visible) {
    return null;
  }

  return (
    <div className="subscribe-form" id="subscribe">
      <form onSubmit={(e) => onSubmit(e)}>
        {succeeded && (
          <h1 className="subscribe-title">
            <span
              dangerouslySetInnerHTML={{
                __html: data.site.siteMetadata.subscribeWidget.successMessage,
              }}
            ></span>
          </h1>
        )}
        {!succeeded && (
          <>
            <h1 className="subscribe-title">  
              <span
                dangerouslySetInnerHTML={{
                  __html: data.site.siteMetadata.subscribeWidget.title,
                }}
              ></span>
            </h1>
            <p className="subscribe-description">
              {data.site.siteMetadata.subscribeWidget.helpText}
            </p>
            <div>
              <label className="hidden" htmlFor="email">
                Email
              </label>
              <input
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                id="email"
                type="email"
                placeholder="Enter your email address"
              />
            </div>
            <button disabled={submitting} type="submit">
              {submitting ? "Subscribing..." : "Subscribe"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};
export default SubscribeForm;
