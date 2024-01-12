import { Box } from "@mui/material";
import React from "react";

const Wrapper = ({ children }) => {
  return (
    <Box
      width={"100vw"}
      minHeight={"100vh"}
      p={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
