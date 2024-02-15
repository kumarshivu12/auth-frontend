import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../authSlice";

const Protected = ({ children }) => {
  const authUser = useSelector(selectAuthUser);
  if (!authUser.verified) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export default Protected;
