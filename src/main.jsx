import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./components/routes/router";
import Authprovider from "./provider/authprovider";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
    <RouterProvider router={Router} />
    </Authprovider>
    <ToastContainer />
  </StrictMode>
);