import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import DummyPayment from "../../components/DummyPayment";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import { FaCheckCircle, FaReceipt, FaTruck, FaClock, FaShieldAlt } from "react-icons/fa";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handlePaySuccess = async (paymentDetails) => {
    try {
      await payOrder({ orderId, details: paymentDetails }).unwrap();
      refetch();
      toast.success("Payment simulated successfully! Order confirmed.");
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Payment simulation failed");
    }
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order marked as delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Failed to update delivery status");
    }
  };

  return isLoading ? (
    <div className="min-h-screen bg-forest-950 flex items-center justify-center">
      <Loader />
    </div>
  ) : error ? (
    <div className="min-h-screen bg-forest-950 p-8 flex items-center justify-center">
      <Messsage variant="danger">{error?.data?.message || "Order not found"}</Messsage>
    </div>
  ) : (
    <div className="min-h-screen bg-forest-950 text-stone-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-8 border-b border-emerald-900/30 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              <span>Order Confirmed</span>
              <span>•</span>
              <span className="font-mono text-stone-400">ID: #{order._id}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-stone-100 font-bold">
              Invoice & Fulfillment
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {order.isPaid ? (
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-800/60">
                <FaCheckCircle className="text-xs" />
                <span>Paid & Verified</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-300 border border-amber-800/60">
                <FaClock className="text-xs" />
                <span>Payment Pending</span>
              </span>
            )}

            {order.isDelivered ? (
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-950/70 text-teal-400 border border-teal-800/60">
                <FaTruck className="text-xs" />
                <span>Delivered</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-forest-900/80 text-stone-400 border border-emerald-900/40">
                <span>In Transit / Prep</span>
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column: Items (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-panel rounded-3xl border border-emerald-900/30 overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-emerald-900/30 bg-forest-900/40">
                <h2 className="text-sm font-semibold tracking-wider uppercase text-stone-300">
                  Purchased Items ({order.orderItems.length})
                </h2>
              </div>

              <div className="divide-y divide-emerald-900/20">
                {order.orderItems.map((item, index) => (
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

            {/* Delivery Details */}
            <div className="glass-panel p-6 rounded-3xl border border-emerald-900/30 space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-stone-300 border-b border-emerald-900/30 pb-3">
                Recipient & Delivery Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-300">
                <div>
                  <span className="text-stone-500 uppercase tracking-wider block mb-1">Customer</span>
                  <p className="font-semibold text-stone-100 text-sm">{order.user?.username}</p>
                  <p className="text-stone-400">{order.user?.email}</p>
                </div>

                <div>
                  <span className="text-stone-500 uppercase tracking-wider block mb-1">Shipping Destination</span>
                  <p className="text-stone-200 text-sm">
                    {order.shippingAddress.address}
                  </p>
                  <p className="text-stone-400">
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Payment Simulator & Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Summary Box */}
            <div className="glass-panel p-6 rounded-3xl border border-emerald-900/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-900/30 pb-4">
                <h2 className="font-serif text-lg font-bold text-stone-100">
                  Payment Breakdown
                </h2>
                <FaReceipt className="text-emerald-400 text-sm" />
              </div>

              <div className="space-y-2.5 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>Items Total</span>
                  <span className="font-mono text-stone-200">₹{Number(order.itemsPrice).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-stone-200">
                    {Number(order.shippingPrice) === 0 ? "Free" : `₹${Number(order.shippingPrice).toLocaleString("en-IN")}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-mono text-stone-200">₹{Number(order.taxPrice).toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-3 border-t border-emerald-900/30 flex justify-between items-baseline">
                  <span className="font-serif text-sm font-bold text-stone-100">Total Charged</span>
                  <span className="font-mono text-xl font-bold text-emerald-400">
                    ₹{Number(order.totalPrice).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-between">
                <span>Method:</span>
                <span className="text-stone-200 font-semibold">{order.paymentMethod}</span>
              </div>
            </div>

            {/* Payment Section */}
            {!order.isPaid ? (
              <div>
                <DummyPayment
                  order={order}
                  onPaySuccess={handlePaySuccess}
                  isLoading={loadingPay}
                />
              </div>
            ) : (
              <div className="glass-panel p-6 rounded-3xl border border-emerald-600/40 text-center space-y-3 bg-emerald-950/20">
                <FaCheckCircle className="text-3xl text-emerald-400 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-stone-100">Order Confirmed</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Thank you for supporting ethical, sustainable kitchenware. Your package is prepared with recycled material.
                </p>
                {order.paymentResult?.id && (
                  <div className="text-[11px] font-mono text-stone-400 pt-2 border-t border-emerald-900/30">
                    Txn ID: {order.paymentResult.id}
                  </div>
                )}
              </div>
            )}

            {/* Admin Deliver Button */}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <div className="glass-panel p-5 rounded-3xl border border-emerald-900/40 space-y-3">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Admin Control</span>
                <button
                  type="button"
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-900/50"
                  onClick={deliverHandler}
                  disabled={loadingDeliver}
                >
                  {loadingDeliver ? "Updating..." : "Mark As Delivered"}
                </button>
              </div>
            )}

            <div className="flex items-center justify-center space-x-2 text-[11px] text-stone-400">
              <FaShieldAlt className="text-emerald-400" />
              <span>Certified Sustainable & Carbon-Neutral</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
