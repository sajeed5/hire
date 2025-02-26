import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* ✅ Reset and Global Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background-color: rgb(248, 250, 249);
    color: #333;
    line-height: 1.6;
    overflow-x: hidden; /* ✅ Prevents horizontal scrolling */
    padding-top: 70px; /* ✅ Pushes content down to avoid navbar overlap */
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    transition: all 0.3s ease-in-out;
  }

  /* ✅ Responsive Container */
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  /* ✅ Responsive Typography */
  h1, h2, h3 {
    font-size: clamp(1.5rem, 2vw, 2.5rem);
  }

  p {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.6;
  }

  /* ✅ Responsive Forms */
  input, textarea {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  /* ✅ Media Queries */
  @media (max-width: 1024px) { /* Tablets */
    .container {
      width: 95%;
      padding: 15px;
    }

    h1, h2, h3 {
      font-size: clamp(1.3rem, 2vw, 2rem);
    }
  }

  @media (max-width: 768px) { /* Small Tablets and Large Mobiles */
    body {
      padding-top: 80px; /* ✅ More padding for smaller screens */
    }

    .container {
      width: 100%;
      padding: 10px;
    }

    h1, h2, h3 {
      font-size: clamp(1.2rem, 3vw, 1.8rem);
    }

    p {
      font-size: 14px;
    }

    button {
      width: 100%; /* ✅ Full width buttons for mobile */
      font-size: 14px;
      padding: 10px;
    }
  }

  @media (max-width: 480px) { /* Mobile Phones */
    body {
      padding-top: 85px; /* ✅ More space for mobile */
    }

    .container {
      width: 100%;
      padding: 5px;
    }

    h1, h2, h3 {
      font-size: clamp(1.1rem, 4vw, 1.6rem);
    }

    p {
      font-size: 13px;
    }

    button {
      font-size: 14px;
      padding: 8px;
    }
  }
`;

export default GlobalStyles;
