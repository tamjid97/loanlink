import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  // 🔒 Only admin access
  if (role !== "admin") {
    return (
      <div className="p-10 text-center text-red-500 text-xl font-bold">
        ❌ Access Denied
      </div>
    );
  }

  // 🔹 Load all users
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // 🔄 Update role
  const handleRoleUpdate = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      refetch();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  if (isLoading)
    return (
      <div className="p-10 text-center text-gray-500 font-medium">
        Loading users...
      </div>
    );

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Manage Users
        </h1>
        <p className="text-gray-500 mt-1">
          Update roles of users (user & manager only)
        </p>
      </div>

      {/* Users table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Current Role</th>
              <th className="text-left px-4 py-2">Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users
              .filter((user) => user.role !== "admin") // ✅ remove admin from list
              .map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge badge-outline capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="btn btn-xs btn-outline btn-success hover:btn-success"
                      disabled={user.role === "user"}
                      onClick={() => handleRoleUpdate(user._id, "user")}
                    >
                      Make User
                    </button>
                    <button
                      className="btn btn-xs btn-outline btn-info hover:btn-info"
                      disabled={user.role === "manager"}
                      onClick={() => handleRoleUpdate(user._id, "manager")}
                    >
                      Make Manager
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
