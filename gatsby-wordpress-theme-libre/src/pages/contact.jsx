import React from "react";
import Layout from "../components/layout";
import ContactForm from "../components/contact-form";
import ContactMeta from "../components/meta/contact-meta";

const Contact = ({ location }) => {
  return (
    <Layout>
      <ContactMeta location={location} />
      <ContactForm />
    </Layout>
  );
};

export default Contact;
