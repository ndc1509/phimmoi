import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div className="login-header">
      <Link className="logo" to={"/"}>
        <img src="/logo49.png" alt="logo49" />
      </Link>
    </div>
  );
};

export default React.memo(Header);
