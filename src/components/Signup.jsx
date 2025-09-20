import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import { useNavigate, Link } from "react-router-dom"; // 👈 Link import
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import "./signup.css";

function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.createAccount(form);
      await authService.login({ email: form.email, password: form.password });
      const user = await authService.getUser();

      if (user) {
        dispatch(login(user));
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <h2 className="text">Hungry Hub</h2>
        <h2 className="signup-title">Sign Up</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <Input
            label="Name"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        {/* 👇 Add this part for back to login */}
        <p className="redirect-text">
          Already have an account?{" "}
          <Link to="/login" className="redirect-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
