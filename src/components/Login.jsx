import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../Store/authSlice";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import "./login.css"; 

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const login = async (data) => {
  setError("");
  setLoading(true);
  try {
    await authService.login(data);
    const userData = await authService.getUser();

    if (userData) {
      dispatch(authLogin(userData));
      navigate("/admin/dashboard");
    } else {
      setError("Failed to fetch user after login");
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-background">
      <div className="login-form">
      <div className="login-container">
        <h2 className="text">Hungry Hub</h2>
        <h2 className="login-title">Sign in to your account</h2>
        <p className="signup-text">
          Don&apos;t have any account?&nbsp;
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="login-form-content">
          <div className="form-fields">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email must be valid",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
export default Login;