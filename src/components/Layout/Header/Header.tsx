import { Link, NavLink } from "react-router";
import type { MenuItems } from "@/models/types";
import "./style.scss";
import { HamburgerMenu } from "@/components/HamburgerMenu/HamburgerMenu";

const menu: MenuItems[] = [
  { name: "All", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "TV Series", path: "/series" },
  { name: "Watchlist", path: "/watchlist" },
];

export const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/">
          <span>C</span>inemate
        </Link>
      </h1>
      <div className="nav-menu">
        {menu.map((item) => (
          <NavLink to={item.path}>{item.name}</NavLink>
        ))}
      </div>
      <HamburgerMenu menu={menu} />
    </header>
  );
};
