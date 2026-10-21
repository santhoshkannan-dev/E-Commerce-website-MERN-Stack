import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaLeaf } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(`Welcome back, ${res.username || "conscious chef"}!`);
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/70 backdrop-blur-xl">
        {/* Left Side: Visual Editorial Showcase */}
        <div className="hidden lg:relative lg:flex flex-col justify-between p-10 overflow-hidden bg-zinc-900">
          <img
            src="/images/auth_lifestyle.jpg"
            alt="Conscious Kitchenware"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          {/* Top Logo Tag */}
          <div className="relative z-10 flex items-center space-x-2">
            <span className="font-editorial text-2xl text-white tracking-tight">Homedine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>

          {/* Quote & Social Proof */}
          <div className="relative z-10 space-y-4">
            <div className="glass-panel p-5 rounded-2xl border border-white/15 text-xs text-zinc-200 space-y-2.5 backdrop-blur-md">
              <div className="flex text-amber-400 space-x-1">
                {"★★★★★"}
              </div>
              <p className="italic text-zinc-300 leading-relaxed">
                "Pure materials that bring warmth and peace to everyday cooking. The non-toxic cookware collection has transformed our family kitchen."
              </p>
              <div className="flex items-center space-x-2 pt-2 border-t border-white/10 text-[11px] text-emerald-300">
                <FaLeaf className="text-xs" />
                <span>Verified Eco Shopper</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400">
              Join over 25,000+ conscious cooks choosing sustainable, non-toxic kitchenware.
            </p>
          </div>
        </div>

        {/* Right Side: Luxury Sign In Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-widest font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full mb-3">
              <span>Account Access</span>
            </div>
            <h2 className="font-editorial text-3xl font-medium text-white mb-2">
              Welcome back
            </h2>
            <p className="text-xs text-zinc-400">
              Sign in to manage your orders, wishlist, and conscious perks.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
                <FaEnvelope className="absolute left-3.5 top-3.5 text-zinc-500 text-xs" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Password reset link simulation sent to your email.");
                  }}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-3 pl-10 pr-10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
                <FaLock className="absolute left-3.5 top-3.5 text-zinc-500 text-xs" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-950 hover:shadow-emerald-900/40 active:scale-[0.99] disabled:opacity-50 mt-2 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <span>Signing In...</span>
              ) : (
                <span>Sign In to Homedine</span>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Pill */}
          <div className="mt-6 pt-5 border-t border-zinc-800/80 text-center">
            <p className="text-xs text-zinc-400">
              New to Homedine?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
              >
                Create your account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
