import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaLeaf, FaShieldAlt } from "react-icons/fa";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Welcome to the Homedine family!");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/70 backdrop-blur-xl">
        {/* Left Side: Visual Showcase */}
        <div className="hidden lg:relative lg:flex flex-col justify-between p-10 overflow-hidden bg-zinc-900">
          <img
            src="/images/kitchen_hero.jpg"
            alt="Conscious Kitchen"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          {/* Logo */}
          <div className="relative z-10 flex items-center space-x-2">
            <span className="font-editorial text-2xl text-white tracking-tight">Homedine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>

          {/* Perks list */}
          <div className="relative z-10 space-y-4">
            <div className="glass-panel p-5 rounded-2xl border border-white/15 text-xs text-zinc-200 space-y-3 backdrop-blur-md">
              <h3 className="font-editorial text-lg text-white font-medium">Member Privileges</h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center space-x-2">
                  <FaLeaf className="text-emerald-400 text-xs shrink-0" />
                  <span>10% off your inaugural conscious order</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaShieldAlt className="text-emerald-400 text-xs shrink-0" />
                  <span>Complimentary carbon-neutral express delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-400 text-xs">🌿</span>
                  <span>Early access to limited artisan stoneware batches</span>
                </li>
              </ul>
            </div>

            <p className="text-[11px] text-zinc-400">
              Zero plastic, ethically sourced craftsmanship for a healthier kitchen.
            </p>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-widest font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full mb-3">
              <span>Join Homedine</span>
            </div>
            <h2 className="font-editorial text-3xl font-medium text-white mb-2">
              Create an account
            </h2>
            <p className="text-xs text-zinc-400">
              Start your journey toward non-toxic, eco-conscious cooking.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
                <FaUser className="absolute left-3.5 top-3 text-zinc-500 text-xs" />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
                <FaEnvelope className="absolute left-3.5 top-3 text-zinc-500 text-xs" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
                <FaLock className="absolute left-3.5 top-3 text-zinc-500 text-xs" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
                <FaLock className="absolute left-3.5 top-3 text-zinc-500 text-xs" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-950 hover:shadow-emerald-900/40 active:scale-[0.99] disabled:opacity-50 mt-3 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <span>Create Free Account</span>
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-zinc-800/80 text-center">
            <p className="text-xs text-zinc-400">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
