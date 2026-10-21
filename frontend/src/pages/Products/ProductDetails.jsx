import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaArrowLeft,
  FaShieldAlt,
  FaLeaf,
  FaCheck,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review submitted successfully");
      setComment("");
      setRating(0);
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Error submitting review");
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to shopping bag!");
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          to="/shop"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>Back to All Products</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="py-24 flex justify-center">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error || "Product not found"}
        </Message>
      ) : (
        <>
          {/* Main Product Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Product Media Gallery */}
            <div className="relative rounded-3xl overflow-hidden bg-zinc-900/60 border border-white/10 p-4 aspect-square shadow-2xl">
              <img
                src={product.image || "/images/cookware_showcase.jpg"}
                alt={product.name}
                className="w-full h-full object-cover object-center rounded-2xl"
              />
              <div className="absolute top-8 right-8 z-20">
                <HeartIcon product={product} />
              </div>
              <div className="absolute top-8 left-8 z-20">
                <span className="text-xs font-semibold text-emerald-300 bg-black/60 border border-white/10 px-3.5 py-1 rounded-full backdrop-blur-md">
                  {product.brand || "Eco Collection"}
                </span>
              </div>
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block mb-2">
                  Sustainable Cookware
                </span>
                <h1 className="font-editorial text-3xl sm:text-4xl text-white font-medium leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating & reviews */}
              <div className="flex items-center space-x-4 border-y border-white/5 py-3">
                <Ratings
                  value={product.rating || 5}
                  text={`${product.numReviews || 0} reviews`}
                />
                <span className="text-zinc-600">|</span>
                <span className="text-xs text-zinc-400 flex items-center space-x-1">
                  <FaLeaf className="text-emerald-400 text-xs" />
                  <span>100% Non-Toxic</span>
                </span>
              </div>

              {/* Price & Stock Status */}
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-bold font-mono text-white">
                  ${product.price}
                </span>
                <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full font-medium">
                  {product.countInStock > 0 ? "In Stock • Ships Free" : "Out of Stock"}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-zinc-300">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center space-x-2">
                  <FaCheck className="text-emerald-400 text-xs shrink-0" />
                  <span>PTFE, Lead & Cadmium Free</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center space-x-2">
                  <FaCheck className="text-emerald-400 text-xs shrink-0" />
                  <span>Dishwasher & Oven Safe</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center space-x-2">
                  <FaCheck className="text-emerald-400 text-xs shrink-0" />
                  <span>Sustainably Sourced</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center space-x-2">
                  <FaCheck className="text-emerald-400 text-xs shrink-0" />
                  <span>Plastic-Free Packaging</span>
                </div>
              </div>

              {/* Add to Cart Actions */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                {product.countInStock > 0 && (
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-zinc-400 font-medium">Quantity:</span>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="bg-zinc-900 border border-zinc-700 text-white text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500"
                    >
                      {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-950 hover:shadow-emerald-900/40 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart className="text-sm" />
                  <span>Add to Shopping Bag</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-between text-xs text-zinc-500 pt-2">
                <span>Free 30-Day Returns</span>
                <span>•</span>
                <span>Lifetime Warranty</span>
                <span>•</span>
                <span>Carbon-Neutral Delivery</span>
              </div>
            </div>
          </div>

          {/* Product Reviews Tabs */}
          <div className="pt-10 border-t border-white/10">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
