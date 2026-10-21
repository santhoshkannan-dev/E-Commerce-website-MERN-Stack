import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { FaShieldAlt, FaTruck, FaCreditCard, FaLock, FaShoppingBag } from "react-icons/fa";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200 py-10 px-4 sm:px-6 lg:px-8">
      <ProgressSteps step1 step2 step3 />

      <div className="max-w-6xl mx-auto mt-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400">
            <FaShoppingBag />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-stone-100 font-bold">
              Review & Place Order
            </h1>
            <p className="text-xs text-stone-400 mt-0.5">
              Please inspect your items and shipping details before completing your order
            </p>
          </div>
        </div>

        {cart.cartItems.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-3xl border border-emerald-900/30">
            <h3 className="font-serif text-xl text-stone-200 mb-2">Your cart is currently empty</h3>
            <p className="text-xs text-stone-400 mb-6">Discover our sustainable kitchenware collection to continue.</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="glass-panel rounded-3xl border border-emerald-900/30 overflow-hidden shadow-xl">
                <div className="px-6 py-4 border-b border-emerald-900/30 bg-forest-900/40 flex items-center justify-between">
                  <h2 className="text-sm font-semibold tracking-wider uppercase text-stone-300">
                    Order Items ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>
                  <Link to="/cart" className="text-xs text-emerald-400 hover:text-emerald-300 underline font-medium">
                    Edit Bag
                  </Link>
                </div>

                <div className="divide-y divide-emerald-900/20">
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="p-4 sm:p-6 flex items-center justify-between hover:bg-forest-900/30 transition-colors">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-emerald-900/40 bg-stone-900"
                        />
                        <div>
                          <Link
                            to={`/product/${item.product}`}
                            className="font-medium text-stone-100 hover:text-emerald-400 transition-colors text-sm sm:text-base line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <div className="text-xs text-stone-400 mt-1">
                            Qty: <span className="text-stone-200 font-semibold">{item.qty}</span> × ₹{Number(item.price).toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono text-base font-bold text-emerald-300">
                          ₹{Number(item.qty * item.price).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery & Payment Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-panel p-5 rounded-3xl border border-emerald-900/30">
                  <div className="flex items-center space-x-2.5 text-emerald-400 mb-2">
                    <FaTruck className="text-sm" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Shipping Address</span>
                  </div>
                  <p className="text-sm text-stone-200">
                    {cart.shippingAddress.address}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                  </p>
                  <div className="mt-3">
                    <Link to="/shipping" className="text-xs text-emerald-400 hover:underline">
                      Change address
                    </Link>
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-3xl border border-emerald-900/30">
                  <div className="flex items-center space-x-2.5 text-emerald-400 mb-2">
                    <FaCreditCard className="text-sm" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Payment Method</span>
                  </div>
                  <p className="text-sm text-stone-200 font-medium">
                    {cart.paymentMethod}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Instant sandbox simulator enabled
                  </p>
                  <div className="mt-3">
                    <Link to="/shipping" className="text-xs text-emerald-400 hover:underline">
                      Change method
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Sidebar (4 cols) */}
            <div className="lg:col-span-4">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-900/30 shadow-2xl sticky top-28 space-y-6">
                <h2 className="font-serif text-xl font-bold text-stone-100 border-b border-emerald-900/30 pb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm text-stone-300">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-mono text-stone-200">₹{Number(cart.itemsPrice).toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span>Carbon-Neutral Shipping</span>
                      <div className="text-[11px] text-emerald-400">Zero plastic guarantee</div>
                    </div>
                    <span className="font-mono text-stone-200">
                      {Number(cart.shippingPrice) === 0 ? (
                        <span className="text-emerald-400 font-semibold uppercase text-xs">Free</span>
                      ) : (
                        `₹${Number(cart.shippingPrice).toLocaleString("en-IN")}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated GST (5%)</span>
                    <span className="font-mono text-stone-200">₹{Number(cart.taxPrice).toLocaleString("en-IN")}</span>
                  </div>

                  <div className="pt-4 border-t border-emerald-900/30 flex justify-between items-baseline">
                    <span className="font-serif text-base font-bold text-stone-100">Grand Total</span>
                    <span className="font-mono text-2xl font-bold text-emerald-400">
                      ₹{Number(cart.totalPrice).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {error && (
                  <Message variant="danger">{error?.data?.message || "Failed to place order"}</Message>
                )}

                <button
                  type="button"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/70 transition-all text-sm tracking-wide disabled:opacity-50"
                  disabled={cart.cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                >
                  <FaLock className="text-xs" />
                  <span>{isLoading ? "Creating Order..." : "Confirm & Proceed to Payment"}</span>
                </button>

                {isLoading && <Loader />}

                <div className="flex items-center justify-center space-x-2 text-[11px] text-stone-400 pt-2">
                  <FaShieldAlt className="text-emerald-400" />
                  <span>Backed by our 30-Day Happiness Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
