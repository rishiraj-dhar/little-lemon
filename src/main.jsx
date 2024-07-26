import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home-page.jsx";
import BookingPage from "./pages/booking-page.jsx";
import ConfirmationPage from "./pages/confirmation-page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "booking",
        element: <BookingPage />,
      },
      {
        path: "confirmation",
        element: <ConfirmationPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
