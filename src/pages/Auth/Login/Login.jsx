import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import SocilLogin from "../SocialLogin/SocilLogin";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase.init";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { signInUser } = useAuth();
  const navigate = useNavigate();

  // 🔐 Login
  const handleLogin = async (data) => {
    try {
      await signInUser(data.email, data.password);
      toast.success("Login successful ✅");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login failed");
    }
  };

  // 🔁 Forgot Password
  const handleForgotPassword = async () => {
    const email = getValues("email");

    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent 📩");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center mt-5">Welcome Back</h3>
      <p className="text-center">Please Login</p>

      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="input"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}

          {/* Forgot password */}
          <p
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 cursor-pointer hover:underline mt-1"
          >
            Forgot password?
          </p>

          <button className="btn btn-neutral mt-4 w-full">Login</button>
        </fieldset>

        <p className="mt-2 text-center">
          New to LoanLink?{" "}
          <Link className="text-blue-700 underline" to="/register">
            Register
          </Link>
        </p>

        <SocilLogin />
      </form>
    </div>
  );
};

export default Login;