import { Link, NavLink } from "react-router";
import "./style.scss";

export const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/">
          <span>C</span>inemate
        </Link>
      </h1>
      <div className="nav-menu">
        <NavLink to="/">All</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/series">TV Series</NavLink>
        <NavLink to="/watchlist">Watchlist</NavLink>
      </div>
    </header>
  );
};
