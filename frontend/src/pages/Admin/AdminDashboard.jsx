import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { FaDollarSign, FaUsers, FaShoppingBag, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false },
        background: "transparent",
      },
      theme: {
        mode: "dark",
      },
      colors: ["#10b981"],
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      grid: {
        borderColor: "rgba(16, 185, 129, 0.1)",
      },
      xaxis: {
        categories: [],
        labels: {
          style: { colors: "#a8a29e" },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: { colors: "#a8a29e" },
          formatter: (val) => `$${val}`,
        },
      },
    },
    series: [{ name: "Daily Revenue", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
            labels: { style: { colors: "#a8a29e" } },
          },
        },
        series: [
          { name: "Daily Revenue", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200">
      <AdminMenu />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <span>Executive Insights</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold">
            Store Performance Overview
          </h1>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-900/30 flex items-center justify-between shadow-xl">
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Total Revenue</p>
              <h2 className="font-serif text-3xl font-bold text-stone-100 mt-2">
                ${isLoading ? "..." : (sales?.totalSales ? sales.totalSales.toFixed(2) : "0.00")}
              </h2>
              <span className="text-[11px] text-emerald-400 mt-1 inline-block">100% simulated orders</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400 text-xl shadow-lg">
              <FaDollarSign />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-emerald-900/30 flex items-center justify-between shadow-xl">
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Registered Customers</p>
              <h2 className="font-serif text-3xl font-bold text-stone-100 mt-2">
                {loading ? "..." : (customers?.length || 0)}
              </h2>
              <span className="text-[11px] text-emerald-400 mt-1 inline-block">Verified accounts</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400 text-xl shadow-lg">
              <FaUsers />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-emerald-900/30 flex items-center justify-between shadow-xl">
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Total Orders</p>
              <h2 className="font-serif text-3xl font-bold text-stone-100 mt-2">
                {loadingTwo ? "..." : (orders?.totalOrders || 0)}
              </h2>
              <span className="text-[11px] text-emerald-400 mt-1 inline-block">Eco-packaged shipments</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400 text-xl shadow-lg">
              <FaShoppingBag />
            </div>
          </div>
        </div>

        {/* Chart Box */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-900/30 shadow-2xl mb-12">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-emerald-900/30">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/40 flex items-center justify-center text-emerald-400">
              <FaChartLine />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-100">Revenue Growth & Trajectory</h2>
              <p className="text-xs text-stone-400">Aggregated sales per day across all store categories</p>
            </div>
          </div>

          <div className="h-80 w-full">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height="100%"
              width="100%"
            />
          </div>
        </div>

        {/* Embedded Orders */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="font-serif text-2xl font-bold text-stone-100">Recent Customer Orders</h2>
            <p className="text-xs text-stone-400">Real-time fulfillment and status monitoring</p>
          </div>
          <OrderList isEmbedded={true} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
