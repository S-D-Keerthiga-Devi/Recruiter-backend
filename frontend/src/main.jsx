import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
// import App from "./App";
// import Dashboard from "./Dashboard.jsx";
// import CurrentVacancies from "./CurrentVacancies"
//  import ResumeMatcher from "./ResumeMatcher";
//  import TryBeforeYouCommit from "./TryBeforeYouUse";
 import ResumeAnalyzer from "./ResumeAnalyser";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap your app with BrowserRouter */}
      {/* <ResumeMatcher/> */}
      {/* <TryBeforeYouCommit/> */}
      {/* <ResumeAnalyzer/> */}
      <App/>
    </BrowserRouter>
  </StrictMode>
);
