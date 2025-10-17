import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { router } from "./routers/index.jsx";
import { RouterProvider } from "react-router-dom";
import "./styles/global.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
      <ToastContainer
        bodyClassName="toast"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={5}
      />
    </RecoilRoot>
  </React.StrictMode>
);
