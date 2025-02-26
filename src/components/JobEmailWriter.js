import React, { useState } from "react";
import styled from "styled-components";

const JobEmailWriter = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    yourName: "",
    companyName: "",
    jobPostingSource: "",
    relevantSkills: "",
    phoneNumber: "",
    gmailId: "",
    industry: "",
    degreeName: "B.E",
    major: "Information Science & Engineering",
    university: "Visvesvaraya Technological University",
  });

  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateEmail = () => {
    console.log("Generating email..."); // Debugging log

    if (!formData.jobTitle || !formData.yourName || !formData.companyName || !formData.phoneNumber || !formData.gmailId) {
      console.error("Required fields are missing!"); // Debugging log
      setShowError(true);
      return;
    }

    setShowError(false);

    const generatedEmail = `
Subject: Application for ${formData.jobTitle} – ${formData.yourName}

Dear Recruitment Team,

I hope this message finds you well. My name is ${formData.yourName}, and I am writing to express my interest in the ${formData.jobTitle} position at ${formData.companyName} as advertised on ${formData.jobPostingSource}.

I recently graduated with a ${formData.degreeName} in ${formData.major} from ${formData.university}, where I gained hands-on experience in ${formData.relevantSkills}. I am eager to apply my academic knowledge, strong work ethic, and passion for ${formData.industry} to contribute to the success of your team.

I have attached my CV for your reference. I would greatly appreciate the opportunity to discuss how my skills and background align with the goals of ${formData.companyName}. I am available for an interview at your convenience and can be reached via email at ${formData.gmailId} or phone at ${formData.phoneNumber}.

Thank you for considering my application. I look forward to the opportunity to contribute to your team and grow within your esteemed organization.

Best regards,  
${formData.yourName}  
Email: ${formData.gmailId}  
Phone Number: ${formData.phoneNumber}
    `;

    console.log("Generated Email:", generatedEmail); // Debugging log
    setEmail(generatedEmail);
  };

  return (
    <PageWrapper>
    <Container>
      <Title>Job Application Email Generator</Title>
      <Form>
        {["jobTitle", "yourName", "companyName", "jobPostingSource", "relevantSkills", "phoneNumber", "gmailId", "industry"].map((field) => (
          <FieldContainer key={field}>
            <Label>{field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:</Label>
            <Input type="text" name={field} value={formData[field]} onChange={handleChange} required />
          </FieldContainer>
        ))}

        {/* Department Dropdown */}
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

        <Button type="button" onClick={generateEmail}>Generate Email</Button>
      </Form>

      {email && (
        <>
          <ResultTitle>Generated Email:</ResultTitle>
          <ResultTextArea rows="10" value={email} readOnly />

          <ButtonContainer>
            <Button onClick={() => {
              const blob = new Blob([email], { type: "text/plain" });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "Job_Application_Email.txt";
              link.click();
            }}>
              Download Email
            </Button>

            <Button onClick={() => {
              navigator.clipboard.writeText(email);
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

export default JobEmailWriter;

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
  width: 100%;
  padding: 12px;
  background: #007BFF;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;

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
  gap: 10px;
  margin-top: 15px;
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
  background:#6495ed; /* Full-page green background */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px; /* Adds spacing to prevent cut-off */
  box-sizing: border-box;
`;


