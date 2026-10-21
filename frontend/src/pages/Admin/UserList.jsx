import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaUsers, FaUserShield, FaUser } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to permanently remove this user?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error || "Failed to delete user");
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      }).unwrap();
      setEditableUserId(null);
      refetch();
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 text-stone-200">
      <AdminMenu />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <FaUsers className="text-emerald-400" />
            <span>Membership Management</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold">
            Registered Customers & Admins ({users?.length || 0})
          </h1>
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error || "Failed to load user accounts"}
          </Message>
        ) : (
          <div className="glass-panel rounded-3xl border border-emerald-900/30 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-emerald-900/40 bg-forest-900/50 text-xs font-semibold uppercase tracking-wider text-stone-400">
                  <tr>
                    <th className="py-4 px-6">User ID</th>
                    <th className="py-4 px-4">Name</th>
                    <th className="py-4 px-4">Email</th>
                    <th className="py-4 px-4 text-center">Role</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-900/20 text-xs sm:text-sm">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-forest-900/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-stone-400 text-xs">
                        #{user._id.substring(user._id.length - 8)}
                      </td>

                      <td className="py-4 px-4">
                        {editableUserId === user._id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={editableUserName}
                              onChange={(e) => setEditableUserName(e.target.value)}
                              className="bg-forest-900 border border-emerald-700/60 rounded-lg px-2.5 py-1 text-xs text-stone-100 focus:outline-none"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                            >
                              <FaCheck className="text-[10px]" />
                            </button>
                            <button
                              onClick={() => setEditableUserId(null)}
                              className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-300"
                            >
                              <FaTimes className="text-[10px]" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 font-medium text-stone-100">
                            <span>{user.username}</span>
                            <button
                              onClick={() => toggleEdit(user._id, user.username, user.email)}
                              className="text-stone-500 hover:text-emerald-400 transition-colors"
                            >
                              <FaEdit className="text-xs" />
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        {editableUserId === user._id ? (
                          <input
                            type="email"
                            value={editableUserEmail}
                            onChange={(e) => setEditableUserEmail(e.target.value)}
                            className="bg-forest-900 border border-emerald-700/60 rounded-lg px-2.5 py-1 text-xs text-stone-100 focus:outline-none"
                          />
                        ) : (
                          <a href={`mailto:${user.email}`} className="text-stone-400 hover:text-emerald-400 underline">
                            {user.email}
                          </a>
                        )}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {user.isAdmin ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                            <FaUserShield className="text-[10px]" />
                            <span>Admin</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-forest-900 text-stone-400 border border-emerald-900/40">
                            <FaUser className="text-[10px]" />
                            <span>Member</span>
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        {!user.isAdmin && (
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-400 hover:text-red-300 transition-all"
                            title="Delete user"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
