
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setMessage("Login successful!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 700);
      } else {
        setMessage(
          data.message || "Invalid email or password."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">

      <div className="login-container">

        <div className="login-header">

          <div className="login-icon">
            🎓
          </div>

          <p className="login-label">
            WELCOME BACK TO LEARNHUB
          </p>

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to continue your learning journey.
          </p>

        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <p className="login-register">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>

      </div>

    </section>
  );
}

export default Login;
