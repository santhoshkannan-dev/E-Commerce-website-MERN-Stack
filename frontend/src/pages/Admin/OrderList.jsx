import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { FaCheckCircle, FaClock, FaArrowRight, FaBoxOpen } from "react-icons/fa";

const OrderList = ({ isEmbedded = false }) => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  const content = (
    <>
      {isLoading ? (
        <div className="py-12 flex justify-center">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error || "Failed to load orders"}
        </Message>
      ) : !orders || orders.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-emerald-900/30 text-stone-400">
          <FaBoxOpen className="text-3xl text-emerald-400 mx-auto mb-3" />
          <p className="text-sm font-medium">No customer orders recorded yet.</p>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border border-emerald-900/30 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-emerald-900/40 bg-forest-900/50 text-xs font-semibold uppercase tracking-wider text-stone-400">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-4">Order ID</th>
                  <th className="py-4 px-4">Customer</th>
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
                          alt={order._id}
                          className="w-12 h-12 object-cover rounded-xl border border-emerald-900/40 bg-stone-900"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-forest-900 border border-emerald-900/40 flex items-center justify-center text-stone-500">
                          <FaBoxOpen />
                        </div>
                      )}
                      <span className="font-medium text-stone-200 line-clamp-1 max-w-[150px]">
                        {order.orderItems?.[0]?.name || "Item"}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-stone-400 text-xs">
                      #{order._id.substring(order._id.length - 8)}
                    </td>

                    <td className="py-4 px-4 text-stone-200 font-medium">
                      {order.user ? order.user.username : "Guest"}
                    </td>

                    <td className="py-4 px-4 text-stone-400">
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
                        <span>Inspect</span>
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
    </>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200">
      <AdminMenu />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <span>Fulfillment Management</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold">
            All Customer Orders
          </h1>
        </div>
        {content}
      </div>
    </div>
  );
};

export default OrderList;
