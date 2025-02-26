import React, { useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const JobPost = () => {
  const [applyLink, setApplyLink] = useState("");
  const [error, setError] = useState("");
  const [bgColor] = useState("#3498db"); 
  const navigate = useNavigate();

  const handlePostJob = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!auth.currentUser) {
        setError("User not logged in.");
        return;
      }

      await addDoc(collection(db, "jobs"), {
        applyLink,
        uploaderName: auth.currentUser.displayName || auth.currentUser.email,
        uploaderId: auth.currentUser.uid, // Store user ID for verification
        createdAt: new Date(),
      });

      alert("Job posted successfully!");
      navigate("/jobs"); // Redirect to Job Listings page
    } catch (error) {
      setError("Error posting job: " + error.message);
    }
  };

  return (
    <BackgroundWrapper>
      <Container bgColor={bgColor}>
        <h2>Post a Job</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handlePostJob}>
          <Input type="url" placeholder="Apply Link" value={applyLink} onChange={(e) => setApplyLink(e.target.value)} required />
          <Button type="submit">Post Job</Button>
        </Form>
      </Container>
    </BackgroundWrapper>
  );
};

export default JobPost;

// Styled Components (Updated for Better Mobile Fit)
const Container = styled.div`
  width: 90%;
  max-width: 400px; /* ✅ Keeps form size optimal */
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin: auto;

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 95%; /* ✅ Ensures form does not touch edges */
    padding: 15px;
    border-radius: 8px;
  }
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
  font-size: 16px;

  @media (max-width: 480px) { 
    font-size: 14px;
  }
`;

const Button = styled.button`
  padding: 12px;
  width: 100%; /* ✅ Full width for better touch experience */
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }

  @media (max-width: 480px) { 
    font-size: 14px;
    padding: 12px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const BackgroundWrapper = styled.div`
  width: 100vw;
  min-height: 100vh; /* ✅ Ensures full height */
  background-color: #40e0d0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;

  @media (max-width: 480px) { 
    padding: 10px;
  }
`;
