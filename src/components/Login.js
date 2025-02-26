import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/jobs"); // Redirect after login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <LoginBox>
        <h2>Login</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleLogin}>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">Login</Button>
        </Form>
        <ForgotPasswordText onClick={() => navigate("/forgot-password")}>Forgot Password?</ForgotPasswordText>
        <p>Don't have an account? <SignupLink onClick={() => navigate("/signup")}>Sign Up</SignupLink></p>
      </LoginBox>
    </Container>
  );
};

export default Login;

// ✅ **Styled Components for Real-Time UI**
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #007bff; /* Blue Background */
`;

const LoginBox = styled.div`
  width: 350px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background: #003f7f;
  }
`;

const ForgotPasswordText = styled.p`
  color: #007bff;
  cursor: pointer;
  margin-top: 10px;
`;

const SignupLink = styled.span`
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;
const BackgroundWrapper = styled.div`
  width: 100vw;
  min-height: 100vh; /* ✅ Fix for full height */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff; /* Adjust color as per your theme */
  padding: 20px;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;
