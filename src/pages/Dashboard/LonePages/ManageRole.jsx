import React, { useState } from "react";

const usersData = [
  {
    _id: "1",
    name: "Tamjid Epick",
    email: "epick@gmail.com",
    role: "user",
  },
  {
    _id: "2",
    name: "Admin User",
    email: "admin@gmail.com",
    role: "admin",
  },
  {
    _id: "3",
    name: "Manager User",
    email: "manager@gmail.com",
    role: "manager",
  },
];

const ManageUsers = () => {
  const [users, setUsers] = useState(usersData);

  const handleRoleUpdate = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user._id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);

    // backend পরে এখানে connect করবো
    console.log("Updated:", id, newRole);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users & Roles</h1>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  <span className="badge badge-outline capitalize">
                    {user.role}
                  </span>
                </td>

                <td className="flex gap-2">
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
                    className="btn btn-xs btn-success"
                    disabled={user.role === "admin"}
                    onClick={() => handleRoleUpdate(user._id, "admin")}
                  >
                    Make Admin
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
