import "./index.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { homeRoutes } from "./routes/HomeRoutes";
import { AuthProvider } from "./AuthContext";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(homeRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);