import React, { useState } from "react";
import styled from "styled-components";

const CoverLetter = () => {
  const [formData, setFormData] = useState({
    yourName: "",
    jobTitle: "",
    companyName: "",
    phoneNumber: "",
    gmailId: "",
    industry: "",
    degreeName: "B.E",
    major: "Information Science & Engineering",
    university: "Visvesvaraya Technological University",
    skills: "",
  });

  const [coverLetter, setCoverLetter] = useState("");
  const [copied, setCopied] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateCoverLetter = () => {
    if (!formData.yourName || !formData.jobTitle || !formData.companyName || !formData.phoneNumber || !formData.gmailId) {
      setShowError(true);
      return;
    }

    setShowError(false);

    const generatedLetter = `
Dear Hiring Manager,

I am excited to apply for the ${formData.jobTitle} position at ${formData.companyName}. As a recent graduate in ${formData.major} from ${formData.university}, I am eager to contribute my skills in ${formData.industry}.

With expertise in ${formData.skills}, I am confident that my abilities align with the job role. My passion for continuous learning and problem-solving drives me to contribute effectively to ${formData.companyName}.

I welcome the opportunity to discuss my qualifications further. Please feel free to contact me at ${formData.gmailId} or ${formData.phoneNumber}.

Thank you for your time and consideration.

Best regards,  
${formData.yourName}  
${formData.gmailId}  
${formData.phoneNumber}
    `;

    setCoverLetter(generatedLetter);
  };

  return (
    <PageWrapper>
    <Container>
      <Title>Cover Letter Generator</Title>
      <Form>
        {["yourName", "jobTitle", "companyName", "phoneNumber", "gmailId", "industry", "skills"].map((field) => (
          <FieldContainer key={field}>
            <Label>{field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:</Label>
            <Input type="text" name={field} value={formData[field]} onChange={handleChange} required />
          </FieldContainer>
        ))}

        <FieldContainer>
          <Label>Department:</Label>
          <Select name="major" value={formData.major} onChange={handleChange}>
            <option value="Information Science & Engineering">Information Science & Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Computer Science & Engineering">Computer Science & Engineering</option>
            <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
            <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </Select>
        </FieldContainer>

        <Button type="button" onClick={generateCoverLetter}>Generate Cover Letter</Button>
      </Form>

      {coverLetter && (
        <>
          <ResultTitle>Generated Cover Letter:</ResultTitle>
          <ResultTextArea rows="10" value={coverLetter} readOnly />

          <ButtonContainer>
            <Button onClick={() => {
              const blob = new Blob([coverLetter], { type: "text/plain" });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "Cover_Letter.txt";
              link.click();
            }}>
              Download Cover Letter
            </Button>

            <Button onClick={() => {
              navigator.clipboard.writeText(coverLetter);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}>
              Copy to Clipboard
            </Button>
          </ButtonContainer>
        </>
      )}

      {showError && <ErrorMessage>Please fill out all required fields</ErrorMessage>}
      {copied && <SuccessMessage>Copied to Clipboard!</SuccessMessage>}
    </Container>
    </PageWrapper>
  );
};

export default CoverLetter;

// Styled Components
const Container = styled.div`
  max-width: 700px; /* Increase width from 600px */
  width: 90%; /* Adjust width for responsiveness */
  margin: auto;
  padding: 30px; /* Increase padding */
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


const Title = styled.h1`
  text-align: center;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FieldContainer = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background: #f8f8f8;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background: #f8f8f8;
`;

const Button = styled.button`
  flex: 1; /* Make buttons equal width */
  padding: 12px;
  background: #007BFF;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
  }
`;

const ResultTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-top: 20px;
  font-weight: bold;
`;

const ResultTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background: #f8f8f8;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  gap: 10px; /* Add space between buttons */
`;




const ErrorMessage = styled.div`
  margin-top: 10px;
  padding: 12px;
  background: #dc3545;
  color: #fff;
  text-align: center;
  border-radius: 8px;
`;

const SuccessMessage = styled.div`
  margin-top: 10px;
  padding: 12px;
  background: #28a745;
  color: #fff;
  text-align: center;
  border-radius: 8px;
`;
const PageWrapper = styled.div`
  min-height: 100vh; /* Use min-height instead of height */
  width: 100%;
  background:#7fffd4; /* Full-page green background */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px; /* Adds spacing to prevent cut-off */
  box-sizing: border-box;
`;
