import React from "react";
import styled from "styled-components";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <p>© {currentYear} Developed by Sajeed Malagi. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;

// ✅ Styled Components for footer
const FooterContainer = styled.footer`
  width: 100%;
  padding: 10px 0;
  text-align: center;
  background: #000;
  color: white;
  font-size: 14px;
  position: fixed;
  bottom: 0;
  left: 0;
`;
