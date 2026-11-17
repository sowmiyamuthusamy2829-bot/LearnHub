
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const loggedUser = JSON.parse(storedUser);

      setUser(loggedUser);

      fetchDashboardData(loggedUser.id);
    } catch (err) {
      console.error(err);

      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);


  const fetchDashboardData = async (userId) => {
    try {
      setLoading(true);
      setError("");

      // Get user's completed courses

      const progressResponse = await fetch(
        `/api/progress/${userId}`
      );

      if (!progressResponse.ok) {
        throw new Error("Unable to fetch progress");
      }

      const progressData = await progressResponse.json();

      setProgress(progressData);


      // Get total courses

      const coursesResponse = await fetch(
        "/api/courses"
      );

      if (!coursesResponse.ok) {
        throw new Error("Unable to fetch courses");
      }

      const coursesData = await coursesResponse.json();

      setTotalCourses(coursesData.length);

    } catch (err) {
      console.error("Dashboard error:", err);

      setError(
        "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };


  // ==============================
  // CALCULATIONS
  // ==============================

  const completedCourses = progress.filter(
    (item) => Number(item.completed) === 1
  ).length;

  const inProgressCourses =
    Math.max(totalCourses - completedCourses, 0);

  const progressPercentage =
    totalCourses > 0
      ? Math.round(
          (completedCourses / totalCourses) * 100
        )
      : 0;


  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <main className="dashboard-page">

        <div className="dashboard-loading">
          Loading dashboard...
        </div>

      </main>
    );
  }


  // ==============================
  // PAGE
  // ==============================

  return (
    <main className="dashboard-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="dashboard-header">

        <div>

          <p className="dashboard-label">
            LEARNHUB DASHBOARD
          </p>

          <h1>
            Welcome, {user?.name || "Learner"} 👋
          </h1>

          <p>
            Track your learning progress and completed courses.
          </p>

        </div>

        <button
          className="dashboard-courses-btn"
          onClick={() => navigate("/courses")}
        >
          Explore Courses →
        </button>

      </section>


      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}


      {/* =========================
          STAT CARDS
      ========================= */}

      <section className="dashboard-stats">

        {/* Total */}

        <div className="dashboard-stat-card">

          <div className="stat-icon">
            📚
          </div>

          <div>

            <span>
              Total Courses
            </span>

            <strong>
              {totalCourses}
            </strong>

          </div>

        </div>


        {/* Completed */}

        <div className="dashboard-stat-card">

          <div className="stat-icon completed-icon">
            ✅
          </div>

          <div>

            <span>
              Completed
            </span>

            <strong>
              {completedCourses}
            </strong>

          </div>

        </div>


        {/* In Progress */}

        <div className="dashboard-stat-card">

          <div className="stat-icon progress-icon">
            ⏳
          </div>

          <div>

            <span>
              In Progress
            </span>

            <strong>
              {inProgressCourses}
            </strong>

          </div>

        </div>

      </section>


      {/* =========================
          OVERALL PROGRESS
      ========================= */}

      <section className="overall-progress-card">

        <div className="progress-heading">

          <div>

            <p className="dashboard-label">
              YOUR PROGRESS
            </p>

            <h2>
              Overall Learning Progress
            </h2>

          </div>

          <strong className="progress-percentage">
            {progressPercentage}%
          </strong>

        </div>


        <div className="progress-bar">

          <div
            className="progress-bar-fill"
            style={{
              width: `${progressPercentage}%`,
            }}
          />

        </div>


        <p className="progress-description">
          You have completed{" "}
          <strong>{completedCourses}</strong>{" "}
          out of{" "}
          <strong>{totalCourses}</strong>{" "}
          courses.
        </p>

      </section>


      {/* =========================
          COMPLETED COURSES
      ========================= */}

      <section className="dashboard-courses-section">

        <div className="dashboard-section-header">

          <div>

            <p className="dashboard-label">
              YOUR LEARNING
            </p>

            <h2>
              Course Progress
            </h2>

          </div>

        </div>


        {progress.length === 0 ? (

          <div className="no-progress">

            <div className="no-progress-icon">
              📖
            </div>

            <h3>
              No completed courses yet
            </h3>

            <p>
              Start learning a course to see your
              progress here.
            </p>

            <button
              onClick={() => navigate("/courses")}
              className="start-learning-btn"
            >
              Start Learning →
            </button>

          </div>

        ) : (

          <div className="progress-course-list">

            {progress.map((item) => (

              <div
                className="progress-course-card"
                key={item.id}
              >

                <div className="progress-course-icon">
                  {item.course_id === 1
                    ? "💻"
                    : item.course_id === 2
                    ? "🐍"
                    : "☁️"}
                </div>


                <div className="progress-course-info">

                  <h3>
                    {item.course_name ||
                      "Course"}
                  </h3>

                  <p>
                    Completed by{" "}
                    <strong>
                      {user?.name}
                    </strong>
                  </p>

                  {item.completed_at && (
                    <small>
                      Completed on{" "}
                      {new Date(
                        item.completed_at
                      ).toLocaleDateString()}
                    </small>
                  )}

                </div>


                <div className="progress-course-status">

                  {Number(item.completed) === 1 ? (
                    <span className="completed-status">
                      ✓ Completed
                    </span>
                  ) : (
                    <span className="pending-status">
                      In Progress
                    </span>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Dashboard;

