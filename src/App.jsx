import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";

//components
import ThemeProvider from "./theme/theme";
import routes from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectAuthUser } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);

  useEffect(() => {
    if (authUser?.verified) {
      dispatch(checkAuthAsync());
    }
  }, []);

  return (
    <ThemeProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
};

export default App;
