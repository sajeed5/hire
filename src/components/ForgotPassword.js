import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setMessage("Failed to send reset email.");
    }
  };

  return (
    <Container>
      <ResetBox>
        <h2>Forgot Password</h2>
        {message && <Message>{message}</Message>}
        <Form onSubmit={handleReset}>
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Button type="submit">Reset Password</Button>
        </Form>
        <BackToLogin onClick={() => navigate("/login")}>Back to Login</BackToLogin>
      </ResetBox>
    </Container>
  );
};

export default ForgotPassword;

// Styled Components (same as above)
const Message = styled.p`
  color: green;
  font-size: 14px;
  margin-bottom: 10px;
`;

const BackToLogin = styled.p`
  color: #007bff;
  cursor: pointer;
  margin-top: 10px;
`;
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #007bff;
`;

const ResetBox = styled.div`
  width: 350px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;
