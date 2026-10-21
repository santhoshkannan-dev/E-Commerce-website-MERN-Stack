import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import {
  FaLeaf,
  FaArrowRight,
  FaStar,
  FaShieldAlt,
  FaRecycle,
  FaBoxOpen,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaSeedling,
  FaGlobeAmericas,
} from "react-icons/fa";

// Curated demo products matching the Homedine mockup with INR prices
const CURATED_SAMPLE_PRODUCTS = [
  {
    _id: "demo-1",
    name: "Reusable drinkware for a greener lifestyle.",
    price: 1299,
    brand: "Promotion",
    image: "/images/cookware_showcase.jpg",
    description: "Vacuum insulated, non-toxic stainless steel & ceramic lining.",
  },
  {
    _id: "demo-2",
    name: "Non-toxic cookware for sustainable cooking.",
    price: 2499,
    brand: "New",
    image: "/images/kitchen_hero.jpg",
    description: "Naturally non-stick mineral ceramic coating free of PTFE and PFOA.",
  },
  {
    _id: "demo-3",
    name: "Kettle & Toaster eco-friendly meals.",
    price: 4299,
    brand: "Customer favorite",
    image: "/images/auth_lifestyle.jpg",
    description: "Energy efficient rapid boil with brushed sage ceramic finish.",
  },
  {
    _id: "demo-4",
    name: "Bamboo Made Utensil Holder with Spoons",
    price: 799,
    brand: "New",
    image: "/images/cookware_showcase.jpg",
    description: "Organically grown FSC-certified bamboo spoons and countertop crock.",
  },
];

const CATEGORY_CARDS = [
  {
    id: "cup-eco",
    title: "Explore CupEco",
    subtitle: "Ceramic & Glass Drinkware",
    img: "/images/auth_lifestyle.jpg",
  },
  {
    id: "eco-spoonery",
    title: "Explore EcoSpoonery",
    subtitle: "Handcrafted Wooden Spoons",
    img: "/images/cookware_showcase.jpg",
  },
  {
    id: "nature-sip",
    title: "Explore NatureSip",
    subtitle: "Insulated Thermal Canteens",
    img: "/images/kitchen_hero.jpg",
  },
  {
    id: "fresh-pitcher",
    title: "Explore FreshPitcher",
    subtitle: "Glass Tableware & Jugs",
    img: "/images/auth_lifestyle.jpg",
  },
];

const GALLERY_ITEMS = [
  {
    id: "g1",
    name: "SizzlePro Non-Stick Pan",
    tag: "Cookware",
    img: "/images/cookware_showcase.jpg",
  },
  {
    id: "g2",
    name: "Grain Slice Board Duo",
    tag: "Bamboo & Teak",
    img: "/images/auth_lifestyle.jpg",
  },
  {
    id: "g3",
    name: "Bamboo Utensil Set",
    tag: "Essential Set",
    img: "/images/kitchen_hero.jpg",
  },
  {
    id: "g4",
    name: "Glow Pot Ceramic",
    tag: "Mineral Dutch",
    img: "/images/cookware_showcase.jpg",
  },
  {
    id: "g5",
    name: "StoneSip Ceramic Cup",
    tag: "Artisan Clay",
    img: "/images/auth_lifestyle.jpg",
  },
];

const REVIEWS = [
  {
    quote: "HomeDine's glass jars are awesome for storage, and the bamboo utensils are perfect for daily use!",
    author: "Jane Cooper",
    role: "Nutritionist",
    rating: 5,
  },
  {
    quote: "Fantastic products and fast delivery. My kitchen feels so much cleaner and greener!",
    author: "Darlene Robertson",
    role: "Culinary Instructor",
    rating: 5,
  },
  {
    quote: "Love HomeDine's eco-style! Glass jars keep things fresh, and bamboo utensils are so chic.",
    author: "Jacob Jones",
    role: "Food Blogger",
    rating: 5,
  },
  {
    quote: "The sustainable bamboo utensils are great for daily use and gentle on our ceramic pans.",
    author: "Esther Howard",
    role: "Sous Chef",
    rating: 5,
  },
];

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading } = useGetProductsQuery({ keyword });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const bestsellersRef = useRef(null);
  const categoriesRef = useRef(null);
  const galleryRef = useRef(null);

  const scroll = (ref, offset) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const productsToDisplay =
    data?.products && data.products.length > 0
      ? data.products
      : CURATED_SAMPLE_PRODUCTS;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    }
  };

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-3xl overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center shadow-2xl border border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/kitchen_hero.jpg"
            alt="Eco-friendly Kitchenware"
            className="w-full h-full object-cover object-center filter brightness-[0.82]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1210] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-3.5 py-1 rounded-full backdrop-blur-md">
              <FaLeaf className="text-xs" />
              <span>Conscious Kitchenware</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.15] tracking-tight">
              Eco-Friendly{" "}
              <span className="italic font-normal text-emerald-300">
                Kitchenware
              </span>{" "}
              for a greener home
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed">
              The eco-friendly kitchenware collection crafted with sustainable,
              non-toxic materials. Thoughtfully designed to bring natural elegance
              and mindfulness to everyday cooking.
            </p>

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-3 text-sm font-bold text-black bg-white hover:bg-emerald-300 px-7 py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-emerald-500/20 active:scale-95 group"
              >
                <span>Shop now</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Floating Glassmorphic Badge (96% Carbon offset) */}
          <div className="glass-panel p-5 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl max-w-xs text-white space-y-3">
            <div className="flex items-center justify-between text-xs text-emerald-300">
              <span className="font-medium">Natural. Sustainable.</span>
              <FaLeaf className="text-emerald-400" />
            </div>
            <p className="text-xs text-zinc-300 leading-snug">
              Eco-conscious materials verified safe for family & planet.
            </p>
            <div className="pt-1 flex items-baseline space-x-2 border-t border-white/10">
              <span className="text-3xl font-editorial font-bold text-white">96%</span>
              <span className="text-[11px] text-zinc-400">Carbon offset certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BESTSELLING PRODUCTS SECTION (With working carousel arrows) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-emerald-400 block mb-1">
              Eco Essentials Planet-Friendly
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-medium">
              Bestselling ✧ <em className="italic text-emerald-300 font-normal">Products</em>
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-300 hover:text-emerald-400 transition-colors group"
            >
              <span>More products</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="hidden sm:flex items-center space-x-2">
              <button
                type="button"
                onClick={() => scroll(bestsellersRef, -320)}
                className="w-8 h-8 rounded-full border border-white/10 bg-forest-900/60 flex items-center justify-center text-stone-300 hover:bg-emerald-600 hover:text-white transition-all text-xs active:scale-95"
                title="Previous"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => scroll(bestsellersRef, 320)}
                className="w-8 h-8 rounded-full border border-white/10 bg-forest-900/60 flex items-center justify-center text-stone-300 hover:bg-emerald-600 hover:text-white transition-all text-xs active:scale-95"
                title="Next"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center">
            <Loader />
          </div>
        ) : (
          <div
            ref={bestsellersRef}
            className="flex overflow-x-auto scroll-smooth scrollbar-none gap-6 pb-4 snap-x"
          >
            {productsToDisplay.map((product) => (
              <div
                key={product._id}
                className="min-w-[260px] sm:min-w-[280px] lg:min-w-[290px] max-w-[320px] snap-start flex-shrink-0"
              >
                <ProductCard p={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. WIDE TRUST KITCHEN BANNER + 3 PILL BADGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/8] sm:aspect-[16/7] shadow-2xl border border-white/10">
          <img
            src="/images/kitchen_trust_banner.jpg"
            alt="Modern Sustainable Kitchen"
            className="w-full h-full object-cover object-center filter brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 max-w-xl text-white space-y-2">
            <p className="font-editorial text-lg sm:text-2xl lg:text-3xl font-medium leading-snug drop-shadow-md">
              We craft kitchenware you can trust for years to come — through everyday meals and evolving lifestyles. Each piece is thoughtfully made with sustainable materials.
            </p>
          </div>
        </div>

        {/* 3 Warm Pill Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl p-4 bg-[#ede8dc] text-[#162720] flex items-center justify-center space-x-3 shadow-md hover:scale-[1.02] transition-transform">
            <div className="w-9 h-9 rounded-full bg-emerald-800/10 flex items-center justify-center text-emerald-800">
              <FaLeaf className="text-base" />
            </div>
            <div>
              <span className="font-editorial text-base font-bold block leading-tight">Natural Finish</span>
              <span className="text-[11px] text-stone-600">Organic beeswax & mineral glazes</span>
            </div>
          </div>

          <div className="rounded-2xl p-4 bg-[#ede8dc] text-[#162720] flex items-center justify-center space-x-3 shadow-md hover:scale-[1.02] transition-transform">
            <div className="w-9 h-9 rounded-full bg-emerald-800/10 flex items-center justify-center text-emerald-800">
              <FaGlobeAmericas className="text-base" />
            </div>
            <div>
              <span className="font-editorial text-base font-bold block leading-tight">Eco Innovation</span>
              <span className="text-[11px] text-stone-600">Low-emission zero thermal loss</span>
            </div>
          </div>

          <div className="rounded-2xl p-4 bg-[#ede8dc] text-[#162720] flex items-center justify-center space-x-3 shadow-md hover:scale-[1.02] transition-transform">
            <div className="w-9 h-9 rounded-full bg-emerald-800/10 flex items-center justify-center text-emerald-800">
              <FaSeedling className="text-base" />
            </div>
            <div>
              <span className="font-editorial text-base font-bold block leading-tight">Sustainable Materials</span>
              <span className="text-[11px] text-stone-600">FSC-certified bamboo & ceramic</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PLANET-FIRST CATEGORIES HUB (4 Vertical Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-emerald-400 block mb-1">
              Explore our thoughtful and planet-first
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-medium">
              ✧ <em className="italic text-emerald-300 font-normal">Categories</em>
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => scroll(categoriesRef, -280)}
              className="w-8 h-8 rounded-full border border-white/10 bg-forest-900/60 flex items-center justify-center text-stone-300 hover:bg-emerald-600 hover:text-white transition-all text-xs active:scale-95"
              title="Previous"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => scroll(categoriesRef, 280)}
              className="w-8 h-8 rounded-full border border-white/10 bg-forest-900/60 flex items-center justify-center text-stone-300 hover:bg-emerald-600 hover:text-white transition-all text-xs active:scale-95"
              title="Next"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={categoriesRef}
          className="flex overflow-x-auto md:grid md:grid-cols-4 scroll-smooth scrollbar-none gap-4 sm:gap-6 pb-2 snap-x"
        >
          {CATEGORY_CARDS.map((cat) => (
            <Link
              key={cat.id}
              to="/shop"
              className="min-w-[240px] md:min-w-0 snap-start flex-shrink-0 group relative rounded-3xl overflow-hidden aspect-[3/4] p-5 flex flex-col justify-end border border-white/10 shadow-lg hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="relative z-10 space-y-1.5 text-center">
                <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-semibold block">
                  {cat.subtitle}
                </span>
                <h3 className="font-editorial text-lg text-white font-medium">
                  {cat.title}
                </h3>
                <span className="inline-block mt-2 text-[11px] font-bold text-white bg-white/10 group-hover:bg-emerald-600 px-4 py-1.5 rounded-full backdrop-blur-md transition-colors">
                  Shop →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. BEST SELLERS SPLIT FEATURE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#121c17] via-[#0f1713] to-[#0c1210] border border-white/10 p-8 sm:p-12 lg:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-1/2 space-y-6">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block">
              Crafted for Mindful Cooking
            </span>

            <h2 className="font-editorial text-3xl sm:text-5xl text-white font-medium leading-tight">
              Best <em className="italic text-emerald-300 font-normal">sellers</em>
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-lg">
              A polished ceramic cooking pot rests on a rustic wooden surface, encircled by fresh herbs — a perfect blend of durability and timeless nature for conscious home cooking.
            </p>

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 px-6 py-3 rounded-full transition-all shadow-lg shadow-emerald-950 active:scale-95"
              >
                <span>Shop now</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 group aspect-[4/3] relative">
              <img
                src="/images/cookware_showcase.jpg"
                alt="Cookware Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 glass-panel p-3.5 rounded-2xl border border-white/10 text-xs text-zinc-200 flex justify-between items-center">
                <span>Mineral Ceramic Dutch Oven Set</span>
                <span className="font-bold text-emerald-300 font-mono text-sm">₹3,999</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. IDEAS & INSPIRATION GALLERY (5 Gallery Cards from Image 2) */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-emerald-400 block mb-1">
              Thoughtful, Planet-Prioritizing Ideas and Inspiration
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-medium">
              ✧ <em className="italic text-emerald-300 font-normal">Gallery</em>
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => scroll(galleryRef, -260)}
              className="w-8 h-8 rounded-full border border-white/10 bg-forest-900/60 flex items-center justify-center text-stone-300 hover:bg-emerald-600 hover:text-white transition-all text-xs active:scale-95"
              title="Previous"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => scroll(galleryRef, 260)}
              className="w-8 h-8 rounded-full border border-white/10 bg-forest-900/60 flex items-center justify-center text-stone-300 hover:bg-emerald-600 hover:text-white transition-all text-xs active:scale-95"
              title="Next"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={galleryRef}
          className="flex overflow-x-auto lg:grid lg:grid-cols-5 scroll-smooth scrollbar-none gap-4 pb-2 snap-x"
        >
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="min-w-[200px] lg:min-w-0 snap-start flex-shrink-0 group relative rounded-2xl overflow-hidden aspect-square border border-white/10 shadow-lg hover:border-emerald-500/50 transition-all"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[10px] text-emerald-300 uppercase tracking-wider block font-semibold">
                  {item.tag}
                </span>
                <h4 className="font-editorial text-xs sm:text-sm text-stone-100 font-medium line-clamp-1">
                  {item.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WARM CREAM SOCIAL PROOF & REVIEWS SECTION (From Image 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#ede8dc] text-[#152620] p-8 sm:p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-stone-300/80 gap-6">
            <div className="flex items-center space-x-4">
              <span className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#152620]">
                4.9<span className="text-xl text-emerald-800">/5</span>
              </span>
              <div className="text-xs">
                <div className="flex text-amber-600 space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="font-bold text-[#152620]">More than 25,000 5-Star Reviews</p>
                <p className="text-stone-600">For our award-winning eco cookware</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-10 text-xs">
              <div>
                <div className="font-bold text-[#152620] text-base font-mono">100%</div>
                <div className="text-stone-600">Plastic-Free</div>
              </div>
              <div>
                <div className="font-bold text-[#152620] text-base font-mono">500k+</div>
                <div className="text-stone-600">Trees Planted</div>
              </div>
              <div>
                <div className="font-bold text-[#152620] text-base font-mono">30-Day</div>
                <div className="text-stone-600">Trial Period</div>
              </div>
            </div>
          </div>

          {/* 4 Review Cards in Cream/White Containers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#fdfcf9] border border-stone-200/90 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <FaQuoteLeft className="text-emerald-800 text-lg opacity-70" />
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {rev.quote}
                  </p>
                </div>
                <div className="border-t border-stone-200 pt-3">
                  <p className="text-xs font-bold text-[#152620]">{rev.author}</p>
                  <p className="text-[11px] text-stone-500">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. EDITORIAL PHOTO COLLAGE & COMMITMENT HEADLINE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-white/10">
            <img src="/images/cookware_showcase.jpg" alt="Cookware" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-white/10 -mt-3">
            <img src="/images/recipe_newsletter.jpg" alt="Toasted Pan" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-white/10">
            <img src="/images/auth_lifestyle.jpg" alt="Kitchen Scene" className="w-full h-full object-cover" />
          </div>
        </div>

        <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-stone-100 font-medium leading-relaxed max-w-3xl mx-auto">
          Discover our commitment to{" "}
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xl font-normal align-middle">
            <span>🍳</span>
            <em>sustainable</em>
          </span>{" "}
          materials, low-impact production, and{" "}
          <em className="italic text-emerald-300 font-normal">ethical sourcing</em>{" "}
          partnerships — all crafted to support a healthier planet and a{" "}
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xl font-normal align-middle">
            <span>🌿</span>
            <em>greener kitchen</em>
          </span>.
        </h2>
      </section>

      {/* 9. RECIPE & 10% OFF NEWSLETTER BANNER (From Image 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#133026] via-[#0d221b] to-[#071611] border border-emerald-800/40 p-8 sm:p-14 lg:p-16 shadow-2xl">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block">
                Get Recipes
              </span>
              <h2 className="font-editorial text-4xl sm:text-6xl text-white font-medium">
                10% Off
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                Eco-friendly recipes, cooking tips, and a 10% discount on sustainable kitchenware for a greener lifestyle.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full bg-[#1b3d31]/80 border border-emerald-700/50 rounded-xl px-5 py-3.5 text-stone-100 placeholder-stone-400 focus:outline-none focus:border-emerald-400 text-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#ede8dc] hover:bg-white text-[#152620] font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-lg active:scale-95"
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-400 font-semibold animate-pulse">
                🎉 Welcome to Homedine! Your 10% discount code has been sent to your inbox.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 10. SUSTAINABILITY COMMITMENT PILLARS */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-3xl bg-[#121c17] border border-white/5 flex items-start space-x-4">
            <FaLeaf className="text-emerald-400 text-2xl mt-1 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Non-Toxic Living</h4>
              <p className="text-xs text-zinc-400 leading-snug">Zero lead, cadmium, PTFE, or harmful chemical glazes.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#121c17] border border-white/5 flex items-start space-x-4">
            <FaRecycle className="text-emerald-400 text-2xl mt-1 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">100% Recyclable</h4>
              <p className="text-xs text-zinc-400 leading-snug">Sustainably harvested bamboo, ceramic, and recycled aluminum.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#121c17] border border-white/5 flex items-start space-x-4">
            <FaBoxOpen className="text-emerald-400 text-2xl mt-1 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Zero-Plastic Packing</h4>
              <p className="text-xs text-zinc-400 leading-snug">All orders ship in 100% post-consumer recycled boxes.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#121c17] border border-white/5 flex items-start space-x-4">
            <FaShieldAlt className="text-emerald-400 text-2xl mt-1 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Lifetime Durability</h4>
              <p className="text-xs text-zinc-400 leading-snug">Tested to withstand daily culinary adventures for years.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
