import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import JobList from "./components/JobList";
import JobPost from "./components/JobPost";
import JobEmailWriter from "./components/JobEmailWriter";
import CoverLetter from "./components/CoverLetter";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "styled-components";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <GlobalStyles />
      <Navbar user={user} />
      <MainContainer>
        <Routes>
          {/* Redirect '/' to login if not authenticated */}
          <Route path="/" element={user ? <Navigate to="/jobs" /> : <Navigate to="/login" />} />

          {/* Authentication Routes */}
          <Route path="/login" element={user ? <Navigate to="/jobs" /> : <AuthForm isSignup={false} />} />
          <Route path="/signup" element={user ? <Navigate to="/jobs" /> : <Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes (Only accessible if logged in) */}
          <Route path="/jobs" element={user ? <JobList /> : <Navigate to="/login" />} />
          <Route path="/post-job" element={user ? <JobPost /> : <Navigate to="/login" />} />
          <Route path="/email-writer" element={user ? <JobEmailWriter /> : <Navigate to="/login" />} />
          <Route path="/cover-letter" element={user ? <CoverLetter /> : <Navigate to="/login" />} />

          {/* Catch-all route for undefined pages */}
          <Route path="*" element={<Navigate to={user ? "/jobs" : "/login"} />} />
        </Routes>
      </MainContainer>
      <Footer />
    </Router>
  );
}

export default App;

// ✅ Styled Components for layout consistency
const MainContainer = styled.div`
  min-height: calc(100vh - 60px); /* Ensures content doesn't get overlapped by footer */
  padding-bottom: 50px;
`;
