import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes.jsx";
import AuthProvider from "./Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "./Components/ScrollToTopButton.jsx";
import CookieConsent from "./Components/CookieConsent.jsx";

const queryClint = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookieConsent />
    <QueryClientProvider client={queryClint}>
      <AuthProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
    <Toaster />
    <ToastContainer />
    <ScrollToTopButton />
  </React.StrictMode>
);
