import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { FaBoxOpen, FaCheckCircle, FaClock, FaArrowRight } from "react-icons/fa";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-emerald-900/30 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              <FaBoxOpen className="text-emerald-400" />
              <span>Purchase History</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold">
              My Orders
            </h1>
          </div>

          <Link
            to="/shop"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider flex items-center space-x-1"
          >
            <span>Continue Shopping</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">{error?.data?.error || error.error || "Unable to fetch orders"}</Message>
        ) : !orders || orders.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl border border-emerald-900/30 text-center max-w-lg mx-auto shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-900/30 border border-emerald-700/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <FaBoxOpen className="text-2xl" />
            </div>
            <h2 className="font-serif text-2xl text-stone-100 font-bold mb-2">No Orders Yet</h2>
            <p className="text-xs text-stone-400 mb-6 leading-relaxed">
              When you order non-toxic cookware and eco-friendly home goods, your invoices will appear here.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-emerald-900/40"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="glass-panel rounded-3xl border border-emerald-900/30 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-emerald-900/40 bg-forest-900/50 text-xs font-semibold uppercase tracking-wider text-stone-400">
                  <tr>
                    <th className="py-4 px-6">Item</th>
                    <th className="py-4 px-4">Order ID</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-4">Total</th>
                    <th className="py-4 px-4 text-center">Payment</th>
                    <th className="py-4 px-4 text-center">Delivery</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-900/20 text-xs sm:text-sm">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-forest-900/30 transition-colors">
                      <td className="py-4 px-6 flex items-center space-x-3">
                        {order.orderItems?.[0]?.image ? (
                          <img
                            src={order.orderItems[0].image}
                            alt={order.orderItems[0].name}
                            className="w-12 h-12 object-cover rounded-xl border border-emerald-900/50"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-forest-900 border border-emerald-900/40 flex items-center justify-center text-stone-500">
                            <FaBoxOpen />
                          </div>
                        )}
                        <span className="font-medium text-stone-200 line-clamp-1 max-w-[180px]">
                          {order.orderItems?.[0]?.name}
                          {order.orderItems.length > 1 && (
                            <span className="text-xs text-stone-500 block">+{order.orderItems.length - 1} more items</span>
                          )}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-mono text-stone-400 text-xs">
                        #{order._id.substring(order._id.length - 8)}
                      </td>

                      <td className="py-4 px-4 text-stone-300">
                        {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-stone-100">
                        ${Number(order.totalPrice).toFixed(2)}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {order.isPaid ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                            <FaCheckCircle className="text-[10px]" />
                            <span>Paid</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/60">
                            <FaClock className="text-[10px]" />
                            <span>Pending</span>
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {order.isDelivered ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-950/80 text-teal-300 border border-teal-800/60">
                            <FaCheckCircle className="text-[10px]" />
                            <span>Delivered</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-forest-900 text-stone-400 border border-emerald-900/40">
                            <span>Processing</span>
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <Link
                          to={`/order/${order._id}`}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-700/50 text-emerald-300 text-xs font-semibold uppercase tracking-wider transition-all"
                        >
                          <span>Details</span>
                          <FaArrowRight className="text-[10px]" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
