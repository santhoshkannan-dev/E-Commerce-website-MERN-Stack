import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { FaUser, FaEnvelope, FaLock, FaBoxOpen, FaShieldAlt } from "react-icons/fa";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.username || "");
      setEmail(userInfo.email || "");
    }
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password: password || undefined,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile preferences updated successfully");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-10 border-b border-emerald-900/30 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              <span>Account Preferences</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold">
              Personal Profile
            </h1>
          </div>

          <Link
            to="/user-orders"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-700/50 text-emerald-300 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <FaBoxOpen className="text-sm" />
            <span>View Order History</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* User badge column */}
          <div className="md:col-span-4">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-900/30 text-center shadow-xl space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-800 to-teal-600 text-white font-serif text-3xl font-bold flex items-center justify-center mx-auto shadow-xl ring-4 ring-emerald-900/40">
                {username ? username.charAt(0).toUpperCase() : "U"}
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-stone-100">{username}</h2>
                <p className="text-xs text-stone-400 mt-1">{email}</p>
              </div>

              <div className="pt-4 border-t border-emerald-900/30">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/60 uppercase tracking-wider">
                  {userInfo?.isAdmin ? "Verified Administrator" : "Active Member"}
                </span>
              </div>

              <p className="text-[11px] text-stone-400 leading-relaxed pt-2">
                Member of Homedine's carbon-neutral conscious kitchenware club.
              </p>
            </div>
          </div>

          {/* Edit form column */}
          <div className="md:col-span-8">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-900/30 shadow-xl">
              <h2 className="font-serif text-xl font-bold text-stone-100 mb-6 pb-4 border-b border-emerald-900/30">
                Edit Credentials & Settings
              </h2>

              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-400/80">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-3.5 bg-forest-900/70 border border-emerald-900/40 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                      placeholder="Your name"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-400/80">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-11 pr-4 py-3.5 bg-forest-900/70 border border-emerald-900/40 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-900/30">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-4">
                    Change Password (Leave blank to keep current)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-400/80">
                          <FaLock />
                        </div>
                        <input
                          type="password"
                          className="w-full pl-11 pr-4 py-3 bg-forest-900/70 border border-emerald-900/40 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-400/80">
                          <FaLock />
                        </div>
                        <input
                          type="password"
                          className="w-full pl-11 pr-4 py-3 bg-forest-900/70 border border-emerald-900/40 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={loadingUpdateProfile}
                    className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/70 transition-all"
                  >
                    {loadingUpdateProfile ? "Saving..." : "Save Changes"}
                  </button>

                  <div className="flex items-center space-x-1.5 text-[11px] text-stone-400">
                    <FaShieldAlt className="text-emerald-400" />
                    <span>Protected with bcrypt encryption</span>
                  </div>
                </div>

                {loadingUpdateProfile && <Loader />}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
