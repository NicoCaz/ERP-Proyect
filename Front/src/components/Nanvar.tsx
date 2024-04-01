import React, { useState } from "react";
import { NavLink } from "react-router-dom";
interface Navlink {
  name: string;
  link: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navlinks: Navlink[] = [
    {
      name: "Productos",
      link: "/products",
    },
    {
      name: "Clientes",
      link: "/customers",
    },
    {
      name: "Facturas",
      link: "/invoices",
    },
  ];


  return (
    <nav className="bg-gray-100 shadow-sm p-2">
      <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
        <div
          x-data="{ open: true }"
          className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        >
          <div className="flex flex-row items-center justify-between p-4">
            <a
              href="#"
              className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            >
              DISDECO
            </a>
            <button
              className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
              onClick={toggleMenu}
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path
                  x-show={!isMenuOpen}
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
                <path
                  x-show={isMenuOpen}
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <nav
            className={`flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row ${
              isMenuOpen ? "flex" : "hidden"
            }`}
          >
            {navlinks.map((element, index) => (
              <NavLink
                key={index}
                to={element.link}
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={toggleMenu}
              >
                {element.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
