import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { FaTruck, FaCreditCard, FaQrcode, FaArrowRight, FaShieldAlt } from "react-icons/fa";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("Credit / Debit Card");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address && !address) {
      // Stay on shipping
    }
  }, [navigate, shippingAddress, address]);

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200 py-10 px-4 sm:px-6 lg:px-8">
      <ProgressSteps step1 step2 />

      <div className="max-w-2xl mx-auto mt-6">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-900/30 shadow-2xl relative overflow-hidden">
          {/* Subtle ambient light */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-emerald-900/30">
            <div className="w-12 h-12 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400">
              <FaTruck className="text-xl" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-stone-100 font-bold">
                Shipping Destination
              </h1>
              <p className="text-xs text-stone-400 mt-1">
                Zero-carbon plastic-free delivery worldwide
              </p>
            </div>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Street Address
              </label>
              <input
                type="text"
                className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl px-4 py-3.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  City
                </label>
                <input
                  type="text"
                  className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl px-4 py-3.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                  placeholder="e.g. Seattle"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl px-4 py-3.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                  placeholder="e.g. 98101"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Country
              </label>
              <input
                type="text"
                className="w-full bg-forest-900/70 border border-emerald-900/40 rounded-xl px-4 py-3.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                placeholder="e.g. United States"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="pt-4 border-t border-emerald-900/30">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "Credit / Debit Card"
                      ? "bg-emerald-900/30 border-emerald-500 ring-2 ring-emerald-500/20 text-white"
                      : "bg-forest-900/50 border-emerald-900/30 text-stone-400 hover:border-emerald-700/50"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="paymentMethod"
                    value="Credit / Debit Card"
                    checked={paymentMethod === "Credit / Debit Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="w-8 h-8 rounded-lg bg-emerald-900/50 flex items-center justify-center text-emerald-400 mr-3">
                    <FaCreditCard />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-stone-200">Virtual Card</div>
                    <div className="text-[11px] text-stone-400">EMV Instant Simulator</div>
                  </div>
                </label>

                <label
                  className={`flex items-center p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "UPI / QR Code"
                      ? "bg-emerald-900/30 border-emerald-500 ring-2 ring-emerald-500/20 text-white"
                      : "bg-forest-900/50 border-emerald-900/30 text-stone-400 hover:border-emerald-700/50"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="paymentMethod"
                    value="UPI / QR Code"
                    checked={paymentMethod === "UPI / QR Code"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="w-8 h-8 rounded-lg bg-emerald-900/50 flex items-center justify-center text-emerald-400 mr-3">
                    <FaQrcode />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-stone-200">UPI / QR Code</div>
                    <div className="text-[11px] text-stone-400">Scan & Confirm</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60 transition-all text-sm tracking-wide"
              >
                <span>Continue to Review Order</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-stone-400 pt-2">
              <FaShieldAlt className="text-emerald-400" />
              <span>256-Bit SSL Encrypted & Carbon-Neutral Certified Checkout</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
