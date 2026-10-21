import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full sm:w-[18rem] p-3">
      <div className="glass-panel rounded-3xl border border-emerald-900/30 overflow-hidden group hover:border-emerald-600/50 transition-all shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-forest-900">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 z-10">
            <HeartIcon product={product} />
          </div>
        </div>

        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h3 className="font-serif text-sm font-bold text-stone-100 group-hover:text-emerald-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-sm font-bold text-emerald-400">
              ${Number(product.price).toFixed(2)}
            </span>
            <Link
              to={`/product/${product._id}`}
              className="text-[11px] font-semibold text-stone-400 hover:text-emerald-300 uppercase tracking-wider"
            >
              View →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
