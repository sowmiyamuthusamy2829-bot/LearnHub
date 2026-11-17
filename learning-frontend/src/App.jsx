
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Learning from "./pages/Learning";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Quiz from "./pages/Quiz";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Courses */}
        <Route path="/courses" element={<Courses />} />

        {/* Course Details */}
        <Route path="/courses/:id" element={<CourseDetails />} />

        {/* Learning */}
        <Route path="/learning/:id" element={<Learning />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />
        <Route path="/quiz/:id" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
