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
import Signup from "./components/Signup"; // ✅ Ensure Signup is imported
import Footer from "./components/Footer"; // ✅ New Footer component
import GlobalStyles from "./styles/GlobalStyles";
import styled from "styled-components"; // ✅ For consistent layout styling

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
  <Route path="/" element={<AuthForm isSignup={false} />} />
  <Route path="/login" element={<AuthForm isSignup={false} />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />

  <Route path="/jobs" element={user ? <JobList /> : <Navigate to="/login" />} />
  <Route path="/post-job" element={user ? <JobPost /> : <Navigate to="/login" />} />
  <Route path="/email-writer" element={user ? <JobEmailWriter /> : <Navigate to="/login" />} />
  <Route path="/cover-letter" element={user ? <CoverLetter /> : <Navigate to="/login" />} />
</Routes>

      </MainContainer>
      <Footer /> {/* ✅ Always visible at bottom */}
    </Router>
  );
}

export default App;

// ✅ Styled Components for layout consistency
const MainContainer = styled.div`
  min-height: calc(100vh - 60px); /* Ensures content doesn't get overlapped by footer */
  padding-bottom: 50px;
`;
