import "firebase/auth";
import AuthProvider from "./src/context/AuthProvider";
import BuilderProvider from "./src/context/BuilderProvider";
import React from "react";
import Layout from "./src/components/layout";

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <BuilderProvider>
        <Layout>{element}</Layout>
      </BuilderProvider>
    </AuthProvider>
  );
};
