import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  return (
    <header className="bg-gray-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl">
            <span className="text-red-600">Estates</span>
            <span className="text-gray-700">Infinity</span>
          </h1>
        </Link>
        <form className="bg-gray-200 p-3 rounded-lg items-center flex">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-gray-700" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-gray-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-gray-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="user"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <li className="sm:inline text-gray-700 hover:underline">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
