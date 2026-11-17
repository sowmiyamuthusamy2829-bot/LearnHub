
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");

    if (password.length < 5) {
      setMessage("Password must contain at least 5 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Registration successful! Redirecting to login..."
        );

        setName("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        setMessage(
          data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Register error:", error);
      setMessage("Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-section">

      <div className="register-container">

        <div className="register-header">

          <div className="register-icon">
            🎓
          </div>

          <p className="register-label">
            WELCOME TO LEARNHUB
          </p>

          <h1>Create Account</h1>

          <p>
            Create your account and start your learning journey.
          </p>

        </div>

        <form
          className="register-form"
          onSubmit={handleRegister}
        >

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength="5"
            required
          />

          <small>
            Password must contain at least 5 characters.
          </small>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

        <p className="register-login">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </section>
  );
}

export default Register;
