import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaArrowRight, FaShoppingBag, FaShieldAlt } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-editorial text-3xl sm:text-4xl text-white font-medium">
          Shopping <em className="italic text-emerald-300 font-normal">Bag</em>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review your selected eco-conscious kitchen essentials
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400 text-2xl">
            <FaShoppingBag />
          </div>
          <h3 className="font-editorial text-2xl text-white">Your bag is empty</h3>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto">
            Discover our curated non-toxic cookware and handcrafted tableware.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-full transition-all shadow-lg shadow-emerald-950 mt-2"
          >
            <span>Explore Essentials</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart items list */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-zinc-950 border border-white/5"
                  />

                  <div className="space-y-1">
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold block">
                      {item.brand || "Homedine"}
                    </span>
                    <Link
                      to={`/product/${item._id}`}
                      className="font-medium text-sm text-white hover:text-emerald-300 transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <div className="font-bold text-sm text-zinc-100 font-mono">
                      ${item.price}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-zinc-400">Qty:</span>
                    <select
                      className="bg-zinc-800 border border-zinc-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(Math.max(item.countInStock || 10, 10)).keys()].slice(0, 10).map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-right font-mono font-bold text-emerald-300 text-sm min-w-[70px]">
                    ₹{Number(item.qty * item.price).toLocaleString("en-IN")}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCartHandler(item._id)}
                    className="p-2 text-zinc-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-950/20"
                    title="Remove item"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-6 shadow-2xl sticky top-24">
              <h2 className="font-editorial text-xl text-white font-medium pb-3 border-b border-white/5">
                Summary ({totalItems} items)
              </h2>

              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-white">₹{Number(totalPrice).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbon-Neutral Shipping</span>
                  <span className="text-emerald-400 font-semibold">FREE (Over ₹500)</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (5%)</span>
                  <span className="text-zinc-400">Included at checkout</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                  <span>Estimated Total</span>
                  <span className="font-mono text-emerald-300 text-lg">₹{Number(totalPrice).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={checkoutHandler}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950 hover:shadow-emerald-900/40 flex items-center justify-center space-x-2 active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <FaArrowRight className="text-[10px]" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-zinc-400 pt-2 border-t border-white/5">
                <FaShieldAlt className="text-emerald-400" />
                <span>30-Day Happiness Guarantee & Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
