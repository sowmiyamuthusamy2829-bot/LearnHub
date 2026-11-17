
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Quiz.css";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const quizzes = {
    1: {
      title: "Web Development Quiz",

      questions: [
        {
          question:
            "Which language is primarily used to structure a webpage?",
          options: ["HTML", "CSS", "JavaScript", "SQL"],
          answer: "HTML",
        },

        {
          question:
            "What is CSS primarily used for?",
          options: [
            "Database management",
            "Styling web pages",
            "Running server code",
            "Creating databases",
          ],
          answer: "Styling web pages",
        },

        {
          question:
            "Which technology is mainly used to add interactivity to webpages?",
          options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL",
          ],
          answer: "JavaScript",
        },

        {
          question:
            "What is React primarily used to build?",
          options: [
            "User interfaces",
            "Operating systems",
            "Database servers",
            "Network routers",
          ],
          answer: "User interfaces",
        },

        {
          question:
            "What is a React component?",
          options: [
            "A reusable UI building block",
            "A database table",
            "A CSS color",
            "A web server",
          ],
          answer: "A reusable UI building block",
        },
      ],
    },

    2: {
      title: "Python Programming Quiz",

      questions: [
        {
          question:
            "Which keyword is used to define a function in Python?",
          options: ["func", "function", "def", "define"],
          answer: "def",
        },

        {
          question:
            "Which data type is used to store text in Python?",
          options: [
            "int",
            "str",
            "float",
            "bool",
          ],
          answer: "str",
        },

        {
          question:
            "Which statement is used for decision making?",
          options: [
            "if",
            "loop",
            "print",
            "import",
          ],
          answer: "if",
        },

        {
          question:
            "Which keyword is commonly used to create a loop over a sequence?",
          options: [
            "repeat",
            "for",
            "loop",
            "iterate",
          ],
          answer: "for",
        },

        {
          question:
            "Which symbol starts a comment in Python?",
          options: ["//", "#", "/*", "<!--"],
          answer: "#",
        },
      ],
    },

    3: {
      title: "AWS Cloud Quiz",

      questions: [
        {
          question:
            "What does AWS stand for?",
          options: [
            "Amazon Web Services",
            "Amazon Website System",
            "Advanced Web Server",
            "Amazon Web Software",
          ],
          answer: "Amazon Web Services",
        },

        {
          question:
            "Which AWS service provides virtual servers?",
          options: [
            "S3",
            "RDS",
            "EC2",
            "VPC",
          ],
          answer: "EC2",
        },

        {
          question:
            "Which AWS service is used for object storage?",
          options: [
            "EC2",
            "S3",
            "RDS",
            "Route 53",
          ],
          answer: "S3",
        },

        {
          question:
            "Which AWS service provides managed relational databases?",
          options: [
            "S3",
            "EC2",
            "RDS",
            "CloudFront",
          ],
          answer: "RDS",
        },

        {
          question:
            "What is cloud computing?",
          options: [
            "Using computing resources over the internet",
            "Only using a local computer",
            "Creating desktop applications",
            "Installing software without internet",
          ],
          answer:
            "Using computing resources over the internet",
        },
      ],
    },
  };


  const quiz = quizzes[id];


  if (!quiz) {
    return (
      <main className="quiz-page">

        <div className="quiz-error">

          <h2>
            Quiz Not Found
          </h2>

          <p>
            The quiz you are trying to access does not exist.
          </p>

          <button
            onClick={() => navigate("/courses")}
          >
            Back to Courses
          </button>

        </div>

      </main>
    );
  }


  const question =
    quiz.questions[currentQuestion];


  const handleNext = () => {

    if (!selectedAnswer) {
      alert("Please select an answer.");
      return;
    }


    let newScore = score;


    if (
      selectedAnswer === question.answer
    ) {
      newScore = score + 1;
      setScore(newScore);
    }


    setSelectedAnswer("");


    if (
      currentQuestion <
      quiz.questions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );

      return;
    }


    setFinished(true);
  };


  const handleRetry = () => {

    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
  };


  const handleCompleteCourse = () => {

    const user =
      localStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    }


    const loggedUser =
      JSON.parse(user);


    fetch(
      "/api/progress",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          user_id: loggedUser.id,
          course_id: Number(id),
        }),
      }
    )
      .then((response) =>
        response.json()
      )
      .then((data) => {

        if (data.message) {

          alert(
            "🎉 Course completed successfully!"
          );

          navigate("/dashboard");
        }

      })
      .catch((error) => {

        console.error(error);

        alert(
          "Unable to save progress. Please check the backend."
        );

      });
  };


  if (finished) {

    const percentage =
      Math.round(
        (score / quiz.questions.length) *
          100
      );


    const passed =
      percentage >= 60;


    return (
      <main className="quiz-page">

        <section className="quiz-result">

          <div className="result-icon">
            {passed ? "🎉" : "📚"}
          </div>

          <p className="quiz-label">
            QUIZ RESULT
          </p>

          <h1>
            {passed
              ? "Congratulations!"
              : "Keep Learning!"}
          </h1>

          <p className="result-score">
            {score} / {quiz.questions.length}
          </p>

          <p className="result-percentage">
            {percentage}% Score
          </p>


          {passed ? (

            <>
              <p className="result-message">
                You passed the quiz.
                You can now complete this
                course.
              </p>

              <button
                className="complete-course-btn"
                onClick={
                  handleCompleteCourse
                }
              >
                Complete Course ✓
              </button>
            </>

          ) : (

            <>
              <p className="result-message">
                You need at least 60% to pass.
                Review the lessons and try again.
              </p>

              <button
                className="retry-btn"
                onClick={handleRetry}
              >
                Try Again
              </button>
            </>

          )}


          <button
            className="back-learning-btn"
            onClick={() =>
              navigate(`/learning/${id}`)
            }
          >
            ← Back to Lessons
          </button>

        </section>

      </main>
    );
  }


  return (
    <main className="quiz-page">

      <section className="quiz-container">

        <div className="quiz-header">

          <p className="quiz-label">
            LEARNHUB QUIZ
          </p>

          <h1>
            {quiz.title}
          </h1>

          <p>
            Test your knowledge before
            completing the course.
          </p>

        </div>


        <div className="quiz-progress">

          <span>
            Question {currentQuestion + 1}
            {" "}
            of{" "}
            {quiz.questions.length}
          </span>

          <div className="quiz-progress-bar">

            <div
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    quiz.questions.length) *
                  100
                }%`,
              }}
            />

          </div>

        </div>


        <div className="quiz-question-card">

          <p className="question-number">
            QUESTION {currentQuestion + 1}
          </p>

          <h2>
            {question.question}
          </h2>


          <div className="quiz-options">

            {question.options.map(
              (option) => (

                <button
                  key={option}
                  className={
                    selectedAnswer === option
                      ? "quiz-option selected"
                      : "quiz-option"
                  }
                  onClick={() =>
                    setSelectedAnswer(
                      option
                    )
                  }
                >

                  <span>
                    {option}
                  </span>

                  <span className="option-radio">
                    {selectedAnswer === option
                      ? "●"
                      : "○"}
                  </span>

                </button>

              )
            )}

          </div>


          <button
            className="next-question-btn"
            onClick={handleNext}
          >
            {currentQuestion ===
            quiz.questions.length - 1
              ? "Finish Quiz"
              : "Next Question →"}
          </button>

        </div>

      </section>

    </main>
  );
}

export default Quiz;

