import { Link } from "react-router-dom";
import {
  FaLeaf,
  FaRecycle,
  FaShieldAlt,
  FaGlobeAmericas,
  FaHeart,
  FaAward,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="space-y-20 pb-24 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-3xl overflow-hidden min-h-[460px] lg:min-h-[520px] flex items-center shadow-2xl border border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/kitchen_trust_banner.jpg"
            alt="About Homedine"
            className="w-full h-full object-cover object-center filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1210] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 px-3.5 py-1 rounded-full backdrop-blur-md">
              <FaLeaf className="text-xs" />
              <span>Our Story & Mission</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.15] tracking-tight">
              Mindfully Crafted for a{" "}
              <span className="italic font-normal text-emerald-300">
                Greener Table
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              At Homedine, we believe what you cook with is just as important as what you eat. We create heirloom-quality, non-toxic cookware and dinnerware designed to tread lightly on the Earth while elevating everyday rituals.
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 text-xs font-bold text-black bg-white hover:bg-emerald-300 px-6 py-3 rounded-full transition-all shadow-lg active:scale-95"
              >
                <span>Explore Catalog</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-[#121c17] border border-white/5 text-center space-y-1">
            <span className="font-editorial text-3xl sm:text-4xl font-bold text-emerald-400 block">100%</span>
            <span className="text-xs text-stone-300 font-medium">Plastic-Free Packaging</span>
          </div>
          <div className="p-6 rounded-3xl bg-[#121c17] border border-white/5 text-center space-y-1">
            <span className="font-editorial text-3xl sm:text-4xl font-bold text-emerald-400 block">500k+</span>
            <span className="text-xs text-stone-300 font-medium">Trees Planted Globally</span>
          </div>
          <div className="p-6 rounded-3xl bg-[#121c17] border border-white/5 text-center space-y-1">
            <span className="font-editorial text-3xl sm:text-4xl font-bold text-emerald-400 block">0%</span>
            <span className="text-xs text-stone-300 font-medium">PTFE, PFOA & Heavy Metals</span>
          </div>
          <div className="p-6 rounded-3xl bg-[#121c17] border border-white/5 text-center space-y-1">
            <span className="font-editorial text-3xl sm:text-4xl font-bold text-emerald-400 block">96%</span>
            <span className="text-xs text-stone-300 font-medium">Carbon Offset Supply Chain</span>
          </div>
        </div>
      </section>

      {/* 3. SUSTAINABILITY PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#121c17] border border-white/10 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
              <FaGlobeAmericas />
              <span>Conscious Design Manifesto</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-medium leading-snug">
              Why We Rejected the Disposable Cookware Industry
            </h2>

            <p className="text-sm text-stone-300 leading-relaxed">
              Every year, over 200 million non-stick pans end up in landfills. Their petrochemical coatings peel into home food, degrade toxic fumes into the air, and never biodegrade.
            </p>

            <p className="text-sm text-stone-300 leading-relaxed">
              Homedine was born in 2024 to create a radically healthier alternative. By uniting artisan ceramic glazes, FSC-certified organic bamboo, and 100% recycled cast iron, our products cook beautifully, last for decades, and return safely to the earth.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-xs text-stone-200">
                <FaCheckCircle className="text-emerald-400 shrink-0" />
                <span>Naturally non-stick silicon mineral ceramic finishes</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-stone-200">
                <FaCheckCircle className="text-emerald-400 shrink-0" />
                <span>Zero petroleum glazes, lead, cadmium, or PFAS chemicals</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-stone-200">
                <FaCheckCircle className="text-emerald-400 shrink-0" />
                <span>Fair-wage artisan workshops in Kerala, Tamil Nadu, and Jaipur</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/10 relative">
              <img
                src="/images/cookware_showcase.jpg"
                alt="Cookware in Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 glass-panel p-4 rounded-2xl border border-white/10 text-xs text-stone-200 flex items-center justify-between">
                <span>Hand-finished in small batches</span>
                <span className="text-emerald-300 font-bold">10-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MATERIALS BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase font-semibold tracking-wider text-emerald-400">
            Purity In Every Layer
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-white font-medium">
            Natural Materials. Zero Compromise.
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            We vet every ingredient and timber partner with strict European and Indian food safety standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-[#ede8dc] text-[#152620] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800/10 flex items-center justify-center text-emerald-800 text-xl">
              <FaLeaf />
            </div>
            <h3 className="font-editorial text-xl font-bold">FSC-Certified Bamboo</h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              Harvested from regenerative mountain groves that require no chemical fertilizers. Naturally antibacterial and gentle on smooth pan surfaces.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#ede8dc] text-[#152620] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800/10 flex items-center justify-center text-emerald-800 text-xl">
              <FaShieldAlt />
            </div>
            <h3 className="font-editorial text-xl font-bold">Mineral Ceramic Glazes</h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              Derived from organic silica and clay baked at 1,200°C. Delivers silky release without toxic PFAS degradation or gas emissions under high heat.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#ede8dc] text-[#152620] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800/10 flex items-center justify-center text-emerald-800 text-xl">
              <FaRecycle />
            </div>
            <h3 className="font-editorial text-xl font-bold">Borosilicate Glass & Steel</h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              Ultra-durable thermal shock resistant glassware and food-grade 304 stainless steel rims. Infinitely recyclable and 100% microplastic free.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#133026] via-[#0d221b] to-[#071611] border border-emerald-800/40 p-8 sm:p-14 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-3.5 py-1 rounded-full">
            <FaAward />
            <span>Join 25,000+ Conscious Homes</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl text-white font-medium max-w-2xl mx-auto">
            Ready to upgrade to pure, chemical-free cooking?
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
            Every Homedine order ships with zero plastic in 100% recycled packaging with carbon-neutral courier tracking across India.
          </p>

          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 text-xs font-bold text-black bg-white hover:bg-emerald-300 px-8 py-3.5 rounded-full transition-all shadow-xl active:scale-95"
            >
              <span>Shop All Products</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
