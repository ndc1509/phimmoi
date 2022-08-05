import React from "react";
import Footer from "../MainLayout/Footer";
import SecondaryHeader from "./Header";

export type LayoutProps = {
  children: React.ReactNode;
};

const SecondaryLayout: React.FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => {
  return (
    <div>
      <SecondaryHeader />
      <main> {children}</main>
      <Footer />
    </div>
  );
};

export default SecondaryLayout;
