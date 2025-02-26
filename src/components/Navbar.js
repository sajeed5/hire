import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { auth } from "../firebaseConfig"; 
import { signOut } from "firebase/auth"; 
import styled from "styled-components";
import M416Image from "../assets/m416-glacier.png.jpeg"; // ✅ Import the M416 Glacier image

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); 
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <NavBar>
      {/* Left Side: Hamburger Menu and Logo */}
      <LeftSection>
        <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </MenuIcon>
        <LogoContainer onClick={() => navigate("/jobs")}>
          <Logo className="logo">Berozgaar</Logo>
          <GunImage className="gun-image" src={M416Image} alt="M416 Glacier Skin" />
        </LogoContainer>
      </LeftSection>

      {/* Mobile Menu (Shows when menuOpen is true) */}
      <NavLinks menuOpen={menuOpen}>
        <Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
        <Link to="/post-job" onClick={() => setMenuOpen(false)}>Post Job</Link>
        <Link to="/email-writer" onClick={() => setMenuOpen(false)}>Email Writer</Link>
        <Link to="/cover-letter" onClick={() => setMenuOpen(false)}>Cover Letter</Link>
      </NavLinks>

      {/* Right Side: Logout Button */}
      <AuthSection>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </>
        ) : (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton> 
        )}
      </AuthSection>
    </NavBar>
  );
};

export default Navbar;

// ✅ Styled Components (Mobile Fix Applied)
const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgb(0, 0, 0);
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
`;

/* ✅ New: Left Section for Mobile */
const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust the gap as needed */
`;


const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
    margin-left: 5px; /* Adjust this if needed */

`;

/* ✅ Fixed Mobile Layout */
const Logo = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  margin-right: 5px; 
  animation: glow 1.5s infinite alternate ease-in-out;

  @keyframes glow {
    0% { text-shadow: 0 0 5px #fff, 0 0 10px #00bfff, 0 0 20px #00bfff; }
    50% { text-shadow: 0 0 10px #fff, 0 0 20px #1e90ff, 0 0 30px #1e90ff; }
    100% { text-shadow: 0 0 5px #fff, 0 0 10px #00bfff, 0 0 20px #00bfff; }
  }
`;

const GunImage = styled.img`
  width: 70px;
  height: auto;
  filter: drop-shadow(0px 0px 10px rgba(0, 191, 255, 0.8));
  background: transparent;
`;

/* ✅ Hamburger Menu (☰ or ✖) for Mobile */
const MenuIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  z-index: 1100;
  position: relative;

  @media (min-width: 768px) {
    display: none; /* Hide on larger screens */
  }
`;

/* ✅ Mobile Navbar Toggle */
const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: white;
    font-size: 16px;
    transition: 0.3s;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: ${({ menuOpen }) => (menuOpen ? "flex" : "none")};
    flex-direction: column;
    text-align: center;
    padding: 15px;
    z-index: 1001;
  }
`;

/* ✅ Fixed Logout Position for Mobile */
const AuthSection = styled.div`
  display: flex;
  gap: 10px;

  a {
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
`;

/* ✅ Logout Button (Always Visible) */
const LogoutButton = styled.button`
  background: red;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background: darkred;
  }
`;
