import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { FaLeaf, FaArrowRight, FaStar, FaShieldAlt, FaRecycle, FaBoxOpen } from "react-icons/fa";

// Curated demo products to display if database is empty so UI is immediately stunning
const CURATED_SAMPLE_PRODUCTS = [
  {
    _id: "demo-1",
    name: "Reusable drinkware for a greener lifestyle.",
    price: 43.85,
    brand: "Promotion",
    image: "/images/cookware_showcase.jpg",
    description: "Vacuum insulated, non-toxic stainless steel & ceramic lining.",
  },
  {
    _id: "demo-2",
    name: "Non-toxic cookware for sustainable cooking.",
    price: 78.35,
    brand: "New",
    image: "/images/kitchen_hero.jpg",
    description: "Naturally non-stick mineral ceramic coating free of PTFE and PFOA.",
  },
  {
    _id: "demo-3",
    name: "Kettle & Toaster eco-friendly meals.",
    price: 143.65,
    brand: "Customer favorite",
    image: "/images/auth_lifestyle.jpg",
    description: "Energy efficient rapid boil with brushed sage ceramic finish.",
  },
  {
    _id: "demo-4",
    name: "Bamboo Made Utensil Holder with Spoons",
    price: 26.27,
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

const REVIEWS = [
  {
    quote: "HomeDine's glass jars and ceramic pans are awesome for storage, and the bamboo utensils are perfect for daily use!",
    author: "Jane Cooper",
    role: "Nutritionist",
    rating: 5,
  },
  {
    quote: "Fantastic non-toxic products and fast delivery. My kitchen feels so much cleaner and greener!",
    author: "Darlene Robertson",
    role: "Culinary Instructor",
    rating: 5,
  },
  {
    quote: "Love the eco-style! Glass jars keep things fresh, and the bamboo utensils are so chic on my counter.",
    author: "Jacob Jones",
    role: "Food Blogger",
    rating: 5,
  },
];

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading } = useGetProductsQuery({ keyword });

  // Use DB products if available, otherwise use curated sample items
  const productsToDisplay =
    data?.products && data.products.length > 0
      ? data.products
      : CURATED_SAMPLE_PRODUCTS;

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-3xl overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center shadow-2xl border border-white/10">
        {/* Background Image with Dark Vignette Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/kitchen_hero.jpg"
            alt="Eco-friendly Kitchenware"
            className="w-full h-full object-cover object-center filter brightness-[0.82]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1210] via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
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

          {/* Floating Glassmorphic Badge */}
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

      {/* 2. CATEGORY DISCOVERY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORY_CARDS.map((cat) => (
            <Link
              key={cat.id}
              to="/shop"
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] p-5 flex flex-col justify-end border border-white/10 shadow-lg hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300"
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
                <span className="inline-block mt-2 text-[11px] font-bold text-white bg-white/10 group-hover:bg-emerald-600 px-3.5 py-1 rounded-full backdrop-blur-md transition-colors">
                  Shop →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLING PRODUCTS SECTION */}
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

          <Link
            to="/shop"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-300 hover:text-emerald-400 transition-colors group"
          >
            <span>More products</span>
            <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsToDisplay.map((product) => (
              <ProductCard key={product._id} p={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. EDITORIAL SPLIT FEATURE BANNER */}
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
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 group aspect-[4/3] relative">
              <img
                src="/images/cookware_showcase.jpg"
                alt="Cookware Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-xl border border-white/10 text-xs text-zinc-200 flex justify-between items-center">
                <span>Mineral Ceramic Dutch Oven Set</span>
                <span className="font-bold text-emerald-300 font-mono">$124.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER SOCIAL PROOF TICKER & REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-y border-white/10 py-10 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center space-x-4">
            <div className="font-editorial text-4xl sm:text-5xl font-bold text-white">4.9<span className="text-lg text-emerald-400">/5</span></div>
            <div className="text-xs text-zinc-400 text-left">
              <div className="flex text-amber-400 space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="font-medium text-zinc-300">More than 25,000 5-Star Reviews</p>
              <p className="text-zinc-500">For our award-winning eco cookware</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-10 text-xs">
            <div>
              <div className="font-bold text-white text-base font-mono">100%</div>
              <div className="text-zinc-400">Plastic-Free</div>
            </div>
            <div>
              <div className="font-bold text-white text-base font-mono">500k+</div>
              <div className="text-zinc-400">Trees Planted</div>
            </div>
            <div>
              <div className="font-bold text-white text-base font-mono">30-Day</div>
              <div className="text-zinc-400">Trial Period</div>
            </div>
          </div>
        </div>

        {/* 3 Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex text-amber-400 space-x-1 text-xs">
                {[...Array(rev.rating)].map((_, j) => (
                  <FaStar key={j} />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "{rev.quote}"
              </p>
              <div className="border-t border-white/5 pt-3">
                <p className="text-xs font-bold text-white">{rev.author}</p>
                <p className="text-[11px] text-zinc-500">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ETHICAL VALUES BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-[#121c17] border border-white/5 flex items-start space-x-4">
            <FaLeaf className="text-emerald-400 text-2xl mt-1 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Non-Toxic Living</h4>
              <p className="text-xs text-zinc-400 leading-snug">Zero lead, cadmium, PTFE, or harmful chemical glazes.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121c17] border border-white/5 flex items-start space-x-4">
            <FaRecycle className="text-emerald-400 text-2xl mt-1 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">100% Recyclable</h4>
              <p className="text-xs text-zinc-400 leading-snug">Sustainably harvested bamboo, ceramic, and recycled aluminum.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121c17] border border-white/5 flex items-start space-x-4">
            <FaBoxOpen className="text-emerald-400 text-2xl mt-1 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Zero-Plastic Packing</h4>
              <p className="text-xs text-zinc-400 leading-snug">All orders ship in 100% post-consumer recycled boxes.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121c17] border border-white/5 flex items-start space-x-4">
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
