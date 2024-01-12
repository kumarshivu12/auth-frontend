import {
  Button,
  IconButton,
  InputBase,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { Eye, EyeClosed } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

//styled components
const StyledInput = styled(InputBase)`
  border: 1px solid ${(props) => props.theme.palette.border.input || "black"};
  border-radius: 10px;
  padding: 5px 10px;
`;

const Signup = () => {
  const [show, setShow] = useState(false);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Stack
      minWidth={{ xs: "100%", md: "40%" }}
      sx={{
        background: theme.palette.background.paper,
        borderRadius: "20px",
      }}
      p={3}
      spacing={3}
    >
      <Stack textAlign={"center"}>
        <Typography variant="h3" fontFamily={"Playfair Display"}>
          Talkie !
        </Typography>
      </Stack>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Stack spacing={3}>
          <Stack>
            <Typography variant="subtitle2">Username:</Typography>
            <StyledInput
              type="text"
              placeholder="username..."
              autoFocus
              {...register("username", {
                required: "username is required",
              })}
            />
            {errors.username && (
              <Typography variant="caption" color="error.main">
                {errors.username.message}
              </Typography>
            )}
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Full Name:</Typography>
            <StyledInput
              type="text"
              placeholder="fullame..."
              {...register("fullName", {
                required: "fullname is required",
              })}
            />
            {errors.fullName && (
              <Typography variant="caption" color="error.main">
                {errors.fullName.message}
              </Typography>
            )}
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Email:</Typography>
            <StyledInput
              type="email"
              placeholder="email..."
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "email not valid",
                },
              })}
            />
            {errors.email && (
              <Typography variant="caption" color="error.main">
                {errors.email.message}
              </Typography>
            )}
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Password:</Typography>
            <StyledInput
              type={show ? "text" : "password"}
              placeholder="password..."
              endAdornment={
                <IconButton onClick={() => setShow(!show)}>
                  {show ? <Eye size={18} /> : <EyeClosed size={18} />}
                </IconButton>
              }
              {...register("password", {
                required: "password is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                },
              })}
            />
            {errors.password && (
              <Typography variant="caption" color="error.main">
                {errors.password.message}
              </Typography>
            )}
          </Stack>
          <Stack>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ borderRadius: "10px", padding: "15px 10px" }}
            >
              Signup
            </Button>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={1}
            >
              <Typography variant="subtitle2">
                Already have an account?{" "}
              </Typography>
              <Link to="/auth/login" style={{ textDecoration: "none" }}>
                <Typography variant="subtitle2" color={"primary"}>
                  Login
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default Signup;
