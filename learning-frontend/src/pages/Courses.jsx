
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    // Not logged in → Login page
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "/api/courses"
        );

        const data = await response.json();

        if (response.ok) {
          setCourses(data);
        }
      } catch (error) {
        console.error("Courses error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (!localStorage.getItem("user")) {
    return null;
  }

  if (loading) {
    return (
      <section className="courses-section">
        <div className="courses-container">
          <h2>Loading courses...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="courses-section">

      <div className="courses-container">

        <div className="courses-header">

          <p className="courses-label">
            LEARNHUB COURSES
          </p>

          <h1>
            Explore Our Courses
          </h1>

          <p>
            Choose a course and start building your skills.
          </p>

        </div>


        <div className="courses-grid">

          {courses.map((course) => (

            <div
              className="course-card"
              key={course.id}
            >

              <div className="course-card-icon">
                📚
              </div>

              <h2>
                {course.title}
              </h2>

              <p>
                {course.description}
              </p>

              <button
                onClick={() => handleCourseClick(course.id)}
              >
                View Course →
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Courses;
