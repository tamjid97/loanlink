import React from "react";
import useAuth from "../../hooks/useAuth";

const UserProfile = () => {
  const { user, logout } = useAuth();

  console.log(user); // <-- এখানে দেখো user object কেমন আসে

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 text-lg">No user logged in</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-base-100 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.photoURL || "https://i.ibb.co/2kR7VJY/default-avatar.png"}
          alt={user.displayName || user.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-primary"
        />
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800">
            {user.displayName || user.name || "No Name"}
          </h1>
          <p className="text-gray-600 text-lg">{user.email}</p>
          <p className="text-sm font-medium text-blue-600">
            Role: {user.role || "User"}
          </p>
          <button
            onClick={logout}
            className="btn btn-error mt-6 w-full md:w-48 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
