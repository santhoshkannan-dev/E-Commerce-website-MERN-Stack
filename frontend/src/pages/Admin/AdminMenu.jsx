import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaTags,
  FaPlusCircle,
  FaBoxes,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

const AdminMenu = () => {
  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: FaChartPie },
    { to: "/admin/allproductslist", label: "All Products", icon: FaBoxes },
    { to: "/admin/productlist", label: "New Product", icon: FaPlusCircle },
    { to: "/admin/categorylist", label: "Categories", icon: FaTags },
    { to: "/admin/orderlist", label: "Orders", icon: FaClipboardList },
    { to: "/admin/userlist", label: "Users", icon: FaUsers },
  ];

  return (
    <div className="w-full bg-forest-950/90 border-b border-emerald-900/40 backdrop-blur-md sticky top-[73px] z-30 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-3 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/70 mr-3 hidden md:inline-block">
            Admin Suite:
          </span>

          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/50"
                      : "text-stone-300 hover:text-emerald-300 hover:bg-forest-900/60"
                  }`
                }
              >
                <Icon className="text-xs" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
