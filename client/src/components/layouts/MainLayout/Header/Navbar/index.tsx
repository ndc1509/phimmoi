import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

interface NavItemProps {
  name: string;
  slug: string;
}

const Navbar = () => {
  const navItems: NavItemProps[] = [
    {
      name: "TV Series",
      slug: "/tv-series",
    },
    {
      name: "Movies",
      slug: "/movies",
    },
    {
      name: "New & Popular",
      slug: "/latest",
    },
    {
      name: "My List",
      slug: "/my-list",
    },
  ];
  return (
    <nav className="header__navbar">
      <Link to={"/"} className="main-header__navbar__nav-item nav-item--home">
        Home
      </Link>
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.slug}
          className="main-header__navbar__nav-item"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
