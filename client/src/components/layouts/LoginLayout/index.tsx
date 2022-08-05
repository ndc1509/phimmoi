import React from "react";
import Login from "../../Login";
import { LayoutProps } from "../MainLayout";
import Background from "./Background";
import Footer from "./Footer";
import Header from "./Header";
import "./LoginLayout.css";

const LoginLayout: React.FunctionComponent<LayoutProps> = ({
  children = <Login />,
}: LayoutProps) => {
  return (
    <div className="login-wrapper">
      <Background />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LoginLayout;
