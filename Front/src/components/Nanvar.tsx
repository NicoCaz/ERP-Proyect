import React, { useCallback, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

interface Navlink {
  name: string;
  link: string;
}

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const navlinks: Navlink[] = [
    { name: "Productos", link: "/products" },
    { name: "Clientes", link: "/customers" },
    { name: "Facturas", link: "/invoices" },
  ];

  return (
    <nav className="navbar bg-base-100 shadow-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          DISDECO
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
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
        <button onClick={toggleDarkMode} className="btn">
          {isDarkMode ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
