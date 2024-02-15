import { createBrowserRouter } from "react-router-dom";

//components
import AuthPage from "../pages/AuthPage";
import Signup from "../features/auth/components/Signup";
import Login from "../features/auth/components/Login";
import ResetPassword from "../features/auth/components/ResetPassword";
import ForgotPassword from "../features/auth/components/ForgotPassword";
import VerifyOTP from "../features/auth/components/VerifyOTP";

import Protected from "../features/auth/components/Protected";

import Homepage from "../pages/Homepage";
import Profile from "../features/user/components/Profile";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Homepage />
      </Protected>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
    ],
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
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOTP />,
      },
    ],
  },
]);

export default routes;
