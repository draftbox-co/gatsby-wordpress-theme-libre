/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { ArmadaFormsProvider } from "../context/form-context";

const Layout = ({ children }) => {
  return (
    <>
      <ArmadaFormsProvider client={process.env.GATSBY_FORM_URL}>
        <main>{children}</main>
      </ArmadaFormsProvider>
    </>
    
  );
};

export default Layout;
