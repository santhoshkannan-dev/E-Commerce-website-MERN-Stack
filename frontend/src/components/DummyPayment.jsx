import { useState } from "react";
import { FaCreditCard, FaQrcode, FaBolt, FaCheckCircle, FaLock, FaShieldAlt, FaWifi } from "react-icons/fa";

const PRESET_CARDS = [
  { brand: "Visa", number: "4242 4242 4242 4242", expiry: "12/28", cvv: "123", color: "from-blue-600 via-indigo-700 to-purple-800" },
  { brand: "Mastercard", number: "5555 5555 5555 4444", expiry: "08/29", cvv: "888", color: "from-amber-600 via-red-600 to-pink-700" },
  { brand: "Amex", number: "3782 822468 0005", expiry: "05/27", cvv: "3456", color: "from-emerald-600 via-teal-700 to-cyan-800" },
];

const DummyPayment = ({ order, onPaySuccess, isLoading }) => {
  const [activeTab, setActiveTab] = useState("card"); // 'card' | 'qr' | 'instant'
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [cardNumber, setCardNumber] = useState(PRESET_CARDS[0].number);
  const [cardHolder, setCardHolder] = useState(order?.user?.username || "John Doe");
  const [expiry, setExpiry] = useState(PRESET_CARDS[0].expiry);
  const [cvv, setCvv] = useState(PRESET_CARDS[0].cvv);

  const [processingStage, setProcessingStage] = useState(null); // null | 'securing' | 'contacting' | 'approving' | 'done'
  const [isProcessing, setIsProcessing] = useState(false);

  const selectPresetCard = (index) => {
    setSelectedPreset(index);
    setCardNumber(PRESET_CARDS[index].number);
    setExpiry(PRESET_CARDS[index].expiry);
    setCvv(PRESET_CARDS[index].cvv);
  };

  const handleSimulatePayment = async (paymentType = "Credit Card") => {
    if (isProcessing || isLoading) return;
    setIsProcessing(true);

    try {
      setProcessingStage("🔐 Securing 256-bit encrypted channel...");
      await new Promise((res) => setTimeout(res, 600));

      setProcessingStage("🏦 Contacting simulated merchant gateway...");
      await new Promise((res) => setTimeout(res, 700));

      setProcessingStage("✨ Authorizing payment of ₹" + Number(order?.totalPrice || 0).toLocaleString("en-IN") + "...");
      await new Promise((res) => setTimeout(res, 600));

      setProcessingStage("🎉 Payment Confirmed!");
      await new Promise((res) => setTimeout(res, 400));

      const mockPaymentDetails = {
        id: `SIM-TXN-${Date.now().toString(36).toUpperCase()}`,
        status: "COMPLETED",
        update_time: new Date().toISOString(),
        email_address: order?.user?.email || "customer@store.com",
        payment_method: paymentType,
      };

      await onPaySuccess(mockPaymentDetails);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
      setProcessingStage(null);
    }
  };

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6 shadow-2xl text-white relative overflow-hidden">
      {/* Decorative ambient lighting */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-lg font-bold tracking-tight text-white">Instant Payment Portal</h3>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">Secure Sandbox Payment Simulator</p>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full font-mono">
          <FaShieldAlt className="text-xs" />
          <span>Demo Mode</span>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-950/80 rounded-xl mb-6 border border-zinc-800/80 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("card")}
          className={`flex items-center justify-center py-2.5 px-3 rounded-lg transition-all ${
            activeTab === "card"
              ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/25"
              : "text-zinc-400 hover:text-white hover:bg-zinc-900"
          }`}
        >
          <FaCreditCard className="mr-1.5 text-sm" />
          Virtual Card
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("qr")}
          className={`flex items-center justify-center py-2.5 px-3 rounded-lg transition-all ${
            activeTab === "qr"
              ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/25"
              : "text-zinc-400 hover:text-white hover:bg-zinc-900"
          }`}
        >
          <FaQrcode className="mr-1.5 text-sm" />
          Scan & Pay
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("instant")}
          className={`flex items-center justify-center py-2.5 px-3 rounded-lg transition-all ${
            activeTab === "instant"
              ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/25"
              : "text-zinc-400 hover:text-white hover:bg-zinc-900"
          }`}
        >
          <FaBolt className="mr-1.5 text-sm" />
          1-Click Pay
        </button>
      </div>

      {/* TAB 1: VIRTUAL CARD */}
      {activeTab === "card" && (
        <div className="space-y-5">
          {/* Preset quick selection pills */}
          <div>
            <span className="text-xs text-zinc-400 mb-2 block font-medium">Quick Test Card Presets:</span>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_CARDS.map((card, i) => (
                <button
                  key={card.brand}
                  type="button"
                  onClick={() => selectPresetCard(i)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    selectedPreset === i
                      ? "border-pink-500 bg-pink-500/10 text-pink-400 font-bold"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {card.brand}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Metallic/Glass Card */}
          <div
            className={`p-5 rounded-2xl bg-gradient-to-tr ${PRESET_CARDS[selectedPreset].color} shadow-2xl relative overflow-hidden transition-all duration-500 border border-white/20`}
          >
            {/* Hologram shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="flex justify-between items-start mb-6">
              {/* EMV Chip */}
              <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-yellow-300 via-amber-400 to-yellow-600 p-1 flex flex-col justify-between shadow-inner">
                <div className="border-b border-amber-800/40 h-2" />
                <div className="border-b border-amber-800/40 h-2" />
              </div>
              <FaWifi className="text-white/70 rotate-90 text-lg" />
            </div>

            {/* Card Number */}
            <div className="font-mono text-lg md:text-xl font-bold tracking-widest text-white drop-shadow mb-4">
              {cardNumber}
            </div>

            {/* Card Holder & Expiry */}
            <div className="flex justify-between items-end text-xs tracking-wider uppercase text-white/90">
              <div>
                <div className="text-[10px] text-white/60 lowercase">Cardholder</div>
                <div className="font-semibold">{cardHolder}</div>
              </div>
              <div>
                <div className="text-[10px] text-white/60 lowercase text-right">Expires</div>
                <div className="font-mono font-semibold">{expiry}</div>
              </div>
            </div>
          </div>

          {/* Editable Form Inputs */}
          <div className="space-y-3 pt-1">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">Cardholder Name</label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="Full Name"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="MM/YY"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">CVV / CVC</label>
                <input
                  type="password"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="•••"
                />
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <button
            type="button"
            disabled={isProcessing || isLoading}
            onClick={() => handleSimulatePayment(`${PRESET_CARDS[selectedPreset].brand} Card`)}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-950 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <FaLock className="text-xs" />
            <span>Pay ₹{Number(order?.totalPrice || 0).toLocaleString("en-IN")} with Card</span>
          </button>
        </div>
      )}

      {/* TAB 2: QR CODE / UPI */}
      {activeTab === "qr" && (
        <div className="text-center py-2 space-y-4">
          <p className="text-xs text-zinc-400">Scan with any demo UPI / Banking / Wallet app to complete order:</p>

          <div className="relative inline-block p-4 bg-white rounded-2xl shadow-xl">
            {/* Simulated Animated QR Matrix */}
            <div className="w-48 h-48 bg-white flex flex-col justify-between relative overflow-hidden">
              {/* Corner target boxes */}
              <div className="flex justify-between">
                <div className="w-12 h-12 border-4 border-black rounded-lg p-1">
                  <div className="w-full h-full bg-black rounded" />
                </div>
                <div className="w-12 h-12 border-4 border-black rounded-lg p-1">
                  <div className="w-full h-full bg-black rounded" />
                </div>
              </div>

              {/* Decorative QR Pattern */}
              <div className="my-auto grid grid-cols-6 gap-1 px-3">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 rounded-sm ${
                      (i * 7 + 3) % 2 === 0 ? "bg-black" : "bg-zinc-200"
                    }`}
                  />
                ))}
              </div>

              <div className="flex justify-between items-end">
                <div className="w-12 h-12 border-4 border-black rounded-lg p-1">
                  <div className="w-full h-full bg-black rounded" />
                </div>
                <div className="text-pink-600 font-extrabold text-[10px] uppercase font-mono tracking-tighter">
                  VERIFIED
                </div>
              </div>

              {/* Laser Scan Animation Line */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-[0_0_8px_#ec4899] animate-bounce" />
            </div>
          </div>

          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs flex justify-between items-center font-mono">
            <span className="text-zinc-400">UPI ID:</span>
            <span className="text-emerald-400 font-bold">homedine@upi</span>
          </div>

          <button
            type="button"
            disabled={isProcessing || isLoading}
            onClick={() => handleSimulatePayment("UPI / QR Code")}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-950 transition-all transform active:scale-[0.99] disabled:opacity-50"
          >
            Simulate QR Code Scan (₹{Number(order?.totalPrice || 0).toLocaleString("en-IN")})
          </button>
        </div>
      )}

      {/* TAB 3: 1-CLICK INSTANT PAY */}
      {activeTab === "instant" && (
        <div className="py-4 space-y-4 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white text-2xl shadow-xl shadow-emerald-950">
            <FaBolt />
          </div>

          <div>
            <h4 className="text-base font-bold text-white">Express 1-Click Checkout</h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
              Simulate an approved test payment instantly with zero forms or verification delays.
            </p>
          </div>

          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800 text-left text-xs space-y-2">
            <div className="flex justify-between text-zinc-400">
              <span>Order Amount:</span>
              <span className="text-emerald-300 font-bold font-mono">₹{Number(order?.totalPrice || 0).toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Customer:</span>
              <span className="text-white">{order?.user?.username}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Destination:</span>
              <span className="text-white">{order?.shippingAddress?.city}, {order?.shippingAddress?.country}</span>
            </div>
          </div>

          <button
            type="button"
            disabled={isProcessing || isLoading}
            onClick={() => handleSimulatePayment("1-Click Instant Pay")}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-950 transition-all transform active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <FaBolt className="text-yellow-300" />
            <span>Instant Pay (₹{Number(order?.totalPrice || 0).toLocaleString("en-IN")})</span>
          </button>
        </div>
      )}

      {/* Processing State Modal Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-50 p-6 text-center animate-fade-in">
          <div className="w-16 h-16 relative mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-pink-500/20 border-t-pink-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-pink-400 text-lg">
              <FaLock />
            </div>
          </div>
          <div className="font-semibold text-sm text-white mb-2">{processingStage}</div>
          <p className="text-xs text-zinc-500">Please do not close or refresh this tab...</p>
        </div>
      )}

      {/* Footer Security Badge */}
      <div className="mt-5 pt-3 border-t border-zinc-800/60 flex items-center justify-center text-[11px] text-zinc-500 space-x-2">
        <FaLock className="text-[10px]" />
        <span>End-to-End SSL Encrypted Simulated Transaction</span>
      </div>
    </div>
  );
};

export default DummyPayment;
