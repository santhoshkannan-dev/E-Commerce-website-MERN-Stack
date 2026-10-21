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
import { FaCheckCircle, FaReceipt } from "react-icons/fa";

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
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error?.data?.message || "Order not found"}</Messsage>
  ) : (
    <div className="container flex flex-col ml-[10rem] md:flex-row pb-12">
      <div className="md:w-2/3 pr-6">
        <div className="border border-zinc-800 rounded-2xl p-5 mt-5 pb-4 mb-5 bg-zinc-900/40">
          <h2 className="text-xl font-bold mb-4 text-white">Order Items ({order.orderItems.length})</h2>

          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-zinc-800 text-xs uppercase text-zinc-400">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800/60">
                  {order.orderItems.map((item, index) => (
                    <tr key={index} className="hover:bg-zinc-800/20 transition-colors">
                      <td className="p-3 flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg border border-zinc-700/50"
                        />
                        <Link
                          to={`/product/${item.product}`}
                          className="font-medium text-white hover:text-pink-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </td>

                      <td className="p-3 text-center text-zinc-300 font-mono">{item.qty}</td>
                      <td className="p-3 text-right text-zinc-300 font-mono">$ {item.price}</td>
                      <td className="p-3 text-right font-bold text-white font-mono">
                        $ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3 space-y-6">
        {/* Shipping & Payment Method Box */}
        <div className="mt-5 border border-zinc-800 rounded-2xl p-5 bg-zinc-900/40">
          <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3 mb-4">
            Shipping Information
          </h2>

          <div className="text-sm space-y-2.5">
            <p>
              <span className="text-zinc-400">Order ID: </span>
              <span className="font-mono text-zinc-200">{order._id}</span>
            </p>
            <p>
              <span className="text-zinc-400">Recipient: </span>
              <span className="font-semibold text-white">{order.user?.username}</span>
            </p>
            <p>
              <span className="text-zinc-400">Email: </span>
              <span className="text-zinc-300">{order.user?.email}</span>
            </p>
            <p>
              <span className="text-zinc-400">Address: </span>
              <span className="text-zinc-300">
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </span>
            </p>
            <p>
              <span className="text-zinc-400">Payment Method: </span>
              <span className="text-pink-400 font-semibold">{order.paymentMethod}</span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800">
            {order.isPaid ? (
              <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/60 flex items-start space-x-3">
                <FaCheckCircle className="text-emerald-400 text-lg mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-300 text-sm">Payment Confirmed</div>
                  <div className="text-xs text-emerald-400/80 font-mono mt-0.5">
                    {order.paidAt ? new Date(order.paidAt).toLocaleString() : "Paid"}
                  </div>
                  {order.paymentResult?.id && (
                    <div className="text-[11px] text-zinc-400 font-mono mt-1">
                      Txn: {order.paymentResult.id}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 text-sm font-semibold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block"></span>
                <span>Awaiting Payment</span>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/40">
          <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3 mb-4 flex items-center justify-between">
            <span>Order Summary</span>
            <FaReceipt className="text-pink-500 text-sm" />
          </h2>

          <div className="space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-mono">$ {order.itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-mono">$ {order.shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-mono">$ {order.taxPrice}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-zinc-800 text-base font-bold text-white">
              <span>Grand Total</span>
              <span className="text-pink-400 font-mono text-lg">$ {order.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Payment Simulator Section */}
        {!order.isPaid ? (
          <div>
            {loadingPay && <Loader />}
            <DummyPayment
              order={order}
              onPaySuccess={handlePaySuccess}
              isLoading={loadingPay}
            />
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-zinc-900 border border-emerald-700/50 text-center space-y-2">
            <FaCheckCircle className="text-3xl text-emerald-400 mx-auto" />
            <h3 className="font-bold text-white">Order Successfully Paid</h3>
            <p className="text-xs text-zinc-400">
              Your simulated payment was processed and verified. Thank you for shopping with us!
            </p>
          </div>
        )}

        {/* Admin Deliver Button */}
        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold w-full py-3 rounded-xl transition-all shadow-lg shadow-pink-500/25"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
