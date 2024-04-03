import React, { useCallback, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";

interface Navlink {
  name: string;
  link: string;
  sublinks?: Navlink[];
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("cupcake");
  const { toggleTheme } = useStore();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const navlinks: Navlink[] = [
    { name: "Productos", link: "/products" },
    { name: "Clientes", link: "/customers" },
    { name: "Facturas", link: "/invoices" },
  ];

  return (
    <nav className="navbar bg-base-100 shadow-2xl">
      <div className="navbar-start">
        <div className="dropdown relative lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {isMenuOpen && (
            <ul className="menu bg-base-200 w-56 rounded-box absolute z-50">
              {navlinks.map((element, index) => (
                <li key={index}>
                  {element.sublinks ? (
                    <details open>
                      <summary>{element.name}</summary>
                      <ul>
                        {element.sublinks.map((sublink, subIndex) => (
                          <li key={subIndex}>
                            <NavLink
                              to={sublink.link}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                              onClick={toggleMenu}
                            >
                              {sublink.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <NavLink
                      to={element.link}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                      onClick={toggleMenu}
                    >
                      {element.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          DISDECO
        </Link>
      </div>
      <div className="navbar-center lg:flex hidden">
        <ul className="menu menu-horizontal px-1">
          {navlinks.map((element, index) => (
            <li key={index}>
              <NavLink
                to={element.link}
                className="btn btn-ghost mt-2 md:mt-0 md:ml-4 text-base font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200"
              >
                {element.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <button onClick={toggleTheme}>Cambiar tema</button>
      </div>
    </nav>
  );
};

export default Navbar;
