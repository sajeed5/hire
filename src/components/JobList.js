import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";


const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [newApplyLink, setNewApplyLink] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff"); // Default background color

  useEffect(() => {
    const fetchJobs = async () => {
      const jobCollection = await getDocs(collection(db, "jobs"));
      setJobs(jobCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchJobs();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor(getRandomColor());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteJob = async (jobId) => {
    if (!auth.currentUser) return alert("Please log in to delete a job.");

    const jobToDelete = jobs.find((job) => job.id === jobId);
    if (jobToDelete && jobToDelete.uploaderId === auth.currentUser.uid) {
      await deleteDoc(doc(db, "jobs", jobId));
      setJobs(jobs.filter((job) => job.id !== jobId));
      alert("Job deleted successfully.");
    } else {
      alert("You can only delete jobs that you have posted.");
    }
  };

  const handleEditJob = async (jobId) => {
    if (!auth.currentUser) return alert("Please log in to edit a job.");

    const jobToEdit = jobs.find((job) => job.id === jobId);
    if (jobToEdit && jobToEdit.uploaderId === auth.currentUser.uid) {
      await updateDoc(doc(db, "jobs", jobId), { applyLink: newApplyLink });
      setJobs(jobs.map((job) => (job.id === jobId ? { ...job, applyLink: newApplyLink } : job)));
      alert("Job updated successfully.");
      setEditingJob(null);
    } else {
      alert("You can only edit jobs that you have posted.");
    }
  };

  return (
    <Container $bgColor={bgColor}>
      <Title>Available Jobs</Title>
      <JobGrid>
        {jobs.length === 0 ? <p></p> : (
          jobs.map((job) => (
            <JobCard key={job.id}>
              <Uploader>@{job.uploaderName}</Uploader>
              <ApplyLink href={job.applyLink} target="_blank" rel="noopener noreferrer">
                Apply Now 🚀
              </ApplyLink>

              {auth.currentUser && auth.currentUser.uid === job.uploaderId && (
                <ActionButtons>
                  {editingJob === job.id ? (
                    <>
                      <EditInput
                        type="url"
                        value={newApplyLink}
                        onChange={(e) => setNewApplyLink(e.target.value)}
                        placeholder="Enter new Apply Link"
                      />
                      <SaveButton onClick={() => handleEditJob(job.id)}>Save</SaveButton>
                      <CancelButton onClick={() => setEditingJob(null)}>Cancel</CancelButton>
                    </>
                  ) : (
                    <>
                      <EditButton onClick={() => setEditingJob(job.id)}>Edit</EditButton>
                      <DeleteButton onClick={() => handleDeleteJob(job.id)}>Delete</DeleteButton>
                    </>
                  )}
                </ActionButtons>
              )}
            </JobCard>
          ))
        )}
      </JobGrid>
    </Container>
  );
};

export default JobList;

// ✅ **Styled Components**
const Container = styled.div`
  background-color: ${(props) => props.$bgColor};
  width: 100vw;
  min-height: 100vh; /* Ensures full page coverage */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px; /* ✅ Pushes content to start from top */
  transition: background-color 0.5s ease-in-out;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* 2 jobs side by side */
  gap: 20px;
  width: 80%; /* Ensures it doesn't stretch full width */
  justify-content: center;
`;

const JobCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Uploader = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #007bff;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const ApplyLink = styled.a`
  display: inline-block;
  margin-top: 15px;
  padding: 10px 15px;
  background: #007bff;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const EditButton = styled.button`
  background: #ffc107;
  color: black;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #e0a800;
  }
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #c82333;
  }
`;

const EditInput = styled.input`
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 8px;
`;

const SaveButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #218838;
  }
`;

const CancelButton = styled.button`
  background: gray;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: darkgray;
  }
`;
