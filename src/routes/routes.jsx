import { createBrowserRouter } from "react-router-dom";

//components
import Homepage from "../pages/Homepage";
import AuthPage from "../pages/AuthPage";
import Signup from "../features/auth/components/signup";
import Login from "../features/auth/components/Login";
import ResetPassword from "../features/auth/components/ResetPassword";
import ForgotPassword from "../features/auth/components/ForgotPassword";
import VerifyOTP from "../features/auth/components/VerifyOTP";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOTP />,
      },
    ],
  },
]);

export default routes;
