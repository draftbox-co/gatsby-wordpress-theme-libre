/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import "../styles/global.css";
import { ArmadaFormsProvider } from "../context/form-context";

const Layout = ({ children }) => {
  return (
    <>
      <ArmadaFormsProvider client="armada-form">
        <main>{children}</main>
      </ArmadaFormsProvider>
    </>
  );
};

export default Layout;
