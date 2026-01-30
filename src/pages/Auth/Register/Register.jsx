import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import SocilLogin from "../SocialLogin/SocilLogin";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
const handleRegistration = async (data) => {
  try {
    // 1️⃣ Image upload
    const formData = new FormData();
    formData.append("image", data.photo[0]);

    const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
    const imgRes = await axios.post(img_API_URL, formData);
    const photoURL = imgRes.data.data.url;

    // 2️⃣ Firebase register
    const result = await registerUser(data.email, data.password);
    const user = result.user;

    // 3️⃣ Update Firebase profile
    await updateUserProfile({
      displayName: data.name,
      photoURL,
    });

    // 4️⃣ Save user to MongoDB ✅ (NEW PART)
    const userInfo = {
      name: data.name,
      email: user.email,
      role: data.role,
      photoURL,
    };

    await axios.post("http://localhost:3000/users", userInfo);

    toast.success("Registration successful 🎉");
    navigate("/");
  } catch (err) {
    console.error(err);
    toast.error("Registration failed");
  }
};


  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center mt-5">Welcome to LoanLink</h3>
      <p className="text-center">Please Register</p>

      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500">Name is required</p>}

          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
          />
          {errors.photo && <p className="text-red-500">Photo is required</p>}

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Minimum 6 characters</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Must contain uppercase & lowercase
            </p>
          )}

          {/* 🔹 New Role Dropdown */}
          <label className="label">Role</label>
          <select
            {...register("role", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Role</option>
            <option value="borrower">Borrower</option>
            <option value="manager">Manager</option>
          </select>
          {errors.role && <p className="text-red-500">Role is required</p>}

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>

        <p className="mt-2">
          Already have an account?{" "}
          <Link className="text-blue-700 underline" to="/login">
            Login
          </Link>
        </p>

        <SocilLogin />
      </form>
    </div>
  );
};

export default Register;
