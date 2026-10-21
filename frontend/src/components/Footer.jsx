import { Link } from "react-router-dom";
import { FaLeaf, FaArrowRight, FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#090d0b] text-zinc-400 text-sm">
      {/* Editorial Mission Statement Banner */}
      <div className="border-b border-white/5 py-12 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-[#0c1210] to-[#090d0b]">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3.5 py-1 rounded-full">
            <FaLeaf className="text-xs" />
            <span>Ethical & Conscious Living</span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl text-zinc-100 leading-snug">
            Discover our commitment to <em className="italic text-emerald-300 font-normal">sustainable</em> materials, low-impact production, and <em className="italic text-emerald-300 font-normal">ethical sourcing</em> partnerships — all crafted for a greener home.
          </h2>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="inline-flex items-center space-x-2">
              <span className="font-editorial text-2xl tracking-tight text-white">Homedine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Curated eco-friendly kitchenware and conscious lifestyle essentials designed for timeless, sustainable living.
            </p>
            <div className="flex space-x-3 text-zinc-400">
              <a href="#" className="hover:text-emerald-400 transition-colors p-2 rounded-full bg-white/5">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors p-2 rounded-full bg-white/5">
                <FaPinterest className="text-sm" />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors p-2 rounded-full bg-white/5">
                <FaTwitter className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-4">Shop Collections</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/shop?filter=cookware" className="hover:text-white transition-colors">Non-Toxic Cookware</Link></li>
              <li><Link to="/shop?filter=utensils" className="hover:text-white transition-colors">Bamboo & Wooden Utensils</Link></li>
              <li><Link to="/shop?filter=drinkware" className="hover:text-white transition-colors">Reusable Drinkware</Link></li>
              <li><Link to="/favorite" className="hover:text-white transition-colors">My Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-4">Sustainability</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#about" className="hover:text-white transition-colors">Our Eco Materials</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Carbon-Neutral Shipping</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Plastic-Free Packaging</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Lifecycle & Recycling</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-2">Join the Movement</h4>
            <p className="text-xs text-zinc-400">
              Subscribe to receive conscious living guides and enjoy 10% off your first order.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to our conscious journal!"); }} className="flex relative">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-zinc-900 border border-white/10 rounded-full py-2.5 pl-4 pr-11 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder:text-zinc-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 w-8 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-white transition-colors"
              >
                <FaArrowRight className="text-xs" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 space-y-2 sm:space-y-0">
          <p>© 2026 Homedine Eco Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
