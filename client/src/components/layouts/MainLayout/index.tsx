import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export type LayoutProps = {
    children: React.ReactNode;
};

const MainLayout: React.FunctionComponent<LayoutProps> = ({
    children,
}: LayoutProps) => {
    return (
        <div>
            <Header />
            <main> {children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
