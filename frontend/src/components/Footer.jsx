import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#080d0b] text-stone-400 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 space-y-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
          <div className="max-w-md space-y-4">
            <p className="font-editorial text-xl sm:text-2xl text-stone-200 leading-snug">
              Homedine promotes sustainable dining with beautifully crafted bamboo and glass{" "}
              <em className="italic text-emerald-300 font-normal">✧ Kitchenware!</em>
            </p>
            <div>
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-full border border-stone-500 text-stone-200 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Join Us Now</span>
                <span className="text-xs">↗</span>
              </Link>
            </div>
          </div>

          <div className="flex space-x-12 sm:space-x-16 text-xs">
            <div>
              <h4 className="font-semibold text-stone-300 mb-3 uppercase tracking-wider text-[11px]">Collections</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/shop?filter=drinkware" className="hover:text-emerald-300 transition-colors">
                    Drinkware
                  </Link>
                </li>
                <li>
                  <Link to="/shop?filter=tableware" className="hover:text-emerald-300 transition-colors">
                    Tableware
                  </Link>
                </li>
                <li>
                  <Link to="/shop?filter=utensils" className="hover:text-emerald-300 transition-colors">
                    Utensils
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-stone-300 mb-3 uppercase tracking-wider text-[11px]">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 hover:text-emerald-300 transition-colors">
                    <span>Twitter</span>
                    <span>↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 hover:text-emerald-300 transition-colors">
                    <span>Instagram</span>
                    <span>↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 hover:text-emerald-300 transition-colors">
                    <span>LinkedIn</span>
                    <span>↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Huge Typographic Homedine Watermark */}
        <div className="text-center select-none pt-4 pb-2 overflow-hidden">
          <span className="font-editorial text-7xl sm:text-9xl lg:text-[13rem] font-bold tracking-tight text-stone-200/25 hover:text-stone-200/35 transition-colors block leading-none">
            Homedine
          </span>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Homedine Eco Inc. All rights reserved.</p>
          <div className="flex space-x-6 text-[11px]">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
