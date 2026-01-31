import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { role, isLoading: roleLoading } = useRole();

  const [suspendUserId, setSuspendUserId] = useState(null);
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  // 🔒 Admin only
  if (roleLoading) return <div className="p-10">Loading...</div>;
  if (role !== "admin") {
    return (
      <div className="p-10 text-center text-red-500 text-xl font-bold">
        ❌ Access Denied
      </div>
    );
  }

  // 🔹 Load all users
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // 🔹 Update user role
  const handleRoleUpdate = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      refetch();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  // 🔹 Suspend user
  const handleSuspend = async () => {
    if (!reason || !feedback) {
      return toast.error("Reason & feedback required");
    }
    try {
      await axiosSecure.patch(`/users/suspend/${suspendUserId}`, {
        reason,
        feedback,
      });
      toast.success("User suspended successfully");
      setSuspendUserId(null);
      setReason("");
      setFeedback("");
      refetch();
    } catch (err) {
      toast.error("Failed to suspend user");
    }
  };

  if (isLoading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              // 🔹 Hide logged-in admin
              .filter((user) => user.role !== "admin")
              .map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge badge-outline capitalize">{user.role}</span>
                  </td>
                  <td>
                    {user.suspended ? (
                      <span className="badge badge-error">Suspended</span>
                    ) : (
                      <span className="badge badge-success">Active</span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    {!user.suspended && (
                      <>
                        <button
                          className="btn btn-xs"
                          disabled={user.role === "user"}
                          onClick={() => handleRoleUpdate(user._id, "user")}
                        >
                          Make User
                        </button>
                        <button
                          className="btn btn-xs btn-info"
                          disabled={user.role === "manager"}
                          onClick={() => handleRoleUpdate(user._id, "manager")}
                        >
                          Make Manager
                        </button>
                        <button
                          className="btn btn-xs btn-warning"
                          onClick={() => setSuspendUserId(user._id)}
                        >
                          Suspend
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Suspend Modal */}
      {suspendUserId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Suspend User</h2>
            <input
              type="text"
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              placeholder="Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="input input-bordered w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm btn-error"
                onClick={handleSuspend}
              >
                Suspend
              </button>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setSuspendUserId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
