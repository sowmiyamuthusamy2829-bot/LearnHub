import { Link } from "react-router-dom"
import "./WebDevelopment.css"

function WebDevelopment() {
  return (
    <section className="course-details">
      <div className="course-content">

        <div className="course-header">
          <span className="course-tag">WEB DEVELOPMENT</span>

          <h1>Master Web Development</h1>

          <p>
            Learn how to build modern websites and web
            applications using HTML, CSS, JavaScript and React.
          </p>
        </div>

        <div className="course-info">

          <div className="info-card">
            <span className="info-icon">📚</span>
            <h3>20 Lessons</h3>
            <p>Complete learning modules</p>
          </div>

          <div className="info-card">
            <span className="info-icon">⏱️</span>
            <h3>4 Modules</h3>
            <p>Learn step by step</p>
          </div>

          <div className="info-card">
            <span className="info-icon">🎯</span>
            <h3>Beginner</h3>
            <p>No experience required</p>
          </div>

        </div>

        <div className="learning-section">

          <div className="learning-content">
            <h2>What You'll Learn</h2>

            <div className="lesson">
              <span>✓</span>

              <div>
                <h3>HTML</h3>
                <p>
                  Build the structure of modern websites.
                </p>
              </div>
            </div>

            <div className="lesson">
              <span>✓</span>

              <div>
                <h3>CSS</h3>
                <p>
                  Create beautiful and responsive designs.
                </p>
              </div>
            </div>

            <div className="lesson">
              <span>✓</span>

              <div>
                <h3>JavaScript</h3>
                <p>
                  Add interactive features to websites.
                </p>
              </div>
            </div>

            <div className="lesson">
              <span>✓</span>

              <div>
                <h3>React</h3>
                <p>
                  Build modern interactive web applications.
                </p>
              </div>
            </div>
          </div>

          <div className="start-card">

            <h2>Ready to Start?</h2>

            <p>
              Start learning Web Development and
              build your first modern website.
            </p>

            <Link
              to="/courses/web-development/learn"
              className="start-button"
            >
              Start Learning
            </Link>

          </div>

        </div>

      </div>
    </section>
  )
}

export default WebDevelopment