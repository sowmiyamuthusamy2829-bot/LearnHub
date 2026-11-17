
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* Logo */}

        <Link to="/" className="navbar-logo">
          <span>🎓</span>
          LearnHub
        </Link>


        {/* Navigation */}

        <div className="navbar-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/courses">
            Courses
          </Link>

          {user && (
            <Link to="/dashboard">
              Dashboard
            </Link>
          )}

        </div>


        {/* Right Side */}

        <div className="navbar-actions">

          {user ? (
            <>
              <span className="navbar-user">
                👋 Welcome
              </span>

              <button
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar-login"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="navbar-register"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;


