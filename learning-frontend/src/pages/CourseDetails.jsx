import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CourseDetails.css";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`);

        const data = await response.json();

        if (response.ok) {
          setCourse(data);
        } else {
          setMessage(data.message || "Course not found");
        }
      } catch (error) {
        console.error("Course details error:", error);
        setMessage("Unable to connect to backend");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // ============================
  // GET LESSONS
  // ============================

  const getLessons = () => {
    const courseId = Number(id);

    // WEB DEVELOPMENT
    if (courseId === 1) {
      return [
        {
          number: "01",
          title: "Introduction",
          description: "Learn the basics and fundamentals.",
        },
        {
          number: "02",
          title: "Core Concepts",
          description: "Understand the important concepts.",
        },
        {
          number: "03",
          title: "Practical Learning",
          description: "Apply your knowledge through practice.",
        },
      ];
    }

    // PYTHON
    if (courseId === 2) {
      return [
        {
          number: "01",
          title: "Introduction",
          description: "Learn Python basics and fundamentals.",
        },
        {
          number: "02",
          title: "Core Concepts",
          description: "Understand important Python concepts.",
        },
        {
          number: "03",
          title: "Practical Learning",
          description: "Practice Python with examples.",
        },
      ];
    }

    // AWS CLOUD
    if (courseId === 3) {
      return [
        {
          number: "01",
          title: "Introduction",
          description: "Learn AWS Cloud basics and fundamentals.",
        },
        {
          number: "02",
          title: "Core Concepts",
          description: "Understand important AWS Cloud concepts.",
        },
        {
          number: "03",
          title: "Practical Learning",
          description: "Apply AWS Cloud knowledge through practice.",
        },
      ];
    }

    return [];
  };

  const lessons = getLessons();

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <section className="course-details-section">
        <div className="course-details-container">
          <h2>Loading course...</h2>
        </div>
      </section>
    );
  }

  // ============================
  // COURSE NOT FOUND
  // ============================

  if (!course) {
    return (
      <section className="course-details-section">
        <div className="course-details-container">
          <div className="error-card">
            <h2>Course not found</h2>

            <p>{message}</p>

            <Link
              to="/courses"
              className="back-courses-btn"
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ============================
  // PAGE
  // ============================

  return (
    <section className="course-details-section">

      <div className="course-details-container">

        {/* COURSE HEADER */}

        <div className="course-hero">

          <div className="course-hero-icon">
            📚
          </div>

          <div>

            <p className="course-details-label">
              LEARNHUB • COURSE DETAILS
            </p>

            <h1>{course.title}</h1>

            <p className="course-hero-description">
              {course.description}
            </p>

          </div>

        </div>


        {/* COURSE INFORMATION */}

        <div className="course-info-grid">

          <div className="info-card">

            <span>📖</span>

            <h3>Lessons</h3>

            <p>3 Lessons</p>

          </div>


          <div className="info-card">

            <span>⏱️</span>

            <h3>Duration</h3>

            <p>Self-paced</p>

          </div>


          <div className="info-card">

            <span>🎯</span>

            <h3>Level</h3>

            <p>Beginner</p>

          </div>

        </div>


        {/* WHAT YOU WILL LEARN */}

        <div className="details-card">

          <h2>What You Will Learn</h2>

          <div className="learning-points">

            <div>
              <span>✓</span>
              <p>Understand the fundamental concepts.</p>
            </div>

            <div>
              <span>✓</span>
              <p>Build practical knowledge step by step.</p>
            </div>

            <div>
              <span>✓</span>
              <p>Practice concepts with real examples.</p>
            </div>

            <div>
              <span>✓</span>
              <p>Develop useful skills for your career.</p>
            </div>

          </div>

        </div>


        {/* COURSE CONTENT */}

        <div className="details-card">

          <h2>Course Content</h2>

          {lessons.map((lesson) => (

            <div
              key={lesson.number}
              className="course-lesson"
            >

              <span>
                {lesson.number}
              </span>

              <div>

                <h3>
                  {lesson.title}
                </h3>

                <p>
                  {lesson.description}
                </p>

              </div>

            </div>

          ))}

        </div>


        {/* START LEARNING */}

        <div className="start-learning-card">

          <div>

            <h2>
              Ready to start learning?
            </h2>

            <p>
              Begin the course and improve your skills
              step by step.
            </p>

          </div>


          <Link
            to={`/learning/${course.id}`}
            className="start-course-btn"
          >
            Start Learning →
          </Link>

        </div>

      </div>

    </section>
  );
}

export default CourseDetails;