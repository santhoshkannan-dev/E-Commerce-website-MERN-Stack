import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import ProductCard from "./ProductCard";
import { FaHeart, FaArrowRight } from "react-icons/fa";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-emerald-900/30 pb-6 mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
              <FaHeart className="text-emerald-400" />
              <span>Saved Collection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold">
              Your Wishlist & Favorites
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
              Curated sustainable kitchenware, non-toxic cookware, and artisan pieces you have earmarked for your home.
            </p>
          </div>

          <div className="text-xs text-stone-400">
            <span className="font-bold text-emerald-400 text-sm">{favorites.length}</span> {favorites.length === 1 ? "item" : "items"} saved
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl border border-emerald-900/30 text-center max-w-xl mx-auto my-12 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-900/30 border border-emerald-700/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <FaHeart className="text-2xl" />
            </div>
            <h2 className="font-serif text-2xl text-stone-100 font-bold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-stone-400 mb-8 max-w-sm mx-auto leading-relaxed">
              Explore our bestselling eco-friendly cookware, bamboo essentials, and earth-conscious dinnerware.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-900/40"
            >
              <span>Explore Collection</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard key={product._id} p={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
