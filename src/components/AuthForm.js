import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AuthForm = ({ isSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/login"); // Redirect to login after signup
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/jobs"); // Redirect to jobs after login
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleAuth}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>

        {/* ✅ Forgot Password (Only on Login page) */}
        {!isSignup && <ForgotPasswordLink onClick={() => navigate("/forgot-password")}>Forgot Password?</ForgotPasswordLink>}

        {/* ✅ Add "Don't have an account?" for Login and "Already have an account?" for Signup */}
        <SwitchAuthContainer>
          {isSignup ? (
            <p>Already have an account? <SwitchAuthLink onClick={() => navigate("/login")}>Login</SwitchAuthLink></p>
          ) : (
            <p>Don't have an account? <SwitchAuthLink onClick={() => navigate("/signup")}>Sign Up</SwitchAuthLink></p>
          )}
        </SwitchAuthContainer>
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthForm;

// Styled Components
const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(4, 130, 255);
`;

const AuthCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 400px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    width: 100%;
    padding: 10px;
    background:rgb(4, 76, 153);
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
    background: #003f7f;
  }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const ForgotPasswordLink = styled.p`
  color: #007bff;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const SwitchAuthContainer = styled.div`
  margin-top: 15px;
  font-size: 14px;
`;

const SwitchAuthLink = styled.span`
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
`;
