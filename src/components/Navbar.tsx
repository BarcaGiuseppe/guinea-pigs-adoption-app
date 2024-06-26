import { useState } from "react";
import Link from "next/link";
import { useDataByContext } from "@/ContextProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin, loginAdmin } = useDataByContext();
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    loginAdmin();
    router.push("/");
  };
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://img.freepik.com/premium-vector/guinea-pig-clipart-black-outlines-vector-illustration_636653-5.jpg?w=1800"
            className="h-8 rounded-full"
            alt="Guinea Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Love Guinea Pig
          </span>
        </Link>
        {/* Mostra l'hamburger solo sui dispositivi mobili utilizzando media query */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-hamburger"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {/* Mostra i link solo sui dispositivi desktop */}
        <div className="hidden md:flex md:items-center md:justify-end">
          <ul className="flex flex-col font-medium md:flex-row md:space-x-4">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>

            {isAdmin ? (
              /* da rivedere perchè il form potrebbe essere compilato dall compratore */
              <li>
                <a
                  href="/add-pig"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Add Guinea Pig
                </a>
              </li>
            ) : (
              <li>
                <a
                  href="/guinea-list"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Adopt
                </a>
              </li>
            )}
            <li>
              {isAdmin ? (
                <button
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Mostra il dropdown solo sui dispositivi mobili */}
      <div
        className={`w-full ${isMenuOpen ? "block" : "hidden"}`}
        id="navbar-hamburger"
      >
        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/guinea-list"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Adopt
            </Link>
          </li>
          <li>
            <Link
              href="/add-pig"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Add Guinea Pig
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
