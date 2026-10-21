import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShopping,
} from "react-icons/ai";
import {
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineViewGrid,
  HiOutlineUserCircle,
  HiOutlineLogout,
} from "react-icons/hi";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites) || [];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/shop");
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  const favCount = favorites.length;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0c1210]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 py-3"
          : "bg-[#0c1210]/60 backdrop-blur-md border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-zinc-300">
            <Link
              to="/shop"
              className={`hover:text-emerald-400 transition-colors ${
                location.pathname === "/shop" && !location.search ? "text-emerald-400 font-semibold" : ""
              }`}
            >
              Shop
            </Link>
            <Link
              to="/shop?filter=bestseller"
              className={`hover:text-emerald-400 transition-colors ${
                location.search.includes("bestseller") ? "text-emerald-400 font-semibold" : ""
              }`}
            >
              Bestsellers
            </Link>
            <Link
              to="/#gallery"
              className="hover:text-emerald-400 transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className={`hover:text-emerald-400 transition-colors ${
                location.pathname === "/about" ? "text-emerald-400 font-semibold" : ""
              }`}
            >
              About
            </Link>
          </nav>

          {/* Center Brand Logo */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <Link to="/" className="inline-flex items-center space-x-2 group">
              <span className="font-editorial text-2xl sm:text-3xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                Homedine
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform"></span>
            </Link>
          </div>

          {/* Right Area: Search, Icons & Account */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Pill */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex items-center relative"
            >
              <input
                type="text"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-52 xl:w-64 bg-zinc-900/80 border border-white/10 text-xs text-white rounded-full pl-9 pr-4 py-2 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-500"
              />
              <AiOutlineSearch className="absolute left-3 text-zinc-400 text-sm pointer-events-none" />
            </form>

            {/* Wishlist Heart */}
            <Link
              to="/favorite"
              className="relative p-2 text-zinc-300 hover:text-pink-400 transition-colors rounded-full hover:bg-white/5"
              title="Wishlist"
            >
              <AiOutlineHeart className="text-xl" />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-zinc-300 hover:text-emerald-400 transition-colors rounded-full hover:bg-white/5"
              title="Cart"
            >
              <HiOutlineShoppingBag className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-[10px] font-bold text-black rounded-full flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Quick Admin Portal Button */}
            {userInfo?.isAdmin && (
              <Link
                to="/admin/dashboard"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-800 hover:text-white transition-all shadow-sm shadow-emerald-950"
              >
                <HiOutlineViewGrid className="text-sm" />
                <span>Admin</span>
              </Link>
            )}

            {/* User Account / Profile Dropdown */}
            {userInfo ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-white/5 border border-white/10 transition-colors focus:outline-none"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-800 flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
                    {userInfo.username ? userInfo.username[0] : "U"}
                  </div>
                  <span className="hidden sm:inline-block text-xs font-medium text-zinc-300 max-w-[80px] truncate">
                    {userInfo.username}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-zinc-800/80">
                      <p className="text-xs text-zinc-400">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">
                        {userInfo.username}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2.5 text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
                    >
                      <HiOutlineUserCircle className="mr-2 text-base text-zinc-400" />
                      My Profile
                    </Link>

                    {/* Admin Specific Links */}
                    {userInfo.isAdmin && (
                      <div className="border-t border-zinc-800/80 my-1 pt-1">
                        <div className="px-4 py-1 text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                          Admin Panel
                        </div>
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
                        >
                          <HiOutlineViewGrid className="mr-2 text-base text-emerald-400" />
                          Dashboard
                        </Link>
                        <Link
                          to="/admin/productlist"
                          className="flex items-center px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
                        >
                          <HiOutlineSparkles className="mr-2 text-base text-emerald-400" />
                          Create Product
                        </Link>
                        <Link
                          to="/admin/allproductslist"
                          className="flex items-center px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
                        >
                          <AiOutlineShopping className="mr-2 text-base text-emerald-400" />
                          All Products
                        </Link>
                        <Link
                          to="/admin/categorylist"
                          className="flex items-center px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
                        >
                          <span className="mr-2 text-emerald-400">🏷️</span>
                          Categories
                        </Link>
                        <Link
                          to="/admin/orderlist"
                          className="flex items-center px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
                        >
                          <span className="mr-2 text-emerald-400">📦</span>
                          Orders
                        </Link>
                        <Link
                          to="/admin/userlist"
                          className="flex items-center px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors"
                        >
                          <span className="mr-2 text-emerald-400">👥</span>
                          Users
                        </Link>
                      </div>
                    )}

                    <div className="border-t border-zinc-800/80 my-1 pt-1">
                      <button
                        type="button"
                        onClick={logoutHandler}
                        className="w-full text-left flex items-center px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/30 transition-colors"
                      >
                        <HiOutlineLogout className="mr-2 text-base" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-full text-zinc-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all shadow-emerald-900/40"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <AiOutlineClose className="text-xl" />
              ) : (
                <AiOutlineMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-zinc-800/80 pb-4 space-y-3 animate-in fade-in duration-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white rounded-full pl-9 pr-4 py-2 focus:outline-none focus:border-emerald-500"
              />
              <AiOutlineSearch className="absolute left-3 top-2.5 text-zinc-400 text-sm" />
            </form>

            <nav className="flex flex-col space-y-2 text-sm text-zinc-300 font-medium">
              <Link to="/shop" className="px-2 py-1.5 rounded hover:bg-zinc-800">
                Shop All
              </Link>
              <Link
                to="/shop?filter=bestseller"
                className="px-2 py-1.5 rounded hover:bg-zinc-800"
              >
                Bestsellers
              </Link>
              <Link to="/about" className="px-2 py-1.5 rounded hover:bg-zinc-800">
                About Our Story
              </Link>
              <Link to="/#gallery" className="px-2 py-1.5 rounded hover:bg-zinc-800">
                Inspiration Gallery
              </Link>
              <Link to="/favorite" className="px-2 py-1.5 rounded hover:bg-zinc-800">
                Favorites ({favCount})
              </Link>
              <Link to="/cart" className="px-2 py-1.5 rounded hover:bg-zinc-800">
                Cart ({cartCount})
              </Link>
              {userInfo?.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="px-2 py-1.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold"
                >
                  ⚡ Admin Dashboard
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
