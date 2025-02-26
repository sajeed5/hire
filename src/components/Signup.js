import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      // ✅ Immediately sign out the user to prevent auto-login
      await signOut(auth);

      // ✅ Show success message
      setSuccess(true);

      // ✅ Clear input fields
      setName("");
      setEmail("");
      setPassword("");

      // ✅ Redirect to Login Page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <SignupBox>
        <h2>Sign Up</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>✅ Account created successfully! Redirecting...</SuccessMessage>}
        <Form onSubmit={handleSignup}>
          <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">Sign Up</Button>
        </Form>
        <SwitchAuthContainer>
          Already have an account? <SwitchAuthLink onClick={() => navigate("/login")}>Login</SwitchAuthLink>
        </SwitchAuthContainer>
      </SignupBox>
    </Container>
  );
};

export default Signup;

// ✅ **Styled Components**
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #007bff; /* Blue Background */
`;

const SignupBox = styled.div`
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
`;

const SwitchAuthContainer = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

const SwitchAuthLink = styled.span`
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
`;
