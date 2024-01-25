import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import clsx from "clsx";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <div className="flex items-center gap-4">
          <FiMenu
            onClick={() => setOpen(true)}
            className="text-3xl cursor-pointer sm:hidden"
          />
          <ul className="flex gap-4">
            <Link to="/create-listing">
              <li className="hidden sm:inline text-gray-700 hover:underline">
                Sell
              </li>
            </Link>
            <Link to="/search?type=sell">
              <li className="hidden sm:inline text-gray-700 hover:underline">
                Buy
              </li>
            </Link>
            <Link to="/search?type=rent">
              <li className="hidden sm:inline text-gray-700 hover:underline">
                Rent
              </li>
            </Link>
          </ul>
        </div>
        <div
          className={clsx(
            " fixed h-full w-screen sm:hidden bg-black/50 z-20  backdrop-blur-sm top-0 right-0  -translate-x-full  transition-all ",
            isOpen && "translate-x-0"
          )}
        >
          <div className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex  ">
            <IoCloseOutline
              onClick={() => setOpen(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer"
            />
            <ul className="flex flex-col gap-4">
              <Link onClick={()=>setOpen(false)} to="/create-listing">
                <li className="font-bold">Sell</li>
              </Link>
              <Link onClick={()=>setOpen(false)} to="/search?type=sell">
                <li className="font-bold">Buy</li>
              </Link>
              <Link onClick={()=>setOpen(false)} to="/search?type=rent">
                <li className="font-bold">Rent</li>
              </Link>
            </ul>
          </div>
        </div>

        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl">
            <span className="text-red-600">Estates</span>
            <span className="text-gray-700">Infinity</span>
          </h1>
        </Link>
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

/*<div
className={clsx(
  " fixed h-full w-screen lg:hidden bg-black/50  backdrop-blur-sm top-0 right-0  -translate-x-full  transition-all ",
  isSideMenuOpen && "translate-x-0"
)}
>
<section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex  ">
  <IoCloseOutline
    onClick={() => setMenu(false)}
    className="mt-0 mb-8 text-3xl cursor-pointer"
  />

  {navlinks.map((d, i) => (
    <Link key={i} className="font-bold" href={d.link}>
      {d.labe}
    </Link>
  ))}
</section>
</div>
*/

/**
 * import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get("searchTerm");
    if (searchTermUrl) {
      setSearchTerm(searchTermUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl">
            <span className="text-red-600">Estates</span>
            <span className="text-gray-700">Infinity</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSearch}
          className="bg-gray-200 p-3 rounded-lg items-center flex"
        >
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button>
            <FaSearch className="text-gray-700" />
          </button>
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
 */
