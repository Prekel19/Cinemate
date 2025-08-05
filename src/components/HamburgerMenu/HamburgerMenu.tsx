import { Link } from "react-router";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import type { MenuItems } from "@/models/types";
import "./style.scss";
import { useState } from "react";

type HamburgerMenuProps = {
  menu: MenuItems[];
};

export const HamburgerMenu = ({ menu }: HamburgerMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <div className="hamburger-menu">
      <Button className="hamburger-menu-btn" onClick={handleMenu}>
        {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
      </Button>
      <div className={`hamburger-menu-overlay ${isMenuOpen && "active"}`}></div>
      <div className={`hamburger-menu-content ${isMenuOpen && "active"}`}>
        <div className="hamburger-menu-close">
          <Button onClick={handleMenu}>
            <X size={30} />
          </Button>
        </div>
        <div className="hamburger-menu-list">
          {menu.map((item, index) => (
            <Link key={index} to={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
