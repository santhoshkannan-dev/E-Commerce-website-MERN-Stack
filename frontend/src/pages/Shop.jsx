import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { FaFilter, FaUndo, FaTag } from "react-icons/fa";

const SAMPLE_SHOP_PRODUCTS = [
  {
    _id: "demo-1",
    name: "Reusable drinkware for a greener lifestyle.",
    price: 1299,
    brand: "Promotion",
    rating: 4.8,
    image: "/images/cookware_showcase.jpg",
    description: "Vacuum insulated, non-toxic stainless steel & ceramic lining.",
  },
  {
    _id: "demo-2",
    name: "Non-toxic cookware for sustainable cooking.",
    price: 2499,
    brand: "New",
    rating: 5.0,
    image: "/images/kitchen_hero.jpg",
    description: "Naturally non-stick mineral ceramic coating free of PTFE and PFOA.",
  },
  {
    _id: "demo-3",
    name: "Kettle & Toaster eco-friendly meals.",
    price: 4299,
    brand: "Customer favorite",
    rating: 4.9,
    image: "/images/auth_lifestyle.jpg",
    description: "Energy efficient rapid boil with brushed sage ceramic finish.",
  },
  {
    _id: "demo-4",
    name: "Bamboo Made Utensil Holder with Spoons",
    price: 799,
    brand: "New",
    rating: 4.7,
    image: "/images/cookware_showcase.jpg",
    description: "Organically grown FSC-certified bamboo spoons and countertop crock.",
  },
];

const Shop = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const filterParam = searchParams.get("filter");
  const searchParam = searchParams.get("search");

  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading) {
      const source = Array.isArray(filteredProductsQuery.data) && filteredProductsQuery.data.length > 0
        ? filteredProductsQuery.data
        : SAMPLE_SHOP_PRODUCTS;

      let filtered = [...source];

      // Handle URL filter query (?filter=bestseller)
      if (filterParam === "bestseller") {
        filtered = filtered.filter((p) => (p.rating || 4.5) >= 4.5);
      }

      // Handle URL search query (?search=...)
      if (searchParam) {
        const query = searchParam.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description?.toLowerCase().includes(query) ||
            p.brand?.toLowerCase().includes(query)
        );
      }

      if (priceFilter) {
        filtered = filtered.filter(
          (product) =>
            product.price.toString().includes(priceFilter) ||
            product.price <= parseFloat(priceFilter)
        );
      }

      if (selectedBrand) {
        filtered = filtered.filter((p) => p.brand === selectedBrand);
      }

      dispatch(setProducts(filtered));
    }
  }, [checked, radio, filteredProductsQuery.data, filteredProductsQuery.isLoading, dispatch, priceFilter, selectedBrand, filterParam, searchParam]);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand === selectedBrand ? "" : brand);
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const resetFilters = () => {
    setPriceFilter("");
    setSelectedBrand("");
    dispatch(setChecked([]));
  };

  const allAvailableProducts = Array.isArray(filteredProductsQuery.data) && filteredProductsQuery.data.length > 0
    ? filteredProductsQuery.data
    : SAMPLE_SHOP_PRODUCTS;

  const uniqueBrands = [
    ...Array.from(
      new Set(
        allAvailableProducts
          .map((p) => p.brand)
          .filter((b) => Boolean(b))
      )
    ),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="mb-10 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
            Conscious Collections
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-white font-medium">
            Explore <em className="italic text-emerald-300 font-normal">All Essentials</em>
          </h1>
        </div>
        <p className="text-xs text-zinc-400">
          Showing <span className="font-bold text-white">{products?.length || 0}</span> eco-friendly curated products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <FaFilter className="text-emerald-400 text-xs" />
                <span>Filters</span>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
              >
                <FaUndo className="text-[10px]" />
                <span>Reset</span>
              </button>
            </div>

            {/* Filter by Categories */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-300 mb-3 flex items-center space-x-2">
                <FaTag className="text-xs text-emerald-400" />
                <span>Categories</span>
              </h3>
              <div className="space-y-2">
                {categories && categories.length > 0 ? (
                  categories.map((c) => (
                    <label
                      key={c._id}
                      className="flex items-center space-x-3 text-xs text-zinc-300 hover:text-white cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={checked.includes(c._id)}
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-zinc-900"
                      />
                      <span>{c.name}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500">No categories added yet</p>
                )}
              </div>
            </div>

            {/* Filter by Brands */}
            {uniqueBrands.length > 0 && (
              <div className="pt-4 border-t border-white/5">
                <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-300 mb-3">
                  Collections & Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueBrands.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => handleBrandClick(brand)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        selectedBrand === brand
                          ? "bg-emerald-600 border-emerald-500 text-white font-semibold"
                          : "bg-zinc-800/60 border-zinc-700/80 text-zinc-300 hover:border-zinc-500 hover:text-white"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter by Max Price */}
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-300 mb-3">
                Max Price (₹)
              </h3>
              <input
                type="number"
                placeholder="e.g. 5000"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </aside>

        {/* Right Product Grid */}
        <div className="lg:col-span-3">
          {filteredProductsQuery.isLoading ? (
            <div className="py-20 flex justify-center">
              <Loader />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} p={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 p-8 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-3">
              <p className="text-sm font-semibold text-white">No products found</p>
              <p className="text-xs text-zinc-400">
                Try adjusting your search criteria or resetting the active filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-block mt-3 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-full transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
