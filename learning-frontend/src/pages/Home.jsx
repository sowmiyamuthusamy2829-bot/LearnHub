
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleExploreCourses = () => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/courses");
    } else {
      navigate("/login");
    }
  };

  return (
    <main>

      {/* HERO SECTION */}

      <section className="home">

        <div className="home-content">

          <p className="home-label">
            WELCOME TO LEARNHUB
          </p>

          <h1>
            Learn Skills.
            <br />
            <span>Build Your Future.</span>
          </h1>

          <p className="home-description">
            LearnHub is an online learning platform where
            you can learn practical skills, improve your knowledge,
            and grow your career.
          </p>

          <button
            className="explore-btn"
            onClick={handleExploreCourses}
          >
            Explore Courses →
          </button>

        </div>

      </section>


      {/* LEARN FEATURES */}

      <section className="features-section">

        <div className="features-header">

          <p className="home-label">
            WHY LEARNHUB?
          </p>

          <h2>
            Learn Features
          </h2>

          <p>
            Everything you need to learn, practice,
            and build your future.
          </p>

        </div>


        <div className="features-grid">

          {/* Feature 1 */}

          <div className="feature-card">

            <div className="feature-icon">
              📚
            </div>

            <h3>
              Learn at Your Pace
            </h3>

            <p>
              Learn new skills at your own pace with
              simple and easy-to-follow lessons.
            </p>

          </div>


          {/* Feature 2 */}

          <div className="feature-card">

            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Practical Learning
            </h3>

            <p>
              Practice what you learn and build useful
              skills through real-world examples.
            </p>

          </div>


          {/* Feature 3 */}

          <div className="feature-card">

            <div className="feature-icon">
              🚀
            </div>

            <h3>
              Build Your Future
            </h3>

            <p>
              Improve your knowledge, complete courses,
              and move closer to your career goals.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="home-cta">

        <div>

          <p className="home-label">
            START TODAY
          </p>

          <h2>
            Ready to start learning?
          </h2>

          <p>
            Choose a course and start building
            your skills with LearnHub.
          </p>

        </div>

        <button
          className="cta-btn"
          onClick={handleExploreCourses}
        >
          Get Started →
        </button>

      </section>

    </main>
  );
}

export default Home;
