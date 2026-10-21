import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p, badge = "Customer favorite" }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="group relative rounded-2xl bg-[#141b18] border border-white/5 hover:border-emerald-500/40 p-4 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/40">
      <div>
        {/* Top Header inside card: Badge + Heart */}
        <div className="flex items-center justify-between mb-3 z-10 relative">
          <span className="text-[11px] font-medium tracking-wide text-zinc-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            {p?.brand || badge}
          </span>
          <div className="transform transition-transform group-hover:scale-110">
            <HeartIcon product={p} />
          </div>
        </div>

        {/* Product Image */}
        <Link to={`/product/${p?._id}`} className="block overflow-hidden rounded-xl bg-zinc-950/40 relative aspect-square mb-4">
          <img
            src={p?.image || "/images/cookware_showcase.jpg"}
            alt={p?.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Color Palette Indicator Dots */}
        <div className="flex items-center space-x-1.5 mb-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8ac7b4] border border-black/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#e07a5f] border border-black/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#bcc5b4] border border-black/20" />
        </div>

        {/* Title */}
        <Link to={`/product/${p?._id}`} className="block">
          <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
            {p?.name}
          </h3>
        </Link>
      </div>

      {/* Bottom Price & Add to Cart button */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
        <span className="text-base font-bold text-white font-mono">
          ${typeof p?.price === "number" ? p.price.toFixed(2) : p?.price}
        </span>

        <button
          type="button"
          onClick={(e) => addToCartHandler(e, p)}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 px-3.5 py-1.5 rounded-full transition-all shadow-sm shadow-emerald-950 hover:shadow-emerald-900/50 active:scale-95"
        >
          <AiOutlinePlus className="text-xs" />
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
