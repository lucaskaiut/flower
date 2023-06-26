import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Contexts/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="min-h-[100vh]">
      <BrowserRouter>
        <AuthContextProvider>
          <App />
          <ToastContainer />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);
