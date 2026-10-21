import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { FaStar, FaPen, FaComments, FaBoxes } from "react-icons/fa";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const tabs = [
    { id: 1, label: "Write Review", icon: FaPen },
    { id: 2, label: `Reviews (${product.reviews?.length || 0})`, icon: FaComments },
    { id: 3, label: "Related Essentials", icon: FaBoxes },
  ];

  return (
    <div className="w-full">
      {/* Tabs Pill Bar */}
      <div className="flex items-center space-x-3 border-b border-emerald-900/40 pb-4 mb-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/50"
                  : "text-stone-400 hover:text-stone-200 hover:bg-forest-900/60"
              }`}
            >
              <Icon className="text-xs" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Write Review */}
      {activeTab === 1 && (
        <div className="max-w-2xl">
          {userInfo ? (
            <form onSubmit={submitHandler} className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-900/30 space-y-5">
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Share Your Product Experience
              </h3>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Rating Score
                </label>
                <select
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full bg-forest-900/80 border border-emerald-900/40 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-emerald-500 text-sm"
                >
                  <option value="">Select rating score</option>
                  <option value="5">⭐⭐⭐⭐⭐ 5 Stars - Exceptional & Heirloom Quality</option>
                  <option value="4">⭐⭐⭐⭐ 4 Stars - Great Sustainable Choice</option>
                  <option value="3">⭐⭐⭐ 3 Stars - Average Quality</option>
                  <option value="2">⭐⭐ 2 Stars - Needs Improvement</option>
                  <option value="1">⭐ 1 Star - Unsatisfactory</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Detailed Review
                </label>
                <textarea
                  rows="4"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details about durability, heat distribution, feel, aesthetic, or daily use..."
                  className="w-full bg-forest-900/80 border border-emerald-900/40 rounded-xl p-4 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loadingProductReview}
                className="py-3 px-8 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-emerald-900/50"
              >
                {loadingProductReview ? "Submitting..." : "Post Verified Review"}
              </button>
            </form>
          ) : (
            <div className="glass-panel p-8 rounded-3xl border border-emerald-900/30 text-center">
              <p className="text-sm text-stone-300 mb-4">
                Please sign in to write an ethical customer review.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: All Reviews */}
      {activeTab === 2 && (
        <div className="space-y-4 max-w-3xl">
          {product.reviews.length === 0 ? (
            <div className="glass-panel p-8 rounded-3xl border border-emerald-900/30 text-stone-400 text-center">
              <FaStar className="text-3xl text-emerald-500 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No reviews yet for this piece. Be the first to review!</p>
            </div>
          ) : (
            product.reviews.map((rev) => (
              <div
                key={rev._id}
                className="glass-panel p-6 rounded-3xl border border-emerald-900/30 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-300 font-bold flex items-center justify-center text-xs border border-emerald-700/40">
                      {rev.name ? rev.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-100">{rev.name}</h4>
                      <div className="text-[11px] text-stone-500">{rev.createdAt?.substring(0, 10)}</div>
                    </div>
                  </div>
                  <Ratings value={rev.rating} />
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-2">
                  {rev.comment}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Related Products */}
      {activeTab === 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!data || data.length === 0 ? (
            <div className="col-span-full py-8 text-center text-stone-400 text-xs">
              No related products currently available.
            </div>
          ) : (
            data.map((p) => (
              <SmallProduct key={p._id} product={p} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
