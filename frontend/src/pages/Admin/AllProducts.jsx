import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import { FaBoxes, FaPlus, FaEdit, FaCalendarAlt } from "react-icons/fa";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200">
      <AdminMenu />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-emerald-900/30 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              <FaBoxes className="text-emerald-400" />
              <span>Catalog Management</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold">
              Inventory & Products ({products?.length || 0})
            </h1>
          </div>

          <Link
            to="/admin/productlist"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-900/40"
          >
            <FaPlus className="text-xs" />
            <span>Create New Product</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : isError ? (
          <div className="glass-panel p-8 text-center text-red-400 rounded-3xl border border-red-900/40">
            Failed to load products. Please ensure the backend is running.
          </div>
        ) : !products || products.length === 0 ? (
          <div className="glass-panel p-16 text-center rounded-3xl border border-emerald-900/30 text-stone-400">
            <FaBoxes className="text-4xl text-emerald-400 mx-auto mb-3" />
            <h3 className="font-serif text-xl text-stone-100 mb-2">No Products in Catalog</h3>
            <p className="text-xs text-stone-400 mb-6">Create your first sustainable kitchenware item.</p>
            <Link
              to="/admin/productlist"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider"
            >
              <FaPlus />
              <span>Add Product</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="glass-panel p-5 rounded-3xl border border-emerald-900/30 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 hover:border-emerald-600/50 transition-all shadow-xl group"
              >
                <div className="w-full sm:w-36 h-36 rounded-2xl overflow-hidden bg-forest-900 border border-emerald-900/40 flex-shrink-0 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-forest-950/80 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-emerald-800/40">
                    {product.brand || "Eco"}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-stone-100 line-clamp-1 group-hover:text-emerald-300 transition-colors">
                        {product.name}
                      </h3>
                      <span className="font-mono text-base font-bold text-emerald-400 whitespace-nowrap">
                        ₹{Math.round(product.price || 0).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-emerald-900/30 mt-3">
                    <div className="flex items-center space-x-1.5 text-[11px] text-stone-500">
                      <FaCalendarAlt className="text-xs" />
                      <span>{moment(product.createdAt).format("MMM DD, YYYY")}</span>
                    </div>

                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-900/50 hover:bg-emerald-800/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold transition-all"
                    >
                      <FaEdit className="text-xs" />
                      <span>Edit & Manage</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
